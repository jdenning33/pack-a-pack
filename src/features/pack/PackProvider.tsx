// File: src/providers/PackProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { PackContext, PackContract } from './usePack';
import { usePackQuery } from '@/lib/supabse/pack/usePackQuery';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';
import { Pack } from '@/lib/appTypes';

interface PackProviderProps {
    children: ReactNode;
    packId: string;
    afterPackUpdated?: (pack: Pack) => void;
}

export const PackProvider: React.FC<PackProviderProps> = ({
    children,
    packId,
    afterPackUpdated,
}) => {
    const { user } = useSupabaseAuth();
    const { pack, isLoading } = usePackQuery(packId);

    const packContract: PackContract = {
        pack: pack!,
        isReadOnly: !user || pack?.userId !== user.id,
        afterPackUpdated,
    };

    if (isLoading) return <div>Loading...</div>;
    if (!pack && packId != 'new') return <div>Pack not found</div>;

    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
