
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MicrophoneIcon, ReverseIcon } from '../constants';
import { GeolocationPermissionError, MicrophonePermissionError } from '../components/common/PermissionErrors';
import { getPlacePredictions, reverseGeocode } from '../services/mapService';
import { PredictionsList, PlacePrediction } from '../components/map/PredictionsList';
import { NavigationScreen } from './NavigationScreen';
import { TabScreenHeader } from '../components/common/TabScreenHeader';

export const SakhaScreen = () => {
    const {
        navigationOrigin,
        navigationDestination,
        setNavigationOrigin,
        setNavigationDestination,
        setActiveModal,
        isNavigating,
        currentTripDetails,
        endNavigation
    } = useAppContext();
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [originPredictions, setOriginPredictions] = useState<PlacePrediction[]>([]);
    const [destinationPredictions, setDestinationPredictions] = useState<PlacePrediction[]>([]);
    const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
    const [permissionError, setPermissionError] = useState<string | null>(null);

    const [micPermissionError, setMicPermissionError] = useState<string | null>(null);
    const [isListeningFor, setIsListeningFor] = useState<'origin' | 'destination' | null>(null);
    const recognitionRef = useRef<any>(null);

    // Removed initial autocomplete service check
    useEffect(() => {
        // No-op
    }, []);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (activeInput === 'origin' && navigationOrigin && navigationOrigin.length > 2 && navigationOrigin !== 'Current Location') {
                const results = await getPlacePredictions(navigationOrigin);
                setOriginPredictions(results);
            } else {
                setOriginPredictions([]);
            }
        };
        const timer = setTimeout(fetchPredictions, 300);
        return () => clearTimeout(timer);
    }, [navigationOrigin, activeInput]);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (activeInput === 'destination' && navigationDestination && navigationDestination.length > 2) {
                const results = await getPlacePredictions(navigationDestination);
                setDestinationPredictions(results);
            } else {
                setDestinationPredictions([]);
            }
        };
        const timer = setTimeout(fetchPredictions, 300);
        return () => clearTimeout(timer);
    }, [navigationDestination, activeInput]);

    const handleSelectPrediction = (field: 'origin' | 'destination', prediction: PlacePrediction) => {
        if (field === 'origin') {
            setNavigationOrigin(prediction.description);
        } else {
            setNavigationDestination(prediction.description);
        }
        setActiveInput(null);
    };

    const handleVoiceSearch = async (field: 'origin' | 'destination') => {
        if (isListeningFor) {
            recognitionRef.current?.stop();
            return;
        }

        setMicPermissionError(null);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setMicPermissionError("Speech recognition is not supported by your browser. Please try a different browser.");
            return;
        }

        // First, explicitly ask for permission using the modern API
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // We got permission. We don't need the stream, so stop it.
            stream.getTracks().forEach(track => track.stop());
        } catch (err: any) {
            console.error("Microphone permission error:", err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setMicPermissionError("Microphone access denied. Please enable microphone permissions in your browser and device settings to use voice search.");
            } else {
                setMicPermissionError(`An error occurred while accessing the microphone: ${err.message}.`);
            }
            return;
        }

        // Now that permission is granted, proceed with SpeechRecognition
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListeningFor(field);
        };

        recognition.onend = () => {
            setIsListeningFor(null);
            recognitionRef.current = null;
        };

        recognition.onerror = (event: any) => {
            // This is now for runtime errors, not permission errors
            setMicPermissionError(`A speech recognition error occurred: ${event.error}. Please try again.`);
            setIsListeningFor(null);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (field === 'origin') {
                setNavigationOrigin(transcript);
            } else {
                setNavigationDestination(transcript);
            }
        };

        recognition.start();
    };


    if (isNavigating && currentTripDetails) {
        return <NavigationScreen tripDetails={currentTripDetails} onCheckOut={endNavigation} />;
    }

    const handleStartTrip = async () => {
        if (permissionError) setPermissionError(null);

        if (!navigationDestination) {
            alert("Please enter a destination.");
            return;
        }
        if (!navigationOrigin) {
            alert("Please enter an origin.");
            return;
        }

        // Helper function to resolve 'Current Location'
        const resolveCurrentLocation = async (field: 'origin' | 'destination') => {
            setIsLoadingLocation(true);
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    if (!navigator.geolocation) {
                        return reject(new Error("Geolocation is not supported by this browser."));
                    }
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 10000,
                        enableHighAccuracy: true,
                    });
                });

                const latLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Use mapService reverse geocode
                const formattedAddress = await reverseGeocode(position.coords.latitude, position.coords.longitude);
                if (formattedAddress && formattedAddress !== "Unknown Location") {
                    // Update the context state
                    if (field === 'origin') {
                        setNavigationOrigin(formattedAddress);
                    } else {
                        setNavigationDestination(formattedAddress);
                    }
                    return formattedAddress;
                } else {
                    throw new Error("No address found for your location.");
                }
            } catch (error: any) {
                console.error("Error getting current location:", error);

                let errorMessage = "Could not get your location. Please enter an address manually.";
                if (error?.code === 1) errorMessage = "Location access denied. TripSync needs this to use your current position. Please enable location permissions in your browser and device settings.";
                else if (error?.code === 2) errorMessage = "Location information is unavailable. Check your network or GPS.";
                else if (error?.code === 3) errorMessage = "Request for your location timed out. Please try again.";
                else if (error?.message) errorMessage = error.message;

                setPermissionError(errorMessage);

                // Clear the problematic field
                if (field === 'origin') {
                    setNavigationOrigin('');
                } else {
                    setNavigationDestination('');
                }
                return null; // Indicate failure
            } finally {
                setIsLoadingLocation(false);
            }
        };

        // Resolve origin if it's 'Current Location'
        if (navigationOrigin === 'Current Location') {
            const resolvedOrigin = await resolveCurrentLocation('origin');
            if (!resolvedOrigin) {
                return; // Stop if location resolution fails
            }
        }

        // Resolve destination if it's 'Current Location'
        if (navigationDestination === 'Current Location') {
            const resolvedDestination = await resolveCurrentLocation('destination');
            if (!resolvedDestination) {
                return; // Stop if location resolution fails
            }
        }

        // Final check to ensure we have valid locations before proceeding
        if (!navigationOrigin || !navigationDestination || navigationOrigin === 'Current Location' || navigationDestination === 'Current Location') {
            if (!permissionError) alert("Please provide valid start and end locations.");
            return;
        }

        setActiveModal('travelMode');
    };

    const handleOriginFocus = () => {
        if (navigationOrigin === 'Current Location') {
            setNavigationOrigin('');
        }
        setActiveInput('origin');
    };

    const handleReverse = () => {
        const tempOrigin = navigationOrigin;
        setNavigationOrigin(navigationDestination);
        setNavigationDestination(tempOrigin);
    };

    return (
        <>
            <TabScreenHeader title="Sakha" />
            <div className="p-4 text-gray-900 dark:text-white relative">
                <div className="mt-4">
                    <div className="relative">
                        <div className="relative mb-2">
                            <label htmlFor="origin-input" className="text-gray-500 dark:text-gray-300 text-sm font-semibold mb-2 block">Origin</label>
                            <div className="relative">
                                <input
                                    id="origin-input"
                                    type="text"
                                    value={navigationOrigin || ''}
                                    onFocus={handleOriginFocus}
                                    onBlur={() => setTimeout(() => setActiveInput(null), 150)}
                                    onChange={(e) => setNavigationOrigin(e.target.value)}
                                    placeholder="Enter starting point"
                                    className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400"
                                    autoComplete="off"
                                />
                                <button
                                    onClick={() => handleVoiceSearch('origin')}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${isListeningFor === 'origin' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                                    aria-label="Search by voice for origin"
                                >
                                    <MicrophoneIcon className="w-5 h-5" />
                                </button>
                            </div>
                            {activeInput === 'origin' && originPredictions.length > 0 && (
                                <PredictionsList predictions={originPredictions} onSelect={(p) => handleSelectPrediction('origin', p)} />
                            )}
                        </div>

                        <div className="relative">
                            <label htmlFor="destination-input" className="text-gray-500 dark:text-gray-300 text-sm font-semibold mb-2 block">Destination</label>
                            <div className="relative">
                                <input
                                    id="destination-input"
                                    type="text"
                                    value={navigationDestination || ''}
                                    onFocus={() => setActiveInput('destination')}
                                    onBlur={() => setTimeout(() => setActiveInput(null), 150)}
                                    onChange={(e) => setNavigationDestination(e.target.value)}
                                    placeholder="Where to?"
                                    className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 pr-10 placeholder-gray-500 dark:placeholder-gray-400"
                                    autoComplete="off"
                                />
                                <button
                                    onClick={() => handleVoiceSearch('destination')}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${isListeningFor === 'destination' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                                    aria-label="Search by voice for destination"
                                >
                                    <MicrophoneIcon className="w-5 h-5" />
                                </button>
                            </div>
                            {activeInput === 'destination' && destinationPredictions.length > 0 && (
                                <PredictionsList predictions={destinationPredictions} onSelect={(p) => handleSelectPrediction('destination', p)} />
                            )}
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <button
                                onClick={handleReverse}
                                className="p-3 bg-white dark:bg-slate-600 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors border-4 border-slate-50 dark:border-slate-800 shadow-md"
                                aria-label="Reverse origin and destination"
                            >
                                <ReverseIcon />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleStartTrip}
                        disabled={!navigationDestination || isLoadingLocation}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 mt-6"
                    >
                        {isLoadingLocation ? 'Getting Location...' : 'Start Trip'}
                    </button>
                </div>
                {permissionError && (
                    <GeolocationPermissionError
                        message={permissionError}
                        onRetry={() => {
                            setPermissionError(null);
                            handleStartTrip();
                        }}
                        onCancel={() => setPermissionError(null)}
                    />
                )}
                {micPermissionError && (
                    <MicrophonePermissionError
                        message={micPermissionError}
                        onRetry={() => setMicPermissionError(null)}
                        onCancel={() => setMicPermissionError(null)}
                    />
                )}
            </div>
        </>
    );
};
