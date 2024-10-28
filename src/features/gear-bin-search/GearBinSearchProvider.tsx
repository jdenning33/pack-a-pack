import { useGearBinQuery } from '@/lib/supabse/gear-bin/useGearBinQuery';
import React, { ReactNode, useMemo } from 'react';
import {
    UserGearBinsContext,
    UserGearBinsContextType,
} from './useGearBinSearch';
import { useAuth } from '../auth/useAuth';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';

export const UserGearBinSearchProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user } = useAuth();

    const searchParams = {
        userId: user?.id || '',
    };

    const userGearBinQuery = useGearBinQuery(searchParams);
    const userGearQuery = useGearQuery({
        gearType: 'user',
        gearUserId: user?.id,
    });

    const userGearBins = useMemo(
        () => userGearBinQuery.data || [],
        [userGearBinQuery.data]
    );
    const userGear = useMemo(
        () => userGearQuery.data || [],
        [userGearQuery.data]
    );

    const gearBinsWithGear = useMemo(
        () =>
            userGearBins.map((bin) => ({
                ...bin,
                gear: userGear.filter((gear) => gear.userGearBinId === bin.id),
            })),
        [userGearBins, userGear]
    );

    console.log('userGear', userGear);

    const binlessGear = useMemo(
        () =>
            userGear.filter(
                (gear) =>
                    !userGearBins.some((bin) => bin.id === gear.userGearBinId)
            ),
        [userGear, userGearBins]
    );

    const setSearchParams = () => {
        console.error('setSearchParams not available for this provider');
    };

    const value: UserGearBinsContextType = {
        gearBins: gearBinsWithGear,
        binlessGear: binlessGear,
        searchParams,
        setSearchParams,
    };

    return (
        <UserGearBinsContext.Provider value={value}>
            {children}
        </UserGearBinsContext.Provider>
    );
};
