'use client';
import { UserGearBin } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface GearBinContract {
    gearBin?: UserGearBin;
    afterGearBinUpdated?: (kit: UserGearBin) => void;
}

export const GearBinContext = createContext<GearBinContract | undefined>(
    undefined
);

export const useGearBin = (): GearBinContract => {
    const context = useContext(GearBinContext);
    if (context === undefined) {
        throw new Error('useGearBin must be used within a GearBinProvider');
    }
    return context;
};
