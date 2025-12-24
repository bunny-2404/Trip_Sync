
import React from 'react';

export const StopsListModal = ({ title, stops, onSelect, onClose, isLoading }: { title: string; stops: any[] | null; onSelect: (place: any) => void; onClose: () => void; isLoading: boolean; }) => {
    return (
        <div className="absolute inset-0 bg-black/60 z-30 flex flex-col justify-end" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-t-2xl p-4 w-full h-[75%] text-gray-900 dark:text-white flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-300 text-3xl font-light">&times;</button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 dark:text-gray-300">Finding nearby places...</p>
                        </div>
                    ) : stops && stops.length > 0 ? (
                        <ul className="space-y-3">
                            {stops.map(({ place, distance, duration }, index) => (
                                <li key={place.place_id || index} className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg flex justify-between items-center shadow-sm">
                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="font-bold truncate" title={place.name}>{place.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-300 truncate" title={place.vicinity}>{place.vicinity}</p>
                                        {distance && duration && (
                                            <div className="flex items-center space-x-3 text-xs mt-1">
                                                <span className="font-semibold text-cyan-600 dark:text-cyan-400">{distance.text}</span>
                                                <span className="text-gray-400 dark:text-gray-500">|</span>
                                                <span className="text-gray-600 dark:text-gray-400">{duration.text}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => onSelect({ place })}
                                        className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-colors flex-shrink-0"
                                    >
                                        Select
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-red-500 dark:text-red-400 text-center">No results found nearby. Please try another category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
