
import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Screen } from '../../types';
import { ArrowLeftIcon } from '../../constants';

export const ProfileSetup2Screen = () => {
    const { profileSetupData, completeProfileSetup, skipProfileSetup, setScreen } = useAppContext();
    const [twoWheelers, setTwoWheelers] = useState<string[]>([]);
    const [fourWheelers, setFourWheelers] = useState<string[]>([]);

    useEffect(() => {
        if (profileSetupData) {
            setTwoWheelers(Array(profileSetupData.numTwoWheelers).fill(''));
            setFourWheelers(Array(profileSetupData.numFourWheelers).fill(''));
        }
    }, [profileSetupData]);

    const handleComplete = () => {
        completeProfileSetup({ twoWheelers, fourWheelers });
    };

    const canComplete = useMemo(() => {
        if (!profileSetupData) return false;
        const hasNoVehicles = profileSetupData.numTwoWheelers === 0 && profileSetupData.numFourWheelers === 0;
        if (hasNoVehicles) return true;

        const allTwoWheelersFilled = twoWheelers.every(reg => reg.trim() !== '');
        const allFourWheelersFilled = fourWheelers.every(reg => reg.trim() !== '');
        return allTwoWheelersFilled && allFourWheelersFilled;
    }, [twoWheelers, fourWheelers, profileSetupData]);


    if (!profileSetupData) return null;

    const hasVehicles = profileSetupData.numTwoWheelers > 0 || profileSetupData.numFourWheelers > 0;

    const renderVehicleInputs = (count: number, type: 'two' | 'four', state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (count === 0) return null;
        return (
            <div className="mt-6">
                <h2 className="text-xl font-bold">Your {type}-wheelers</h2>
                {Array.from({ length: count }).map((_, index) => (
                    <input
                        key={`${type}-${index}`}
                        type="text"
                        value={state[index] || ''}
                        onChange={(e) => {
                            const newState = [...state];
                            newState[index] = e.target.value.toUpperCase();
                            setState(newState);
                        }}
                        className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 mt-2 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={`Registration number for ${type}-wheeler ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="h-screen text-gray-900 dark:text-white flex flex-col">
            <header className="flex items-center p-4">
                <button onClick={() => setScreen(Screen.ProfileSetup1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700/50" aria-label="Go back">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                </button>
            </header>
            <div className="p-8 pt-0 h-full flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <h1 className="text-3xl font-bold mt-2">Add your vehicles</h1>
                    <p className="text-gray-500 dark:text-gray-300 mt-2">
                        {hasVehicles ? "Enter registration numbers." : "You have no vehicles to add."}
                    </p>

                    {renderVehicleInputs(profileSetupData.numTwoWheelers, 'two', twoWheelers, setTwoWheelers)}
                    {renderVehicleInputs(profileSetupData.numFourWheelers, 'four', fourWheelers, setFourWheelers)}
                </div>

                <div className="mt-auto pt-4 space-y-3 flex-shrink-0">
                    <button
                        onClick={handleComplete}
                        disabled={!canComplete}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600"
                    >
                        Complete Setup
                    </button>
                    {!hasVehicles && (
                        <button
                            onClick={skipProfileSetup}
                            className="w-full text-gray-500 dark:text-gray-400 font-semibold py-2 rounded-lg"
                        >
                            Skip for now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
