
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Screen } from '../../types';
import { TripSyncAppIcon, IndianFlagIcon, ArrowLeftIcon, EyeOpenIcon, EyeClosedIcon } from '../../constants';

export const SignUpScreen = () => {
    const { handleSignup, setScreen } = useAppContext();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignupClick = async () => {
        // Password validation checks
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            const errorList = [
                "Password must:",
                "• Be at least 8 characters long.",
                "• Contain one uppercase letter.",
                "• Contain one lowercase letter.",
                "• Contain one number.",
                "• Contain one special character."
            ].join('\n');
            setError(errorList);
            setPassword(''); // Clear the password field
            return;
        }

        if (phone.length === 10) {
            setError('');
            const result = await handleSignup(`+91 ${phone}`, password);
            if (!result.success && result.message) {
                setError(result.message);
            }
        }
    };

    const canSubmit = phone.length === 10 && password.length > 0;

    return (
        <div className="relative p-8 h-screen text-gray-900 dark:text-white flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-16">
            <header className="absolute top-0 left-0 p-4 z-10">
                <button onClick={() => setScreen(Screen.Login)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700/50" aria-label="Go back">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                </button>
            </header>

            <div className="flex-grow landscape:flex-grow-0 flex flex-col items-center justify-center">
                <TripSyncAppIcon />
                <p className="text-lg text-gray-500 dark:text-gray-300 mt-4 max-w-xs mx-auto text-center">Your smart travel companion for seamless journeys</p>
            </div>

            <div className="w-full max-w-sm mx-auto mb-4 flex-shrink-0 landscape:flex-shrink">
                <div className="text-left mb-6">
                    <h2 className="text-2xl font-bold">Create Your Account</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Join TripSync to get started</p>
                </div>

                {error && (
                    <div className="text-red-500 dark:text-red-400 text-sm text-left mb-3 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        {error.split('\n').map((line, index) => (
                            <p key={index} className={index === 0 ? 'font-bold' : 'ml-2'}>{line}</p>
                        ))}
                    </div>
                )}

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
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 pr-12 text-lg focus:outline-none placeholder-gray-500 dark:placeholder-white/70"
                            placeholder="Create a Password"
                            aria-label="Password input"
                        />
                        <button
                            onClick={() => setIsPasswordVisible(prev => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 dark:text-gray-300"
                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        >
                            {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSignupClick}
                    className="mt-6 w-full bg-blue-600 text-white font-bold py-4 rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 active:bg-blue-700 transition-colors"
                    disabled={!canSubmit}
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-gray-500 dark:text-gray-300">
                    Already have an account?{' '}
                    <button
                        onClick={() => setScreen(Screen.Login)}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
};
