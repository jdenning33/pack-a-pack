import { useAddPack } from '@/lib/supabse/pack/useAddPack';
import { useDeletePack } from '@/lib/supabse/pack/useDeletePack';
import { usePacksQuery } from '@/lib/supabse/pack/usePacksQuery';
import React, { ReactNode } from 'react';
import { PacksContext } from './usePacks';

export const SupabasePacksProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const packsQuery = usePacksQuery();
    const addPackMutation = useAddPack();
    const deletePackMutation = useDeletePack();

    const value = {
        packs: packsQuery.data || [],
        addPack: (name: string, description: string) =>
            addPackMutation.mutate({ name, description }),
        deletePack: (id: string) => deletePackMutation.mutate(id),
    };

    return (
        <PacksContext.Provider value={value}>{children}</PacksContext.Provider>
    );
};
