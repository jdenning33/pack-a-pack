import React from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { GearContextType, GearContext } from './useGearContext';

// Main Gear component
export const GearProvider: React.FC<{
    className?: string;
    gear?: Gear;
    afterGearUpdated?: (gear: Gear) => void;
    children: React.ReactNode;
}> = ({ className, gear, afterGearUpdated, children }) => {
    const contextValue: GearContextType = {
        gear: gear,
        afterGearUpdated: (gear) => {
            afterGearUpdated?.(gear);
        },
    };

    return (
        <GearContext.Provider value={contextValue}>
            <div className={cn('relative group', className)}>{children}</div>
        </GearContext.Provider>
    );
};
