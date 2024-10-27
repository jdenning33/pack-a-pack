import { useGearBinQuery } from '@/lib/supabse/gear-bin/useGearBinQuery';
import React, { ReactNode } from 'react';
import {
    UserGearBinsContext,
    UserGearBinsContextType,
} from './useGearBinSearch';
import { useAuth } from '../auth/useAuth';

export const UserGearBinSearchProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user } = useAuth();

    const searchParams = {
        userId: user?.id || '',
    };

    const userGearBinQuery = useGearBinQuery(searchParams);

    const setSearchParams = () => {
        console.error('setSearchParams not available for this provider');
    };

    const value: UserGearBinsContextType = {
        userGearBins: userGearBinQuery.data || [],
        searchParams,
        setSearchParams,
    };

    return (
        <UserGearBinsContext.Provider value={value}>
            {children}
        </UserGearBinsContext.Provider>
    );
};
