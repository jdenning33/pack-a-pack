'use client';
import React, { createContext } from 'react';
import { Item, Kit } from '@/lib/appTypes';

export type ItemContextType = {
    item?: Item;
    kit: Kit;
    isReadOnly: boolean;
    afterItemUpdated: (item: Item) => void;
    isEditingGearDetails: boolean;
    setIsEditingGearDetails: (isEditing: boolean) => void;
};

// Context
export const ItemContext = createContext<ItemContextType | null>(null);

export const useItemContext = () => {
    const context = React.useContext(ItemContext);
    if (!context) {
        throw new Error('useItemContext must be used within an ItemProvider');
    }
    return context;
};

export const useConfirmedItemContext = (): ItemContextType & { item: Item } => {
    const context = React.useContext(ItemContext);
    if (!context) {
        throw new Error('useItemContext must be used within an ItemProvider');
    }
    if (!context.item) {
        throw new Error(
            'useConfirmedItemContext must be used within an ItemProvider with an item'
        );
    }
    return { ...context, item: context.item };
};
