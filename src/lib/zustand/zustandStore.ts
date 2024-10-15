import { Item, Kit, Pack } from '../appTypes';
import { Gear } from '../appTypes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PackStore {
    packs: FlatPack[];
    kits: FlatKit[];
    items: FlatItem[];
    gear: Gear[];
    addPack: (pack: Omit<FlatPack, 'id'>) => string;
    updatePack: (pack: FlatPack) => void;
    deletePack: (packId: string) => void;
    addKit: (kit: Omit<FlatKit, 'id'>) => string;
    updateKit: (kit: FlatKit) => void;
    deleteKit: (kitId: string) => void;
    addItem: (item: Omit<FlatItem, 'id'>) => string;
    updateItem: (item: FlatItem) => void;
    deleteItem: (itemId: string) => void;
    addGear: (gear: Omit<Gear, 'id'>) => string;
    updateGear: (gear: Gear) => string;
    deleteGear: (gearId: string) => void;
} // Updated types to remove nested structures

export type FlatPack = Omit<Pack, 'kits'>;
export type FlatKit = Omit<Kit, 'items'> & { packId: string };
export type FlatItem = Omit<Item, 'gear'> & { kitId: string; gearId?: string };

const usePackStore = create<PackStore>()(
    persist(
        (set) => ({
            packs: [],
            kits: [],
            items: [],
            gear: [],
            addPack: (pack) => {
                const id = Date.now().toString();
                set((state) => ({ packs: [...state.packs, { ...pack, id }] }));
                return id;
            },
            updatePack: (updatedPack) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === updatedPack.id ? updatedPack : pack
                    ),
                })),
            deletePack: (packId) =>
                set((state) => ({
                    packs: state.packs.filter((pack) => pack.id !== packId),
                    kits: state.kits.filter((kit) => kit.packId !== packId),
                    items: state.items.filter(
                        (item) =>
                            !state.kits.find(
                                (kit) =>
                                    kit.packId === packId &&
                                    kit.id === item.kitId
                            )
                    ),
                })),
            addKit: (kit) => {
                const id = Date.now().toString();
                set((state) => ({ kits: [...state.kits, { ...kit, id }] }));
                return id;
            },
            updateKit: (updatedKit) =>
                set((state) => ({
                    kits: state.kits.map((kit) =>
                        kit.id === updatedKit.id ? updatedKit : kit
                    ),
                })),
            deleteKit: (kitId) =>
                set((state) => ({
                    kits: state.kits.filter((kit) => kit.id !== kitId),
                    items: state.items.filter((item) => item.kitId !== kitId),
                })),
            addItem: (item) => {
                const id = Date.now().toString();
                set((state) => ({ items: [...state.items, { ...item, id }] }));
                return id;
            },
            updateItem: (updatedItem) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    ),
                })),
            deleteItem: (itemId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== itemId),
                })),
            addGear: (gear) => {
                const id = Date.now().toString();
                set((state) => ({ gear: [...state.gear, { ...gear, id }] }));
                return id;
            },
            updateGear: (updatedGear) => {
                set((state) => ({
                    gear: state.gear.map((gear) =>
                        gear.id === updatedGear.id ? updatedGear : gear
                    ),
                }));
                return updatedGear.id;
            },
            deleteGear: (gearId) =>
                set((state) => ({
                    gear: state.gear.filter((gear) => gear.id !== gearId),
                    items: state.items.map((item) =>
                        item.gearId === gearId
                            ? { ...item, gearId: undefined }
                            : item
                    ),
                })),
        }),
        {
            name: 'pack-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export { usePackStore };
