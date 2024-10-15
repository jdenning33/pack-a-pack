// File: src/providers/PackProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { PackContext, PackContract } from './usePack';
import { usePackQuery } from '@/lib/supabse/pack/usePackQuery';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';
import { useUpsertItem } from '@/lib/supabse/item/useUpsertItem';
import { useUpsertKit } from '@/lib/supabse/kit/useUpsertKit';

interface PackProviderProps {
    children: ReactNode;
    packId: string;
}

export const SupabasePackProvider: React.FC<PackProviderProps> = ({
    children,
    packId,
}) => {
    const { user } = useSupabaseAuth();
    const { pack, isLoading } = usePackQuery(packId);
    const upsertKitMutation = useUpsertKit(packId);
    const upsertItemMutation = useUpsertItem(packId, user?.id);
    const toggleItemPacked = async (itemId: string) => {
        const item = pack?.kits
            .flatMap((k) => k.items)
            .find((i) => i.id === itemId);
        if (!item) return;
        return upsertItemMutation.mutateAsync(item);
    };

    const packContract: PackContract = {
        pack: pack!,
        isReadOnly: !user || pack?.userId !== user.id,
        addKit: (kit) => upsertKitMutation.mutateAsync(kit),
        updateKit: (kit) => upsertKitMutation.mutateAsync(kit),
        deleteKit: (kit) =>
            upsertKitMutation.mutateAsync({ ...kit, isDeleted: true }),
        addItem: async (item) => upsertItemMutation.mutateAsync(item),
        updateItem: (item) => upsertItemMutation.mutateAsync(item),
        deleteItem: (item) =>
            upsertItemMutation.mutateAsync({ ...item, isDeleted: true }),
        toggleItemPacked: toggleItemPacked,
    };

    if (isLoading) return <div>Loading...</div>;
    if (!pack) return <div>Pack not found</div>;

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
