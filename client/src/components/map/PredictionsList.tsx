
// Define generic interface tailored to our app's needs
export interface PlacePrediction {
    description: string;
    place_id: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    };
}

import React from 'react';

export const PredictionsList = ({ predictions, onSelect }: {
    predictions: PlacePrediction[];
    onSelect: (prediction: PlacePrediction) => void;
}) => {
    return (
        <ul className="absolute z-50 w-full bg-white dark:bg-slate-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
            {predictions.map((prediction) => (
                <li
                    key={prediction.place_id}
                    onClick={() => onSelect(prediction)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer border-b border-gray-100 dark:border-slate-600 last:border-0"
                >
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{prediction.structured_formatting.main_text}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{prediction.structured_formatting.secondary_text}</div>
                </li>
            ))}
        </ul>
    );
};
