'use client';
import React, { useMemo, ReactNode } from 'react';
import { usePackStore } from '@/lib/zustandStore';
import { PackSummary, PacksContext } from './usePacks';

export const ZustandPacksProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { packs, addPack: addPackToStore, deletePack } = usePackStore();

    const packSummaries: PackSummary[] = useMemo(
        () =>
            packs.map((pack) => ({
                id: pack.id,
                name: pack.name,
                isPublic: pack.isPublic,
                isGearLocker: pack.isGearLocker,
                description: pack.description,
            })),
        [packs]
    );

    const addPack = (name: string, description: string) => {
        addPackToStore({
            name,
            description,
            isPublic: false,
            isGearLocker: false,
        });
    };

    const value = useMemo(
        () => ({
            packs: packSummaries,
            addPack,
            deletePack,
        }),
        [packSummaries, deletePack]
    );

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
