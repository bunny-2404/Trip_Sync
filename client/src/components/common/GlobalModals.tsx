
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { WalkingIcon, TrainIcon, TwoWheelerIcon, FourWheelerIcon, EditIcon } from '../../constants';

export const GlobalModals = () => {
    const { activeModal, setActiveModal, user, navigationOrigin, navigationDestination, startNavigation, updateVehicle } = useAppContext();
    const [selectedMode, setSelectedMode] = useState<'2W' | '4W' | 'train' | 'walking' | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [otherVehicleReg, setOtherVehicleReg] = useState('');
    const [travelers, setTravelers] = useState(1);

    // State for the new edit vehicle modal
    const [isEditingVehicle, setIsEditingVehicle] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState<{ id: string, regNumber: string, type: 'twoWheelers' | 'fourWheelers' | 'other' } | null>(null);
    const [editedRegNumber, setEditedRegNumber] = useState('');

    const handleOpenEditModal = (id: string, regNumber: string, type: 'twoWheelers' | 'fourWheelers' | 'other') => {
        setVehicleToEdit({ id, regNumber, type });
        setEditedRegNumber(regNumber);
        setIsEditingVehicle(true);
    };

    const handleSaveVehicleChanges = () => {
        if (!vehicleToEdit) return;

        const finalReg = editedRegNumber.toUpperCase();

        if (vehicleToEdit.type === 'other') {
            setOtherVehicleReg(finalReg);
            if (selectedVehicle === null) {
                // Do nothing to selection
            }
        } else {
            // FIX: Corrected call to `updateVehicle` to pass a single object argument to resolve an argument mismatch error.
            updateVehicle({ type: vehicleToEdit.type as 'twoWheelers' | 'fourWheelers', vehicle: { id: vehicleToEdit.id, regNumber: finalReg } });
            if (selectedVehicle === vehicleToEdit.regNumber) {
                setSelectedVehicle(finalReg);
            }
        }

        setIsEditingVehicle(false);
        setVehicleToEdit(null);
    };

    const handleModeSelect = (mode: '2W' | '4W' | 'train' | 'walking') => {
        setSelectedMode(mode);
        if (mode === '2W' || mode === '4W') {
            setActiveModal('vehicleSelection');
        } else {
            // FIX: Corrected call to `startNavigation` to pass a single TripDetails object, resolving an argument mismatch error.
            if (navigationOrigin && navigationDestination) {
                startNavigation({
                    from: navigationOrigin,
                    to: navigationDestination,
                    mode,
                    travelers: 1,
                });
                closeAndReset();
            }
        }
    }

    const handleVehicleConfirm = () => {
        if (selectedMode && navigationOrigin && navigationDestination) {
            const finalVehicleNumber = selectedVehicle || otherVehicleReg.toUpperCase() || undefined;
            // FIX: Corrected call to `startNavigation` to pass a single TripDetails object, resolving a signature mismatch error.
            startNavigation({
                from: navigationOrigin,
                to: navigationDestination,
                mode: selectedMode,
                travelers,
                vehicleNumber: finalVehicleNumber
            });
            closeAndReset();
        }
    }

    const closeAndReset = () => {
        setActiveModal(null);
        setSelectedMode(null);
        setSelectedVehicle(null);
        setTravelers(1);
        setOtherVehicleReg('');
        setIsEditingVehicle(false);
    }

    const handleSelectRegisteredVehicle = (regNumber: string) => {
        setSelectedVehicle(regNumber);
        setOtherVehicleReg('');
    }

    const handleSelectOtherVehicle = () => {
        setSelectedVehicle(null);
    }

    if (!activeModal) return null;

    const TravelModeButton = ({ onClick, icon: Icon, label }: { onClick: () => void, icon: React.ElementType, label: string }) => (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-slate-600 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <Icon />
            <span className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
        </button>
    );

    return (
        <>
            <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-40 p-4" onClick={closeAndReset}>
                <div className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                    {activeModal === 'travelMode' && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Select Travel Mode</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <TravelModeButton onClick={() => handleModeSelect('walking')} icon={WalkingIcon} label="Walking" />
                                <TravelModeButton onClick={() => handleModeSelect('train')} icon={TrainIcon} label="Train" />
                                <TravelModeButton onClick={() => handleModeSelect('2W')} icon={TwoWheelerIcon} label="2-Wheeler" />
                                <TravelModeButton onClick={() => handleModeSelect('4W')} icon={FourWheelerIcon} label="4-Wheeler" />
                            </div>
                        </>
                    )}
                    {activeModal === 'vehicleSelection' && selectedMode && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Choose Vehicle & Travelers</h2>
                            <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                                {(selectedMode === '4W' ? user?.fourWheelers : user?.twoWheelers)?.map(v => (
                                    <div key={v.id} onClick={() => handleSelectRegisteredVehicle(v.regNumber)} className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer flex justify-between items-center ${selectedVehicle === v.regNumber ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500'}`}>
                                        <span className="font-semibold">{v.regNumber || 'Enter Reg. No.'}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEditModal(v.id, v.regNumber, selectedMode === '4W' ? 'fourWheelers' : 'twoWheelers')
                                            }}
                                            className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                                            aria-label={`Edit vehicle ${v.regNumber}`}
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                                <label className="text-gray-500 dark:text-gray-300 block mb-2 text-sm">Not in your vehicle?</label>
                                <div onClick={handleSelectOtherVehicle} className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer flex justify-between items-center ${selectedVehicle === null ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500'}`}>
                                    <span className="font-semibold">{otherVehicleReg || 'Enter vehicle number'}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenEditModal('other', otherVehicleReg, 'other');
                                        }}
                                        className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                                        aria-label="Edit other vehicle number"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-gray-500 dark:text-gray-300 block mb-2">Total Travelers</label>
                                <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-600 rounded-lg p-2">
                                    <button
                                        onClick={() => setTravelers(t => Math.max(1, t - 1))}
                                        disabled={travelers <= 1}
                                        className="w-10 h-10 rounded-md bg-gray-200 dark:bg-slate-500 text-2xl font-bold flex items-center justify-center active:bg-gray-300 dark:active:bg-slate-400 disabled:opacity-50"
                                        aria-label="Decrease travelers"
                                    >
                                        -
                                    </button>
                                    <span className="flex-grow text-center font-bold text-xl">{travelers}</span>
                                    <button
                                        onClick={() => setTravelers(t => t + 1)}
                                        className="w-10 h-10 rounded-md bg-gray-200 dark:bg-slate-500 text-2xl font-bold flex items-center justify-center active:bg-gray-300 dark:active:bg-slate-400"
                                        aria-label="Increase travelers"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button onClick={handleVehicleConfirm} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold active:bg-blue-500 transition-colors">Start Navigation</button>
                        </>
                    )}
                </div>
            </div>
            {isEditingVehicle && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setIsEditingVehicle(false)}>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-sm text-gray-900 dark:text-white" onClick={e => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">Edit Vehicle Number</h2>
                        <input
                            type="text"
                            value={editedRegNumber}
                            onChange={(e) => setEditedRegNumber(e.target.value)}
                            placeholder="Enter vehicle number"
                            className="w-full bg-gray-100 dark:bg-slate-700 rounded-lg p-3 placeholder-gray-400 dark:placeholder-gray-500"
                            autoFocus
                        />
                        <button onClick={handleSaveVehicleChanges} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
