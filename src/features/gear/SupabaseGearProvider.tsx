'use client';
import { Gear } from '@/lib/appTypes';
import { useAddGear } from '@/lib/supabse/gear/useAddGear';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';
import { useRemoveGear } from '@/lib/supabse/gear/useRemoveGear';
import { useUpdateGear } from '@/lib/supabse/gear/useUpdateGear';
import React, { useState, ReactNode, useEffect } from 'react';
import { GearContract, GearContext, useGear } from './useGear';

export const SupabaseGearProvider: React.FC<{
    children: ReactNode;
    searchText?: string;
    kitFilter?: string;
    itemFilter?: string;
}> = ({ children, searchText = '', kitFilter = '', itemFilter = '' }) => {
    const [activeSearchText, setActiveSearchText] = useState('');
    const [activeKitFilter, setActiveKitFilter] = useState('');
    const [activeItemFilter, setActiveItemFilter] = useState('');

    useEffect(() => {
        setActiveSearchText(searchText);
    }, [searchText]);
    useEffect(() => {
        setActiveKitFilter(kitFilter);
    }, [kitFilter]);
    useEffect(() => {
        setActiveItemFilter(itemFilter);
    }, [itemFilter]);

    const {
        data: gear = [],
        isLoading,
        isError,
        error,
    } = useGearQuery({
        searchText: activeSearchText,
        kitFilter: activeKitFilter,
        itemFilter: activeItemFilter,
    });

    const addGearMutation = useAddGear();
    const updateGearMutation = useUpdateGear();
    const removeGearMutation = useRemoveGear();

    const gearContract: GearContract = {
        gear,
        isLoading,
        isError,
        error,
        searchText: activeSearchText,
        setSearchText: setActiveSearchText,
        kitFilter: activeKitFilter,
        setKitFilter: setActiveKitFilter,
        itemFilter: activeItemFilter,
        setItemFilter: setActiveItemFilter,
        addGear: (gear: Omit<Gear, 'id'>) => addGearMutation.mutateAsync(gear),
        updateGear: (gear: Gear) => updateGearMutation.mutateAsync(gear),
        removeGear: (gear: Gear) => removeGearMutation.mutateAsync(gear.id),
    };

    return (
        <GearContext.Provider value={gearContract}>
            {children}
        </GearContext.Provider>
    );
};

export { useGear };
