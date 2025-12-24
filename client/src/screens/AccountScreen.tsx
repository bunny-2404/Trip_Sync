
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, UserProfile, Vehicle } from '../types';
import { ArrowLeftIcon, CarIcon, TrashIcon, BikeIcon } from '../constants';

export const AccountScreen = () => {
    const { user, setUser, setScreen, theme, setTheme } = useAppContext();
    const [draftUser, setDraftUser] = useState<UserProfile | null>(user ? JSON.parse(JSON.stringify(user)) : null);
    const [newVehicle, setNewVehicle] = useState({ type: 'fourWheelers', reg: '' });

    if (!draftUser) return null;

    const handleLogout = () => {
        // Clear all persisted data on logout for a clean slate
        window.localStorage.removeItem('tripsync-user');
        window.localStorage.removeItem('tripsync-screen');
        window.localStorage.removeItem('tripsync-savedRoutes');
        window.localStorage.removeItem('tripsync-trips');
        window.localStorage.removeItem('tripsync-activeTab');
        // We can keep theme and users db if we want

        setUser(null);
        setScreen(Screen.Login);
    }

    const handleSaveChanges = () => {
        setUser(draftUser);
        setScreen(Screen.Home);
    }

    const handleAddVehicle = (e: React.FormEvent) => {
        e.preventDefault();
        if (newVehicle.reg) {
            const vehicle: Vehicle = { id: String(Date.now()), regNumber: newVehicle.reg.toUpperCase() };
            const type = newVehicle.type as 'twoWheelers' | 'fourWheelers';
            setDraftUser(prev => prev ? { ...prev, [type]: [...prev[type], vehicle] } : null);
            setNewVehicle({ type: 'fourWheelers', reg: '' });
        }
    }

    const handleRemoveVehicle = (type: 'twoWheelers' | 'fourWheelers', id: string) => {
        setDraftUser(prev => prev ? { ...prev, [type]: prev[type].filter(v => v.id !== id) } : null);
    }

    const handleRegNumberChange = (type: 'twoWheelers' | 'fourWheelers', id: string, newRegNumber: string) => {
        setDraftUser(prev => {
            if (!prev) return null;
            const updatedVehicles = prev[type].map(vehicle =>
                vehicle.id === id ? { ...vehicle, regNumber: newRegNumber.toUpperCase() } : vehicle
            );
            return { ...prev, [type]: updatedVehicles };
        });
    }

    return (
        <div className="h-screen text-gray-900 dark:text-white flex flex-col">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-slate-700/50 flex-shrink-0 bg-white/80 dark:bg-slate-900/30 backdrop-blur-lg">
                <button onClick={() => setScreen(Screen.Home)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700/50" aria-label="Go back to home">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                </button>
                <h1 className="text-2xl font-bold ml-4">Account Settings</h1>
            </header>

            <div className="flex-grow overflow-y-auto p-6">
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-300">Name</label>
                    <input
                        value={draftUser.name}
                        onChange={e => setDraftUser({ ...draftUser, name: e.target.value })}
                        className="mt-1 w-full text-2xl font-bold bg-gray-100 dark:bg-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">Phone: {draftUser.phone}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Appearance</h2>
                    <div className="mt-2 bg-white dark:bg-slate-700 p-3 rounded-lg flex justify-between items-center shadow-sm">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</span>
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`relative w-12 h-6 rounded-full flex items-center transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-500'}`}>
                            <span className={`w-5 h-5 bg-white rounded-full transform transition-transform absolute ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}></span>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold">My Vehicles</h2>

                    <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Four-wheelers ({draftUser.fourWheelers.length})</h3>
                    <ul className="mt-2 space-y-2">
                        {draftUser.fourWheelers.map(v => (
                            <li key={v.id} className="flex justify-between items-center bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm">
                                <div className="flex items-center flex-grow mr-2">
                                    <CarIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Add Reg. No."
                                        value={v.regNumber}
                                        onChange={(e) => handleRegNumberChange('fourWheelers', v.id, e.target.value)}
                                        className="font-semibold text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 w-full"
                                    />
                                </div>
                                <button onClick={() => handleRemoveVehicle('fourWheelers', v.id)}><TrashIcon /></button>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">Two-wheelers ({draftUser.twoWheelers.length})</h3>
                    <ul className="mt-2 space-y-2">
                        {draftUser.twoWheelers.map(v => (
                            <li key={v.id} className="flex justify-between items-center bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm">
                                <div className="flex items-center flex-grow mr-2">
                                    <BikeIcon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-300 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Add Reg. No."
                                        value={v.regNumber}
                                        onChange={(e) => handleRegNumberChange('twoWheelers', v.id, e.target.value)}
                                        className="font-semibold text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 w-full"
                                    />
                                </div>
                                <button onClick={() => handleRemoveVehicle('twoWheelers', v.id)}><TrashIcon /></button>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleAddVehicle} className="mt-6 p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-2">Add new vehicle</h3>
                        <div className="flex gap-2">
                            <select value={newVehicle.type} onChange={e => setNewVehicle(p => ({ ...p, type: e.target.value }))} className="bg-gray-100 dark:bg-slate-600 rounded p-2">
                                <option value="fourWheelers">4W</option>
                                <option value="twoWheelers">2W</option>
                            </select>
                            <input value={newVehicle.reg} onChange={e => setNewVehicle(p => ({ ...p, reg: e.target.value.toUpperCase() }))} placeholder="MH 01 AB 1234" className="bg-gray-100 dark:bg-slate-600 rounded p-2 flex-grow placeholder-gray-400 dark:placeholder-gray-500" />
                            <button type="submit" className="bg-blue-600 text-white px-4 rounded active:bg-blue-500">Add</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-slate-700/50 flex gap-4 bg-white/80 dark:bg-slate-900/30 backdrop-blur-lg">
                <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 font-bold py-3 rounded-lg hover:bg-red-200 dark:hover:bg-red-600/30 transition-colors"
                >
                    Logout
                </button>
                <button
                    onClick={handleSaveChanges}
                    className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
