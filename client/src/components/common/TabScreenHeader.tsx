
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Screen } from '../../types';
import { ArrowLeftIcon } from '../../constants';

// Note: The new design for TabScreenHeader in some screens (Sakha, Planner, History) seems to be just a title centered or with back button?
// In App.tsx (original):
/*
const TabScreenHeader = ({ title }: { title: string }) => {
    const { setScreen } = useAppContext();
    return (
        <header className="flex items-center p-4 bg-white/80 dark:bg-slate-900/30 backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200 dark:border-slate-700/50">
            <button onClick={() => setScreen(Screen.Home)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700/50 mr-3" aria-label="Go back to home">
                <ArrowLeftIcon className="h-6 w-6 text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </header>
    );
};
*/
// But in SakhaScreen/PlannerScreen inline definitions they were simpler:
/*
const TabScreenHeader = ({ title }: { title: string }) => (
    <div className="bg-white dark:bg-slate-700 p-4 shadow-sm flex items-center justify-center sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
    </div>
);
*/
// The user might prefer the one with the Back button if they are navigating from Home -> Tab.
// However, the "Tabs" (Sakha, Planner, Destinations, History) are main navigation tabs. Usually they don't have a "back" button to Home, but the Bottom Nav allows going to Home (if Home is a tab? No, Home is a Screen).
// In `MainScreen`, Home is reachable via the bottom nav item "Home".
// So the header probably shouldn't have a back button if it's in the MainScreen tab view.
// I will stick to the simpler centered title version for the tabs, as seen in the recent inline definitions.

export const TabScreenHeader = ({ title }: { title: string }) => (
    <div className="bg-white dark:bg-slate-700 p-4 shadow-sm flex items-center justify-center sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
    </div>
);
