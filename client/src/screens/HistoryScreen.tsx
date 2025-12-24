
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Trip } from '../types';
import { HistoryIcon, TrashIcon, CarIcon, BikeIcon, TrainIcon, WalkingIcon } from '../constants';

import { TabScreenHeader } from '../components/common/TabScreenHeader';

export const HistoryScreen = () => {
    const { trips, startNavigationFrom, removeTrip, clearTrips } = useAppContext();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleNavigate = (trip: Trip) => {
        startNavigationFrom(trip.from, trip.to);
    }

    const handleDeleteAll = () => {
        clearTrips();
        setShowConfirm(false);
    }

    const DetailItem = ({ icon: Icon, value }: { icon: React.ElementType, value: string | number }) => (
        <div className="flex items-center text-sm bg-gray-100 dark:bg-slate-600/50 py-1 px-2 rounded-md">
            <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-300" />
            <span className="ml-1.5 text-gray-700 dark:text-gray-300">{value}</span>
        </div>
    );

    const ModeIcon = ({ mode }: { mode: Trip['mode'] }) => {
        switch (mode) {
            case '4W': return CarIcon;
            case '2W': return BikeIcon;
            case 'train': return TrainIcon;
            case 'walking': return WalkingIcon;
            default: return CarIcon;
        }
    }

    const TravelersIcon = ({ className = "w-6 h-6" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.778-1.682M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.778-1.682M12 15a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    );

    const StopsIcon = ({ className = "w-6 h-6" }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    if (showConfirm) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-6 text-center text-gray-900 dark:text-white">
                    <h2 className="text-xl font-bold">Are you sure?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">This will permanently delete all your trip history. This action cannot be undone.</p>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-200 dark:bg-gray-600 font-semibold py-2.5 rounded-lg">Cancel</button>
                        <button onClick={handleDeleteAll} className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-lg">Delete All</button>
                    </div>
                </div>
            </div>
        )
    }

    if (trips.length === 0) {
        return (
            <>
                <TabScreenHeader title="Trip History" />
                <div className="p-4 text-gray-900 dark:text-white text-center mt-10">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <HistoryIcon isActive={false} className="w-10 h-10 text-gray-400 dark:text-white/50" />
                    </div>
                    <h2 className="text-xl font-bold mt-4">No Trip History</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Completed trips from "Sakha" will appear here.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <TabScreenHeader title="Trip History" />
            <div className="p-4 text-gray-900 dark:text-white">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-500 dark:text-gray-300">{trips.length} trip{trips.length > 1 ? 's' : ''} recorded.</p>
                    <button onClick={() => setShowConfirm(true)} className="text-red-500 dark:text-red-400 text-sm font-semibold">Delete All</button>
                </div>

                <ul className="space-y-4 landscape:grid landscape:grid-cols-2 landscape:gap-4 landscape:space-y-0">
                    {trips.map((trip, index) => (
                        <li key={trip.id} className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{`TRIP ${trips.length - index}`}</p>
                                    <h3 className="text-lg font-bold">{trip.from} to {trip.to}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">{trip.date}</p>
                                </div>
                                <button onClick={() => removeTrip(trip.id)} className="p-2 -mt-2 -mr-2">
                                    <TrashIcon />
                                </button>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2">
                                <DetailItem icon={ModeIcon({ mode: trip.mode })} value={trip.vehicleNumber || trip.mode} />
                                <DetailItem icon={TravelersIcon} value={`${trip.travelers} Traveler${trip.travelers > 1 ? 's' : ''}`} />
                                <DetailItem icon={StopsIcon} value={`${trip.stops} Stop${trip.stops > 1 ? 's' : ''}`} />
                                <DetailItem icon={HistoryIcon} value={trip.duration} />
                            </div>

                            <div className="mt-4">
                                <button
                                    onClick={() => handleNavigate(trip)}
                                    className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-500 transition-colors"
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
