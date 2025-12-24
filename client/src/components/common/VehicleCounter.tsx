
import React from 'react';

export const VehicleCounter = ({ label, value, onIncrement, onDecrement }: { label: string; value: number; onIncrement: () => void; onDecrement: () => void; }) => {
    return (
        <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-4 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</span>
            <div className="flex items-center space-x-3">
                <button
                    onClick={onDecrement}
                    disabled={value === 0}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-white text-2xl flex items-center justify-center disabled:opacity-40 active:bg-gray-300 dark:active:bg-slate-500 transition-opacity"
                    aria-label={`Decrease number of ${label}`}
                >
                    -
                </button>
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-cyan-500 dark:stroke-cyan-400"
                            strokeWidth="2.5"
                        />
                    </svg>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white z-10">{value}</span>
                </div>
                <button
                    onClick={onIncrement}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-white text-2xl flex items-center justify-center active:bg-gray-300 dark:active:bg-slate-500"
                    aria-label={`Increase number of ${label}`}
                >
                    +
                </button>
            </div>
        </div>
    );
};
