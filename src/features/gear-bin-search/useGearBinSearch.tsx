'use client';
import { createContext, useContext } from 'react';
import { Gear, UserGearBin } from '@/lib/appTypes';

export type UserGearBinSearchOptions = Partial<{
    searchText: string;
    orderBy: 'name' | 'created_at' | 'updated_at' | 'user_id';
    orderDirection: 'asc' | 'desc';
    limit: number;
    page: number;
    userId: string;
}>;

export interface UserGearBinsContextType {
    gearBins: UserGearBin[];
    binlessGear: Gear[];
    searchParams: UserGearBinSearchOptions;
    setSearchParams: (
        setter: (prev: UserGearBinSearchOptions) => UserGearBinSearchOptions
    ) => void;
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
