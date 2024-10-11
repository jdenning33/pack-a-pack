'use client';
import { usePackStore } from '@/lib/zustand/zustandStore';
import React, { ReactNode, useState, useCallback, useMemo } from 'react';
import { GearContext, GearContract } from './useGear';
import { Gear } from '@/lib/appTypes';

interface GearProviderProps {
    children: ReactNode;
}

export const ZustandGearProvider: React.FC<GearProviderProps> = ({
    children,
}) => {
    const packStore = usePackStore();
    const [searchTag, setSearchTag] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    const filteredGear = useMemo(() => {
        return packStore.gear.filter((gear) => {
            const matchesTag = !searchTag || true;
            const matchesText =
                !searchText ||
                gear.name.toLowerCase().includes(searchText.toLowerCase()) ||
                gear.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
            return matchesTag && matchesText;
        });
    }, [packStore.gear, searchTag, searchText]);

    const addGear = useCallback(
        async (gear: Omit<Gear, 'id'>) => {
            packStore.addGear(gear);
        },
        [packStore]
    );

    const updateGear = useCallback(
        async (gear: Gear) => {
            packStore.updateGear(gear);
        },
        [packStore]
    );

    const removeGear = useCallback(
        async (gear: Gear) => {
            packStore.deleteGear(gear.id);
        },
        [packStore]
    );

    const gearContract: GearContract = {
        gear: filteredGear,
        isLoading: false,
        isError: false,
        error: null,
        itemFilter: searchTag,
        setItemFilter: setSearchTag,
        kitFilter: '',
        setKitFilter: () => {},
        searchText,
        setSearchText,
        addGear,
        updateGear,
        removeGear,
    };

    return (
        <GearContext.Provider value={gearContract}>
            {children}
        </GearContext.Provider>
    );
};
