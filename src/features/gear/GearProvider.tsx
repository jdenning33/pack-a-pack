import React from 'react';
import { Gear } from '@/lib/appTypes';
import { GearContextType, GearContext } from './useGearContext';

// Main Gear component
export const GearProvider: React.FC<{
    gear?: Gear;
    afterGearUpdated?: (gear: Gear) => void;
    children: React.ReactNode;
}> = ({ gear, afterGearUpdated, children }) => {
    const contextValue: GearContextType = {
        gear: gear,
        afterGearUpdated: (gear) => {
            afterGearUpdated?.(gear);
        },
    };

    return (
        <GearContext.Provider value={contextValue}>
            {children}
        </GearContext.Provider>
    );
};
