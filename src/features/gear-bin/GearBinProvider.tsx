// File: src/providers/UserGearBinProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { GearBinContext, GearBinContract } from './useGearBin';
import { UserGearBin } from '@/lib/appTypes';

interface UserGearBinProviderProps {
    children: ReactNode;
    gearBin?: UserGearBin;
    afterGearBinUpdated?: (usergearbin: UserGearBin) => void;
}

export const UserGearBinProvider: React.FC<UserGearBinProviderProps> = ({
    children,
    gearBin,
    afterGearBinUpdated,
}) => {
    const value: GearBinContract = {
        gearBin: gearBin,
        afterGearBinUpdated,
    };
    return (
        <GearBinContext.Provider value={value}>
            {children}
        </GearBinContext.Provider>
    );
};
