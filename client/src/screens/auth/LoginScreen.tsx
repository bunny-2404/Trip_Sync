
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Screen } from '../../types';
import { TripSyncAppIcon, IndianFlagIcon } from '../../constants';

export const LoginScreen = () => {
    const { handleLogin, setScreen } = useAppContext();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = async () => {
        if (phone.length === 10 && password.length > 0) {
            setError('');
            const result = await handleLogin(`+91 ${phone}`, password);
            if (!result.success && result.message) {
                setError(result.message);
            }
        }
    };

    const canSubmit = phone.length === 10 && password.length >= 1;

    return (
        <div className="p-8 h-screen text-gray-900 dark:text-white flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-16">
            <div className="flex-grow landscape:flex-grow-0 flex flex-col items-center justify-center">
                <TripSyncAppIcon />
                <p className="text-lg text-gray-500 dark:text-gray-300 mt-4 max-w-xs mx-auto text-center">Your smart travel companion for seamless journeys</p>
            </div>

            <div className="w-full max-w-sm mx-auto mb-4 flex-shrink-0 landscape:flex-shrink">
                <div className="text-left mb-6">
                    <h2 className="text-2xl font-bold">Welcome Back!</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Login to your account to continue</p>
                </div>

                {error && <p className="text-red-500 dark:text-red-400 text-sm text-center mb-3">{error}</p>}

                <div className="space-y-4">
                    <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-lg p-3">
                        <IndianFlagIcon />
                        <span className="ml-2 mr-1 text-lg text-gray-800 dark:text-white">+91</span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            className="bg-transparent text-lg w-full focus:outline-none placeholder-gray-500 dark:placeholder-white/70"
                            placeholder="00000 00000"
                            aria-label="Mobile number input"
                        />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 text-lg focus:outline-none placeholder-gray-500 dark:placeholder-white/70"
                        placeholder="Password"
                        aria-label="Password input"
                    />
                </div>

                <button
                    onClick={handleLoginClick}
                    className="mt-6 w-full bg-blue-600 text-white font-bold py-4 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 active:bg-blue-700 transition-colors"
                    disabled={!canSubmit}
                >
                    Login
                </button>

                <p className="mt-4 text-center text-gray-500 dark:text-gray-300">
                    Don't have an account?{' '}
                    <button
                        onClick={() => setScreen(Screen.SignUp)}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};
