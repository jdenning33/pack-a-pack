import { createContext, useContext } from 'react';
import { Kit } from '@/lib/appTypes';

export type KitContextType = {
    packId: string;
    kit?: Kit;
    isReadOnly: boolean;
    afterKitUpdated: (kit: Kit) => void;
};
// Context
export const KitContext = createContext<KitContextType | null>(null);

export const useKitContext = () => {
    const context = useContext(KitContext);
    if (!context) {
        throw new Error('useKitContext must be used within a Kit component');
    }
    return context;
};
