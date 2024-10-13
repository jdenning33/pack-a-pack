'use client';
import { Gear } from '@/lib/appTypes';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';
import React, { useState, ReactNode } from 'react';
import { GearContract, GearContext, useGear, GearQueryParams } from './useGear';
import { useUpsertGear } from '@/lib/supabse/gear/useUpsertGear';

export const SupabaseGearProvider: React.FC<{
    children: ReactNode;
    defaultSearchParams?: GearQueryParams;
}> = ({ children, defaultSearchParams }) => {
    const [searchParams, setSearchParams] = useState<GearQueryParams>(
        defaultSearchParams || {}
    );

    const {
        data: gear = [],
        isLoading,
        isError,
        error,
    } = useGearQuery(searchParams);

    const upsertGearMutation = useUpsertGear();

    const gearContract: GearContract = {
        gear,
        isLoading,
        isError,
        error,
        searchParams,
        setSearchParams: setSearchParams,
        addGear: (gear: Omit<Gear, 'id'>) =>
            upsertGearMutation.mutateAsync(gear),
        updateGear: (gear: Gear) => upsertGearMutation.mutateAsync(gear),
        removeGear: (gear: Gear) =>
            upsertGearMutation.mutateAsync({ ...gear, isDeleted: true }),
    };

    return (
        <GearContext.Provider value={gearContract}>
            {children}
        </GearContext.Provider>
    );
};

export { useGear };
