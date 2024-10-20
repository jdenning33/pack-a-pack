// File: src/providers/PackProvider.tsx
'use client';
import React, { ReactNode } from 'react';
import { PackContext, PackContract } from './usePack';
import { useSupabaseAuth } from '@/lib/supabse/auth/useSupabaseAuth';
import { Pack } from '@/lib/appTypes';

interface LoadedPackProviderProps {
    children: ReactNode;
    pack: Pack;
    afterPackUpdated?: (pack: Pack) => void;
}

export const LoadedPackProvider: React.FC<LoadedPackProviderProps> = ({
    children,
    pack,
    afterPackUpdated,
}) => {
    const { user } = useSupabaseAuth();

    const packContract: PackContract = {
        pack: pack!,
        isReadOnly: !user || pack?.userId !== user.id,
        afterPackUpdated,
    };
    return (
        <PackContext.Provider value={packContract}>
            {children}
        </PackContext.Provider>
    );
};
