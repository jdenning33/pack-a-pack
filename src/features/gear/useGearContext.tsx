import { createContext, useContext } from 'react';
import { Gear } from '@/lib/appTypes';

export type GearContextType = {
    gear?: Gear;
    afterGearUpdated: (gear: Gear) => void;
};

export const GearContext = createContext<GearContextType | null>(null);

export const useGearContext = () => {
    const context = useContext(GearContext);
    if (!context) {
        throw new Error('useGearContext must be used within a Gear component');
    }
    return context;
};
