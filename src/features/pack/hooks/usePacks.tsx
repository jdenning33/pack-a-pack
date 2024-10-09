'use client';
import { Pack } from './usePack';
import { usePacksStore } from './usePacksStore';

export type PackSummary = Omit<Pack, 'kits'>;

export interface UsePacksResult {
    packs: PackSummary[];
    addPack: (name: string, description: string) => void;
    deletePack: (id: string) => void;
}

export const usePacks = (): UsePacksResult => {
    const { packs, addPack: addPackToStore, removePack } = usePacksStore();

    const packSummaries: PackSummary[] = packs.map((pack) => ({
        id: pack.id,
        name: pack.name,
        createdByName: pack.createdByName,
        description: pack.description,
    }));

    const addPack = (name: string, description: string) => {
        addPackToStore(name, description);
    };

    const deletePack = (id: string) => {
        removePack(id);
    };

    return {
        packs: packSummaries,
        addPack,
        deletePack,
    };
};
