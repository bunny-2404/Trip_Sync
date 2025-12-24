
import React from 'react';
import { LogoSvg } from '../constants';

export const SplashScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-slate-900 dark:text-white animate-fadeIn">
            <div className="w-48 h-48 mb-4">
                <LogoSvg />
            </div>
            <h1 className="text-5xl font-bold tracking-wider">TripSync</h1>
            <p className="text-lg text-slate-500 dark:text-gray-300 mt-2">Capturing Journeys, Shaping Futures.</p>
        </div>
    );
};
