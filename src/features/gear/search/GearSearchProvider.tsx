'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';
import {
    GearSearchContract,
    GearSearchContext,
    useGearSearch,
    GearQueryParams,
} from './useGearSearch';
import { useAuth } from '../../auth/useAuth';

export const GearSearchProvider: React.FC<{
    children: ReactNode;
    defaultSearchParams?: GearQueryParams;
}> = ({ children, defaultSearchParams }) => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useState<GearQueryParams>(
        defaultSearchParams || {}
    );
    useEffect(() => {
        setSearchParams(defaultSearchParams || {});
    }, [defaultSearchParams]);

    const {
        data: gear = [],
        isLoading,
        isError,
        error,
    } = useGearQuery({ ...searchParams, gearUserId: user?.id });

    const gearSearchContract: GearSearchContract = {
        gear,
        isLoading,
        isError,
        error,
        searchParams,
        setSearchParams: setSearchParams,
    };

    return (
        <GearSearchContext.Provider value={gearSearchContract}>
            {children}
        </GearSearchContext.Provider>
    );
};

export { useGearSearch };
