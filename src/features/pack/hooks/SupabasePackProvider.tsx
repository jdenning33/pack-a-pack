// File: src/providers/PackProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { PackContext, PackContract } from './usePack';
import { usePackQuery } from '@/lib/supabse/pack/usePackQuery';
import { useAddKit } from '@/lib/supabse/kit/useAddKit';
import { useUpdateKit } from '@/lib/supabse/kit/useUpdateKit';
import { useAddItem } from '@/lib/supabse/item/useAddItem';
import { useDeleteItem } from '@/lib/supabse/item/useDeleteItem';
import { useUpdateItem } from '@/lib/supabse/item/useUpdateItem';
import { useDeleteKit } from '@/lib/supabse/kit/useDeleteKit';

interface PackProviderProps {
    children: ReactNode;
    packId: string;
}

export const SupabasePackProvider: React.FC<PackProviderProps> = ({
    children,
    packId,
}) => {
    const { data: pack } = usePackQuery(packId);
    const addKitMutation = useAddKit(packId);
    const updateKitMutation = useUpdateKit(packId);
    const deleteKitMutation = useDeleteKit(packId);
    const addItemMutation = useAddItem(packId);
    const updateItemMutation = useUpdateItem(packId);
    const deleteItemMutation = useDeleteItem(packId);
    const toggleItemPacked = async (itemId: string) => {
        const item = pack?.kits
            .flatMap((k) => k.items)
            .find((i) => i.id === itemId);
        if (!item) return;
        updateItemMutation.mutateAsync(item);
    };

    const packContract: PackContract = {
        pack: pack!,
        addKit: (kit) => addKitMutation.mutateAsync(kit),
        updateKit: (kit) => updateKitMutation.mutateAsync(kit),
        deleteKit: (kit) => deleteKitMutation.mutateAsync(kit),
        addItem: async (item) => {
            console.log('item', item);
            addItemMutation.mutateAsync(item);
        },
        updateItem: (item) => updateItemMutation.mutateAsync(item),
        deleteItem: (item) => deleteItemMutation.mutateAsync(item),
        toggleItemPacked: toggleItemPacked,
    };

    if (!pack) return null; // or a loading state

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
