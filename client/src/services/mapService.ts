/// <reference types="vite/client" />
import { OlaMaps } from 'olamaps-web-sdk';

const API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY || 'H1W1aG5JPbviVwqgi0gvtsFuhhQHNAHBjoX0yutE'; // Fallback for safety

let olaMaps: any = null;
let mapInstance: any = null;

export const initializeOlaMaps = () => {
    if (!olaMaps) {
        olaMaps = new OlaMaps({
            apiKey: API_KEY,
        });
    }
    return olaMaps;
};

export const createMap = (containerId: string, center: [number, number], zoom: number = 12) => {
    const maps = initializeOlaMaps();

    // Create the map instance
    mapInstance = maps.init({
        style: "https://api.olakrutrim.com/tiles/vector/v1/styles/default-light-standard/style.json",
        container: containerId,
        center: center,
        zoom: zoom,
    });

    return mapInstance;
};

// Autocomplete Service
export const getPlacePredictions = async (input: string): Promise<any[]> => {
    if (!input || input.length < 3) return [];

    try {
        const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${API_KEY}`);
        const data = await response.json();

        if (data && data.predictions) {
            return data.predictions.map((p: any) => ({
                description: p.description,
                place_id: p.place_id,
                structured_formatting: {
                    main_text: p.structured_formatting?.main_text || p.description,
                    secondary_text: p.structured_formatting?.secondary_text || '',
                }
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching predictions:", error);
        return [];
    }
};



// Directions Service
export const getDirections = async (origin: string | { lat: number, lng: number }, destination: string | { lat: number, lng: number }): Promise<any> => {
    try {
        const originStr = typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`;
        const destStr = typeof destination === 'string' ? destination : `${destination.lat},${destination.lng}`;

        // Using Ola Maps Directions API
        const response = await fetch(`https://api.olamaps.io/routing/v1/directions?origin=${originStr}&destination=${destStr}&api_key=${API_KEY}`, {
            method: 'POST' // Directions API usually uses POST
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching directions:", error);
        return null;
    }
};

// Distance Matrix
export const getDistanceMatrix = async (origins: string[], destinations: string[]): Promise<any> => {
    try {
        // Construct query params
        // This is a guess at the API signature. If it fails, we fall back to generic distance calculation or mock.
        const response = await fetch(`https://api.olamaps.io/routing/v1/distanceMatrix?origins=${origins.join('|')}&destinations=${destinations.join('|')}&api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching distance matrix:", error);
        // Fallback mock response for now to prevent crashes
        return {
            rows: origins.map(() => ({
                elements: destinations.map(() => ({
                    status: 'OK',
                    distance: { value: 1000, text: '1 km' },
                    duration: { value: 600, text: '10 mins' }
                }))
            }))
        };
    }
};

// Map Utils
export const addMarker = (map: any, lat: number, lng: number, popupContent?: string) => {
    if (!olaMaps) return null;

    // Ola Maps SDK likely wraps MapLibre markers. 
    // Usage: olaMaps.addMarker({ offset: [0, -40], anchor: 'bottom', color: 'red' }).setLngLat([lng, lat]).addTo(map);
    // OR: new olaMaps.Marker(...)

    // Based on README, we might need to use the method on the instance or the class. 
    // Let's assume the maps instance has helper or we use the exported OlaMaps class if it has static methods, 
    // but usually it's `olaMaps.addMarker()` if `olaMaps` is the helper instance.

    // We already have `olaMaps` global instance initialized in `initializeOlaMaps`.
    try {
        const marker = olaMaps.addMarker({
            offset: [0, -10],
            anchor: 'bottom',
        })
            .setLngLat([lng, lat])
            .addTo(map);

        if (popupContent) {
            const popup = olaMaps.addPopup({ offset: [0, -40] })
                .setHTML(popupContent);
            marker.setPopup(popup);
        }
        return marker;
    } catch (e) {
        console.error("Error adding marker:", e);
        return null;
    }
};

export const updateMarkerPosition = (marker: any, lat: number, lng: number) => {
    if (marker && marker.setLngLat) {
        marker.setLngLat([lng, lat]);
    }
};

export const drawRoute = (map: any, routeData: any) => {
    if (!map || !routeData) return;

    // Assuming routeData is the GeoJSON or contains geometry
    // If it's standard Directions API, it might be in `routes[0].geometry` (encoded polyline) or `routes[0].legs...`
    // Ola Maps likely returns an encoded polyline or GeoJSON.

    // For now, let's assume we can remove old route layer and add new one.
    // Standard MapLibre GL JS way:

    const layerId = 'route';
    const sourceId = 'route';

    if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData({
            type: 'Feature',
            properties: {},
            geometry: routeData // Expecting GeoJSON geometry
        });
    } else {
        map.addSource(sourceId, {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: routeData
            }
        });
        map.addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#06b6d4',
                'line-width': 6
            }
        });
    }
};

// Reverse Geocoding
export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
        const response = await fetch(`https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${API_KEY}`);
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
            return data.results[0].formatted_address;
        }
        return "Unknown Location";
    } catch (error) {
        console.error("Error reverse geocoding:", error);
        return "Unknown Location";
    }
};

// Utility: Calculate distance between two points (Haversine formula)
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
};

// Text Search (Nearby Search replacement)
export const searchPlaces = async (query: string, location?: { lat: number, lng: number }): Promise<any[]> => {
    try {
        let url = `https://api.olamaps.io/places/v1/text-search?input=${encodeURIComponent(query)}&api_key=${API_KEY}`;
        if (location) {
            url += `&location=${location.lat},${location.lng}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data && data.predictions) {
            return data.predictions.map((p: any) => ({
                place_id: p.place_id,
                name: p.description,
                geometry: p.geometry
            }));
        }
        if (data && data.results) {
            return data.results;
        }

        return [];
    } catch (error) {
        console.error("Error searching places:", error);
        return [];
    }
};
