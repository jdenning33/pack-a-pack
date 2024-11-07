// File: src/providers/UserGearBinProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { GearBinContext, GearBinContract } from './useGearBin';
import { UserGearBin } from '@/lib/appTypes';

interface GearBinProviderProps {
    children: ReactNode;
    gearBin: UserGearBin;
}

export const GearBinProvider: React.FC<GearBinProviderProps> = ({
    children,
    gearBin,
}) => {
    const value: GearBinContract = {
        gearBin: gearBin,
    };
    return (
        <GearBinContext.Provider value={value}>
            {children}
        </GearBinContext.Provider>
    );
};
