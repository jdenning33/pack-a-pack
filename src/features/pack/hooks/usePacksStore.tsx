import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {
    Pack,
    Category,
    PackItem,
    Item,
    Product,
    PackContract,
} from './usePack';

interface PacksState {
    packs: Pack[];
    addPack: (name: string, description: string) => void;
    removePack: (id: string) => void;
    updatePack: (pack: Pack) => void;
    addCategory: (packId: string, category: Omit<Category, 'id'>) => void;
    updateCategory: (packId: string, category: Category) => void;
    removeCategory: (packId: string, category: Category) => void;
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
                        { id: uuidv4(), name, description, categories: [] },
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
            addCategory: (packId, category) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  categories: [
                                      ...pack.categories,
                                      {
                                          id: uuidv4(),
                                          ...category,
                                      },
                                  ],
                              }
                            : pack
                    ),
                })),
            updateCategory: (packId, updatedCategory) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  categories: pack.categories.map((category) =>
                                      category.id === updatedCategory.id
                                          ? updatedCategory
                                          : category
                                  ),
                              }
                            : pack
                    ),
                })),
            removeCategory: (packId, category) =>
                set((state) => ({
                    packs: state.packs.map((pack) =>
                        pack.id === packId
                            ? {
                                  ...pack,
                                  categories: pack.categories.filter(
                                      (c) => c.id !== category.id
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
                                  categories: pack.categories.map((category) =>
                                      category.id === item.categoryId
                                          ? {
                                                ...category,
                                                items: [
                                                    ...category.items,
                                                    { ...item, id: uuidv4() },
                                                ],
                                            }
                                          : category
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
                                  categories: pack.categories.map((category) =>
                                      category.id === updatedItem.categoryId
                                          ? {
                                                ...category,
                                                items: category.items.map(
                                                    (item) =>
                                                        item.id ===
                                                        updatedItem.id
                                                            ? updatedItem
                                                            : item
                                                ),
                                            }
                                          : category
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
                                  categories: pack.categories.map((category) =>
                                      category.id === item.categoryId
                                          ? {
                                                ...category,
                                                items: category.items.filter(
                                                    (i) => i.id !== item.id
                                                ),
                                            }
                                          : category
                                  ),
                              }
                            : pack
                    ),
                })),
        }),
        {
            name: 'packs-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
