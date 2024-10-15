// File: src/providers/PackProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { PackContext, PackContract } from './usePack';
import { usePackQuery } from '@/lib/supabse/pack/usePackQuery';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';

interface PackProviderProps {
    children: ReactNode;
    packId: string;
}

export const PackProvider: React.FC<PackProviderProps> = ({
    children,
    packId,
}) => {
    const { user } = useSupabaseAuth();
    const { pack, isLoading } = usePackQuery(packId);

    const packContract: PackContract = {
        pack: pack!,
        isReadOnly: !user || pack?.userId !== user.id,
    };

    if (isLoading) return <div>Loading...</div>;
    if (!pack) return <div>Pack not found</div>;

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
