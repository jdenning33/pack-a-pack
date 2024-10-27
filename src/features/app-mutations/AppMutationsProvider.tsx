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
import {
    Pack,
    PackSummary,
    Kit,
    Item,
    Gear,
    UserGearBin,
} from '@/lib/appTypes';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';
import { useUpsertUserGear } from '@/lib/supabse/user-gear/useUpsertUserGear';
import { uploadGearImageFromFile } from '@/lib/supabse/gear-images/uploadGearImageFromFile';
import { uploadGearImageFromUrl } from '@/lib/supabse/gear-images/uploadGearImageFromUrl';
import { useUpsertUserGearBin } from '@/lib/supabse/gear-bin/useUpsertGearBin';

export const AppMutationsProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user } = useSupabaseAuth();
    const upsertPackMutation = useUpsertPack();
    const upsertKitMutation = useUpsertKit();
    const upsertItemMutation = useUpsertItem(user?.id);
    const upsertGearMutation = useUpsertGear();
    const upsertUserGearMutation = useUpsertUserGear(user?.id);
    const upsertUserGearBinMutation = useUpsertUserGearBin();

    const clonePack = async (pack: Pack, withGear: boolean) => {
        if (!user) {
            toast.error('You must be logged in to clone a pack');
            throw new Error('User not logged in');
        }

        const newPack = {
            ...pack,
            id: undefined,
            name: `${pack.name} (Copy)`,
            userId: user.id,
            isPublic: false,
        };
        const newPackId = await upsertPackMutation.mutateAsync(newPack);

        for (const kit of pack.kits) {
            const newKit = { ...kit, id: undefined, packId: newPackId };
            const newKitId = await upsertKitMutation.mutateAsync(newKit);

            // clone items async for performance
            kit.items.forEach(async (item) => {
                let newGearId = item.gearId;
                // For any private gear that we don't own, clone it and use the new ID
                if (
                    withGear &&
                    item.gear &&
                    item.gear.isPublic === false &&
                    item.gear.createdById !== user.id
                ) {
                    const newGear: Optional<Gear, 'id'> = {
                        ...item.gear,
                        id: undefined,
                        createdById: user.id,
                        isDeleted: false,
                        isPublic: false,
                    };
                    newGearId = await upsertGearMutation.mutateAsync(newGear);
                }

                const newItem: Optional<Item, 'id'> = {
                    ...item,
                    id: undefined,
                    packId: newPackId,
                    kitId: newKitId,
                    gearId: withGear ? newGearId : undefined,
                    isPacked: false,
                };
                await upsertItemMutation.mutateAsync(newItem);
            });
        }

        return newPackId;
    };

    const mutationsValue: AppMutationsContextType = {
        // Pack mutations
        upsertPack: async (pack: Omit<Pack | PackSummary, 'id'>) => {
            const result = await upsertPackMutation.mutateAsync(pack);
            return result;
        },
        deletePack: (pack: Pack | PackSummary) => {
            const result = upsertPackMutation.mutate({
                ...pack,
                isDeleted: true,
            });
            return result;
        },
        clonePack: (pack: Pack, withGear: boolean) => {
            const result = clonePack(pack, withGear);
            return result;
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

        addGearToUser: async (gearId: string) => {
            await upsertUserGearMutation.mutateAsync({
                gearId,
                isRetired: false,
            });
        },
        removeGearFromUser: async (gearId: string) => {
            await upsertUserGearMutation.mutateAsync({
                gearId,
                isRetired: true,
            });
        },

        upsertUserGearBin: async (bin: Omit<UserGearBin, 'id'>) => {
            const result = await upsertUserGearBinMutation.mutateAsync(bin);
            return result;
        },
        deleteUserGearBin: async (bin: UserGearBin) => {
            const result = await upsertUserGearBinMutation.mutateAsync({
                ...bin,
                isDeleted: true,
            });
            return result;
        },

        uploadGearImageFromFile: async (file: File) => {
            return uploadGearImageFromFile(file);
        },
        uploadGearImageFromUrl: async (url) => {
            return uploadGearImageFromUrl(url);
        },
    };

    return (
        <AppMutationsContext.Provider value={mutationsValue}>
            {children}
        </AppMutationsContext.Provider>
    );
};
