'use client';
import { createContext, useContext } from 'react';
import { Gear, UserGearBin } from '@/lib/appTypes';

export interface UserGearBinsContextType {
    gearBins: UserGearBin[];
    binlessGear: Gear[];
    filterText: string;
    setFilterText: (filter: string) => void;
}

export const UserGearBinsContext = createContext<
    UserGearBinsContextType | undefined
>(undefined);

export const useUserGearBins = (): UserGearBinsContextType => {
    const context = useContext(UserGearBinsContext);

    if (context === undefined) {
        throw new Error(
            'useUserGearBins must be used within a UserGearBinsProvider'
        );
    }
    return context;
};
