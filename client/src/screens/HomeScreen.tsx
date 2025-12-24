
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, MainTab } from '../types';
import { LogoSvg, HomeSakhaIcon, HomePlannerIcon, HomeDestinationsIcon, HomeHistoryIcon, ArrowLeftIcon } from '../constants';

// Note: TabScreenHeader might be needed if used here, or maybe this screen has its own header.
// Looking at the code (826-928), it has a custom header.

export const HomeScreen = () => {
    const { user, setScreen, setActiveTab } = useAppContext();

    const getInitials = (name: string | undefined) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length > 1 && parts[1]) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    const FeatureCard = ({ iconComponent: Icon, title, subtitle, onClick }: { iconComponent: React.ElementType, title: string, subtitle: string, onClick: () => void }) => (
        <button onClick={onClick} className="bg-white dark:bg-slate-700 p-4 rounded-2xl text-left hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md">
            <Icon />
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mt-3">{title}</h3>
            <p className="text-sm text-gray-400 dark:text-gray-400">{subtitle}</p>
        </button>
    );

    const navigateToTab = (tab: MainTab) => {
        setActiveTab(tab);
        setScreen(Screen.Main);
    }

    return (
        <div className="p-4 text-gray-900 dark:text-white min-h-screen flex flex-col">
            <div className="flex-grow">
                {/* Header */}
                <header className="flex justify-between items-center py-2">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center p-1.5 shadow-sm">
                            <LogoSvg />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-300 dark:text-gray-100">TripSync</h1>
                            <p className="text-sm text-slate-300 dark:text-gray-300">Welcome!</p>
                        </div>
                    </div>
                    <button
                        className="w-12 h-12 bg-blue-800 dark:bg-blue-900 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-lg"
                        onClick={() => setScreen(Screen.Account)}
                        aria-label="Go to account page"
                    >
                        {getInitials(user?.name)}
                    </button>
                </header>

                {/* Welcome Card */}
                <div className="bg-slate-800 rounded-xl p-5 mt-4 shadow-lg">
                    <h2 className="text-2xl font-bold text-white">Hello, {user?.name?.split(' ')[0]}! 👋</h2>
                    <p className="text-gray-300 mt-1">Ready for your next adventure? Let's plan your journey.</p>
                </div>

                {/* Features */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Features</h2>
                    <div className="grid grid-cols-2 landscape:grid-cols-4 gap-4">
                        <FeatureCard
                            iconComponent={HomeSakhaIcon}
                            title="Sakha"
                            subtitle="Navigation"
                            onClick={() => navigateToTab(MainTab.Sakha)}
                        />
                        <FeatureCard
                            iconComponent={HomePlannerIcon}
                            title="My Planner"
                            subtitle="Trip Planning"
                            onClick={() => navigateToTab(MainTab.Planner)}
                        />
                        <FeatureCard
                            iconComponent={HomeDestinationsIcon}
                            title="Destinations"
                            subtitle="Saved Places"
                            onClick={() => navigateToTab(MainTab.Destinations)}
                        />
                        <FeatureCard
                            iconComponent={HomeHistoryIcon}
                            title="Trip History"
                            subtitle="Past Journeys"
                            onClick={() => navigateToTab(MainTab.History)}
                        />
                    </div>
                </section>

                {/* Your Vehicles */}
                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-3 text-slate-300 dark:text-gray-400">Your Vehicles</h2>
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-5 flex justify-around text-center shadow-md">
                        <div>
                            <p className="text-4xl font-bold text-teal-500">{user?.twoWheelers.length || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Two Wheelers</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-teal-500">{user?.fourWheelers.length || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Four Wheelers</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
