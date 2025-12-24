
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, PetrolPumpIcon, RestaurantIcon, AtmIcon, EvChargingIcon } from '../../constants';

import { getPlacePredictions } from '../../services/mapService';
import { PlacePrediction } from './PredictionsList';

export const AddStopModal = ({ onClose, onCategorySelect, onPlaceSelect }: { onClose: () => void; onCategorySelect: (type: string, keyword: string) => void; onPlaceSelect: (placeId: string) => void; }) => {
    const [query, setQuery] = useState('');
    const [predictions, setPredictions] = useState<PlacePrediction[]>([]);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (query.length > 2) {
                const results = await getPlacePredictions(query);
                setPredictions(results);
            } else {
                setPredictions([]);
            }
        };

        // Debounce
        const timerId = setTimeout(fetchPredictions, 300);
        return () => clearTimeout(timerId);
    }, [query]);

    const handlePredictionClick = (placeId: string) => {
        setQuery('');
        setPredictions([]);
        onPlaceSelect(placeId);
    };

    const StopCategoryButton = ({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string; onClick: () => void; }) => (
        <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 p-3 bg-gray-100 dark:bg-slate-600/80 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors">
            <Icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{label}</span>
        </button>
    );

    return (
        <div className="absolute inset-0 bg-black/50 z-20 flex flex-col justify-end" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-700 rounded-t-2xl p-4 w-full text-gray-900 dark:text-white"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add a stop</h2>
                    <button onClick={onClose} className="text-gray-400 dark:text-gray-300 text-2xl">&times;</button>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search for a location or category"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-slate-600 rounded-lg p-3 pl-10 placeholder-gray-500 dark:placeholder-gray-300 text-gray-900 dark:text-white"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                        <SearchIcon />
                    </div>
                    {predictions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white dark:bg-slate-800 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                            {predictions.map((p) => (
                                <li
                                    key={p.place_id}
                                    onClick={() => handlePredictionClick(p.place_id)}
                                    className="p-3 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer border-b border-gray-100 dark:border-slate-700"
                                >
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{p.structured_formatting.main_text}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.structured_formatting.secondary_text}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="grid grid-cols-4 gap-3 text-center">
                    <StopCategoryButton icon={PetrolPumpIcon} label="Petrol" onClick={() => onCategorySelect('gas_station', 'Petrol Pumps')} />
                    <StopCategoryButton icon={RestaurantIcon} label="Food" onClick={() => onCategorySelect('restaurant', 'Restaurants')} />
                    <StopCategoryButton icon={AtmIcon} label="ATM" onClick={() => onCategorySelect('atm', 'ATMs')} />
                    <StopCategoryButton icon={EvChargingIcon} label="EV" onClick={() => onCategorySelect('charging_station', 'EV Charging')} />
                </div>
            </div>
        </div>
    );
};
