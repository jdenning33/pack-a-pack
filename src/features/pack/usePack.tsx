'use client';
import { Pack } from '@/lib/appTypes';
import { createContext, useContext } from 'react';

export interface PackContract {
    pack?: Pack;
    isReadOnly: boolean;
    afterPackUpdated?: (kit: Pack) => void;
}

export const PackContext = createContext<PackContract | undefined>(undefined);

export const usePack = (): PackContract => {
    const context = useContext(PackContext);
    if (context === undefined) {
        throw new Error('usePack must be used within a PackProvider');
    }
    return context;
};
