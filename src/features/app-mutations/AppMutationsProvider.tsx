'use client';
import React, { ReactNode } from 'react';
import {
    AppMutationsContext,
    AppMutationsContextType,
} from './useAppMutations';
import { useUpsertPack } from '@/lib/supabse/pack/useUpsertPack';
import { useUpsertKit } from '@/lib/supabse/kit/useUpsertKit';
import { useUpsertItem } from '@/lib/supabse/item/useUpsertItem';
import { useUpsertGear } from '@/lib/supabse/gear/useUpsertGear';
import { Pack, PackSummary, Kit, Item, Gear } from '@/lib/appTypes';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';

export const AppMutationsProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user } = useSupabaseAuth();
    const upsertPackMutation = useUpsertPack();
    const upsertKitMutation = useUpsertKit();
    const upsertItemMutation = useUpsertItem(user?.id);
    const upsertGearMutation = useUpsertGear();

    const mutationsValue: AppMutationsContextType = {
        // Pack mutations
        upsertPack: async (pack: Omit<Pack | PackSummary, 'id'>) => {
            const result = await upsertPackMutation.mutateAsync(pack);
            return result;
        },
        deletePack: (pack: Pack | PackSummary) => {
            upsertPackMutation.mutate({ ...pack, isDeleted: true });
        },

        // Kit mutations
        addKit: async (kit: Omit<Kit, 'id'>) => {
            const result = await upsertKitMutation.mutateAsync(kit);
            return result;
        },
        updateKit: async (kit: Kit) => {
            const result = await upsertKitMutation.mutateAsync(kit);
            return result;
        },
        deleteKit: async (kit: Kit) => {
            const result = await upsertKitMutation.mutateAsync({
                ...kit,
                isDeleted: true,
            });
            return result;
        },

        // Item mutations
        addItem: async (item: Omit<Item, 'id'>) => {
            const result = await upsertItemMutation.mutateAsync(item);
            return result;
        },
        updateItem: async (item: Item) => {
            const result = await upsertItemMutation.mutateAsync(item);
            return result;
        },
        deleteItem: async (item: Item) => {
            const result = await upsertItemMutation.mutateAsync({
                ...item,
                isDeleted: true,
            });
            return result;
        },

        // Gear mutations
        addGear: async (gear: Omit<Gear, 'id'>) => {
            const result = await upsertGearMutation.mutateAsync(gear);
            return result;
        },
        updateGear: async (gear: Gear) => {
            const result = await upsertGearMutation.mutateAsync(gear);
            return result;
        },
        removeGear: async (gear: Gear) => {
            await upsertGearMutation.mutateAsync({ ...gear, isDeleted: true });
        },
    };

    return (
        <AppMutationsContext.Provider value={mutationsValue}>
            {children}
        </AppMutationsContext.Provider>
    );
};
