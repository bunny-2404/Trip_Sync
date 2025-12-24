
import React from 'react';
import { MicrophoneIcon } from '../../constants';

export const LocationOffIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
    </svg>
);

export const GeolocationPermissionError = ({ message, onRetry, onCancel }: { message: string, onRetry: () => void, onCancel?: () => void }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 p-6 text-center z-50">
        <div className="w-16 h-16 mb-4 text-red-500">
            <LocationOffIcon />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Location Access Required</h2>
        <p className="text-slate-300 mb-6 max-w-md">{message}</p>
        <div className="bg-slate-800 p-4 rounded-lg text-left text-slate-300 text-sm w-full max-w-md">
            <h3 className="font-semibold text-white mb-2">How to fix this:</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li>Make sure your device's main location service is turned ON.</li>
                <li>In your browser, find Site Settings for this app and set Location to "Allow".</li>
                <li>If you're using a wrapped app (APK), check the app's permissions in your phone's Settings.</li>
            </ol>
        </div>
        <button
            onClick={onRetry}
            className="mt-6 w-full max-w-md bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
            I've fixed it, try again
        </button>
        {onCancel && (
            <button
                onClick={onCancel}
                className="mt-2 w-full max-w-md text-slate-300 font-semibold py-3 rounded-lg hover:text-white hover:bg-slate-700/50 transition-colors"
            >
                Enter manually instead
            </button>
        )}
    </div>
);

export const MicrophonePermissionError = ({ message, onRetry, onCancel }: { message: string; onRetry: () => void; onCancel?: () => void; }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 p-6 text-center z-50">
        <div className="w-16 h-16 mb-4 text-red-500">
            <MicrophoneIcon className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Microphone Access Required</h2>
        <p className="text-slate-300 mb-6 max-w-md">{message}</p>
        <div className="bg-slate-800 p-4 rounded-lg text-left text-slate-300 text-sm w-full max-w-md">
            <h3 className="font-semibold text-white mb-2">How to fix this:</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li>When prompted, click "Allow" to give microphone access.</li>
                <li>In your browser, find Site Settings for this app and set Microphone to "Allow".</li>
                <li>If you're using a wrapped app (APK), check the app's permissions in your phone's Settings.</li>
            </ol>
        </div>
        <button
            onClick={onRetry}
            className="mt-6 w-full max-w-md bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
            I've fixed it, try again
        </button>
        {onCancel && (
            <button
                onClick={onCancel}
                className="mt-2 w-full max-w-md text-slate-300 font-semibold py-3 rounded-lg hover:text-white hover:bg-slate-700/50 transition-colors"
            >
                Cancel
            </button>
        )}
    </div>
);
