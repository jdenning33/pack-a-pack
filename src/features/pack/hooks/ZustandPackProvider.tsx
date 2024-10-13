'use client';
import React, { ReactNode, useMemo } from 'react';
import { PackContract, PackContext } from './usePack';
import { usePackStore } from '@/lib/zustand/zustandStore';

export const ZustandPackProvider: React.FC<PackProviderProps> = ({
    children,
    packId,
}) => {
    const store = usePackStore();

    const pack = useMemo(() => {
        const foundPack = store.packs.find((p) => p.id === packId);
        if (!foundPack) return null;

        const packKits = store.kits.filter((kit) => kit.packId === packId);
        const kitsWithItems = packKits.map((kit) => ({
            ...kit,
            items: store.items
                .filter((item) => item.kitId === kit.id)
                .map((item) => ({
                    ...item,
                    gear: item.gearId
                        ? store.gear.find((g) => g.id === item.gearId)
                        : undefined,
                })),
        }));

        return {
            ...foundPack,
            kits: kitsWithItems,
        };
    }, [store.packs, store.kits, store.items, store.gear, packId]);

    if (!pack) {
        return <div>Pack not found.</div>; // or a loading state
    }

    const packContract: PackContract = {
        pack: pack,
        isReadOnly: false,
        addKit: async (kit) => {
            store.addKit({ ...kit, packId });
        },
        updateKit: async (kit) => {
            store.updateKit(kit);
        },
        deleteKit: async (kit) => {
            store.deleteKit(kit.id);
        },
        addItem: async (item) => {
            store.addItem({ ...item, kitId: pack!.kits[0].id });
        },
        updateItem: async (item) => {
            store.updateItem(item);
        },
        deleteItem: async (item) => {
            store.deleteItem(item.id);
        },
        toggleItemPacked: async (itemId) => {
            const item = store.items.find((i) => i.id === itemId);
            if (!item) throw new Error('Item not found');
            const updatedItem = { ...item, isPacked: !item.isPacked };
            store.updateItem(updatedItem);
        },
    };

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
export interface PackProviderProps {
    children: ReactNode;
    packId: string;
}
