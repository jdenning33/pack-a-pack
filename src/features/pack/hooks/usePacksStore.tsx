import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Pack, PackKit, PackItem, Product } from './usePack';

interface PacksState {
    packs: Pack[];
    addPack: (name: string, description: string) => void;
    removePack: (id: string) => void;
    updatePack: (pack: Pack) => void;
    addKit: (packId: string, kit: Omit<PackKit, 'id'>) => void;
    updateKit: (packId: string, kit: PackKit) => void;
    removeKit: (packId: string, kit: PackKit) => void;
    addItem: (packId: string, item: Omit<PackItem, 'id'>) => void;
    updateItem: (packId: string, item: PackItem) => void;
    removeItem: (packId: string, item: PackItem) => void;
}

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const usePacksStore = create<PacksState>()(
    persist(
        (set, get) => ({
            packs: [],
            addPack: (name, description) =>
                set((state) => ({
                    packs: [
                        ...state.packs,
                        { id: uuidv4(), name, description, kits: [] },
                    ],
                })),
            removePack: (id) =>
                set((state) => ({
                    packs: state.packs.filter((pack) => pack.id !== id),
                })),
            updatePack: (updatedPack) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === updatedPack.id ? updatedPack : pack
                    ),
                })),
            addKit: (packId, kit) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: [
                                      ...pack.kits,
                                      {
                                          id: uuidv4(),
                                          ...kit,
                                      },
                                  ],
                              }
                            : pack
                    ),
                })),
            updateKit: (packId, updatedKit) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: pack.kits.map((kit) =>
                                      kit.id === updatedKit.id
                                          ? updatedKit
                                          : kit
                                  ),
                              }
                            : pack
                    ),
                })),
            removeKit: (packId, kit) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: pack.kits.filter(
                                      (c) => c.id !== kit.id
                                  ),
                              }
                            : pack
                    ),
                })),
            addItem: (packId, item) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: pack.kits.map((kit) =>
                                      kit.id === item.kitId
                                          ? {
                                                ...kit,
                                                items: [
                                                    ...kit.items,
                                                    {
                                                        ...item,
                                                        id: uuidv4(),
                                                        prospectiveProducts: [],
                                                    },
                                                ],
                                            }
                                          : kit
                                  ),
                              }
                            : pack
                    ),
                })),
            updateItem: (packId, updatedItem) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: pack.kits.map((kit) =>
                                      kit.id === updatedItem.kitId
                                          ? {
                                                ...kit,
                                                items: kit.items.map((item) =>
                                                    item.id === updatedItem.id
                                                        ? updatedItem
                                                        : item
                                                ),
                                            }
                                          : kit
                                  ),
                              }
                            : pack
                    ),
                })),
            removeItem: (packId, item) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  kits: pack.kits.map((kit) =>
                                      kit.id === item.kitId
                                          ? {
                                                ...kit,
                                                items: kit.items.filter(
                                                    (i) => i.id !== item.id
                                                ),
                                            }
                                          : kit
                                  ),
                              }
                            : pack
                    ),
                })),
        }),
        {
            name: 'packs-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
