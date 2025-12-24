
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SavedRoute } from '../types';
import { PlacesIcon, TrashIcon, HomeIcon, HistoryIcon, ReverseIcon } from '../constants';
import { TabScreenHeader } from '../components/common/TabScreenHeader';

export const DestinationsScreen = () => {
    const { savedRoutes, removeRoute, reverseRoute, startNavigationFrom } = useAppContext();

    const handleNavigate = (route: SavedRoute) => {
        startNavigationFrom(route.origin, route.destination);
    }

    if (savedRoutes.length === 0) {
        return (
            <>
                <TabScreenHeader title="Saved Destinations" />
                <div className="p-4 text-gray-900 dark:text-white text-center mt-10">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <PlacesIcon isActive={false} className="w-10 h-10 text-gray-400 dark:text-white/50" />
                    </div>
                    <h2 className="text-xl font-bold mt-4">No Saved Routes</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Routes you save from "My Planner" will appear here.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <TabScreenHeader title="Saved Destinations" />
            <div className="p-4 text-gray-900 dark:text-white">
                <p className="text-gray-500 dark:text-gray-300">Routes you've added from "My Planner."</p>
                <ul className="mt-4 space-y-4">
                    {savedRoutes.map(route => (
                        <li key={route.id} className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">TRIP</p>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{route.origin}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">to</p>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{route.destination}</h3>
                                </div>
                                <button onClick={() => removeRoute(route.id)} className="p-2 -mt-2 -mr-2">
                                    <TrashIcon />
                                </button>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
                                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <HomeIcon isActive={false} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <span className="ml-2">From stay: <span className="font-semibold">{route.stay}</span></span>
                                </div>
                                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <HistoryIcon isActive={false} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <span className="ml-2">Approx. <span className="font-semibold">{route.travelTime}</span></span>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => reverseRoute(route.id)}
                                    className="flex-1 bg-gray-100 dark:bg-slate-600/80 text-gray-800 dark:text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors"
                                >
                                    <ReverseIcon />
                                    Reverse
                                </button>
                                <button
                                    onClick={() => handleNavigate(route)}
                                    className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-500 transition-colors"
                                >
                                    Navigate
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
