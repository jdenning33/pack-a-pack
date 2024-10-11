'use client';
import { Pack } from './usePack';
import { usePackStore } from '@/lib/zustandStore';

export type PackSummary = Omit<Pack, 'kits'>;

export interface UsePacksResult {
    packs: PackSummary[];
    addPack: (name: string, description: string) => void;
    deletePack: (id: string) => void;
}

export const usePacks = (): UsePacksResult => {
    const { packs, addPack: addPackToStore, deletePack } = usePackStore();

    const packSummaries: PackSummary[] = packs.map((pack) => ({
        id: pack.id,
        name: pack.name,
        isPublic: pack.isPublic,
        isGearLocker: pack.isGearLocker,
        description: pack.description,
    }));

    const addPack = (name: string, description: string) => {
        addPackToStore({
            name,
            description,
            isPublic: false,
            isGearLocker: false,
        });
    };

    return {
        packs: packSummaries,
        addPack,
        deletePack,
    };
};
