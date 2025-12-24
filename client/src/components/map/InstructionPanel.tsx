
import React from 'react';
import { TurnLeftIcon, TurnRightIcon, StraightIcon, UTurnIcon, MergeIcon } from '../../constants';

export const InstructionPanel = ({ step, distanceToNextTurn }: { step: any, distanceToNextTurn: string }) => {
    if (!step) {
        return (
            <div className="absolute top-0 inset-x-0 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm z-10 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">Calculating route...</p>
            </div>
        );
    }

    const getManeuverIcon = (maneuver: string) => {
        const className = "w-10 h-10 text-gray-900 dark:text-white";
        if (maneuver.includes('turn-left') || maneuver.includes('ramp-left')) return <TurnLeftIcon className={className} />;
        if (maneuver.includes('turn-right') || maneuver.includes('ramp-right')) return <TurnRightIcon className={className} />;
        if (maneuver.includes('straight')) return <StraightIcon className={className} />;
        if (maneuver.includes('u-turn')) return <UTurnIcon className={className} />;
        if (maneuver.includes('merge')) return <MergeIcon className={className} />;
        return <StraightIcon className={className} />;
    };

    const instructionText = step.instructions.replace(/<[^>]*>?/gm, '');

    return (
        <div className="absolute top-0 inset-x-0 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm z-10 shadow-lg">
            <div className="flex items-center space-x-4">
                {getManeuverIcon(step.maneuver)}
                <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{instructionText}</p>
                    <p className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mt-1">{distanceToNextTurn}</p>
                </div>
            </div>
        </div>
    );
};
