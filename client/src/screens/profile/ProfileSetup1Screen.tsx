
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Screen } from '../../types';
import { ArrowLeftIcon } from '../../constants';
import { VehicleCounter } from '../../components/common/VehicleCounter';

export const ProfileSetup1Screen = () => {
    const { startProfileSetup, setScreen } = useAppContext();
    const [name, setName] = useState('');
    const [numTwoWheelers, setNumTwoWheelers] = useState(0);
    const [numFourWheelers, setNumFourWheelers] = useState(0);

    const handleContinue = () => {
        if (name) {
            startProfileSetup({ name, numTwoWheelers, numFourWheelers });
        }
    };

    return (
        <div className="h-screen text-gray-900 dark:text-white flex flex-col">
            <header className="flex items-center p-4">
                <button onClick={() => setScreen(Screen.SignUp)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700/50" aria-label="Go back">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                </button>
            </header>
            <div className="p-6 pt-0 flex-grow flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <h1 className="text-3xl font-bold mt-2">Profile Setup</h1>
                    <p className="text-gray-500 dark:text-gray-300 mt-2">Let's get to know you better.</p>

                    <div className="mt-6">
                        <label className="text-gray-500 dark:text-gray-300 mb-2 block">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                            className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-4 placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mt-6 space-y-4">
                        <h2 className="text-xl font-semibold">My Vehicles</h2>
                        <VehicleCounter
                            label="2 Wheeler"
                            value={numTwoWheelers}
                            onIncrement={() => setNumTwoWheelers(v => v + 1)}
                            onDecrement={() => setNumTwoWheelers(v => Math.max(0, v - 1))}
                        />
                        <VehicleCounter
                            label="4 Wheeler"
                            value={numFourWheelers}
                            onIncrement={() => setNumFourWheelers(v => v + 1)}
                            onDecrement={() => setNumFourWheelers(v => Math.max(0, v - 1))}
                        />
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    className="mt-auto w-full bg-blue-600 text-white font-bold py-4 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 flex-shrink-0"
                    disabled={!name}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};
