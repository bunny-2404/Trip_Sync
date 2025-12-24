
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MainTab, Screen } from '../types';
import { HomeIcon, SakhaIcon, PlannerIcon, PlacesIcon, HistoryIcon } from '../constants';
import { SakhaScreen } from './SakhaScreen';
import { PlannerScreen } from './planner/PlannerScreen';
import { DestinationsScreen } from './DestinationsScreen';
import { HistoryScreen } from './HistoryScreen';
import { GlobalModals } from '../components/common/GlobalModals';

export const MainScreen = () => {
    const { activeTab, setActiveTab, setScreen } = useAppContext();

    const renderContent = () => {
        switch (activeTab) {
            case MainTab.Sakha: return <SakhaScreen />;
            case MainTab.Planner: return <PlannerScreen />;
            case MainTab.Destinations: return <DestinationsScreen />;
            case MainTab.History: return <HistoryScreen />;
            default: return <SakhaScreen />;
        }
    };

    const navItems = [
        { tab: MainTab.Home, icon: HomeIcon, label: 'Home' },
        { tab: MainTab.Sakha, icon: SakhaIcon, label: 'Sakha' },
        { tab: MainTab.Planner, icon: PlannerIcon, label: 'My Planner' },
        { tab: MainTab.Destinations, icon: PlacesIcon, label: 'My Places' },
        { tab: MainTab.History, icon: HistoryIcon, label: 'Trip History' },
    ];

    return (
        <div className="h-screen flex flex-col pointer-events-auto">
            <div className={`flex-grow overflow-y-auto`}>
                {renderContent()}
            </div>
            <div className="bg-white/80 dark:bg-slate-700/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-2 z-20">
                <div className="flex justify-around">
                    {navItems.map(item => (
                        <button
                            key={item.tab}
                            onClick={() => {
                                if (item.tab === MainTab.Home) {
                                    setScreen(Screen.Home);
                                } else {
                                    setActiveTab(item.tab);
                                }
                            }}
                            className="flex flex-col items-center p-2 rounded-lg w-20"
                        >
                            <item.icon isActive={activeTab === item.tab} />
                            <span className={`text-xs mt-1 text-center ${activeTab === item.tab ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <GlobalModals />
        </div>
    );
};
