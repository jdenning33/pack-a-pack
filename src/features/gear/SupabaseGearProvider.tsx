'use client';
import { Gear } from '@/lib/appTypes';
import { useAddGear } from '@/lib/supabse/gear/useAddGear';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';
import { useUpdateGear } from '@/lib/supabse/gear/useUpdateGear';
import React, { useState, ReactNode } from 'react';
import { GearContract, GearContext, useGear, GearQueryParams } from './useGear';

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

    const addGearMutation = useAddGear();
    const updateGearMutation = useUpdateGear();

    const gearContract: GearContract = {
        gear,
        isLoading,
        isError,
        error,
        searchParams,
        setSearchParams: setSearchParams,
        addGear: (gear: Omit<Gear, 'id'>) => addGearMutation.mutateAsync(gear),
        updateGear: (gear: Gear) => updateGearMutation.mutateAsync(gear),
        removeGear: (gear: Gear) =>
            updateGearMutation.mutateAsync({ ...gear, isDeleted: true }),
    };

    return (
        <GearContext.Provider value={gearContract}>
            {children}
        </GearContext.Provider>
    );
};

export { useGear };
