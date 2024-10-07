'use client';
import { usePacksStore } from './usePacksStore';

export interface PackSummary {
    id: string;
    name: string;
    description: string;
}

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
