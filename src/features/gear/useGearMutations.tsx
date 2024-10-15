'use client';
import { Gear } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface GearMutationsContract {
    addGear: (gear: Omit<Gear, 'id'>) => Promise<string>;
    updateGear: (gear: Gear) => Promise<string>;
    removeGear: (gear: Gear) => Promise<void>;
}

export const GearMutationsContext = createContext<
    GearMutationsContract | undefined
>(undefined);

export const useGearMutations = (): GearMutationsContract => {
    const context = useContext(GearMutationsContext);
    if (context === undefined) {
        throw new Error(
            'useGearMutations must be used within a GearMutationsProvider'
        );
    }
    return context;
};
