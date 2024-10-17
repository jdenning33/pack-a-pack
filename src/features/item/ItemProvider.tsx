import { ReactNode, useState } from 'react';
import { ItemContextType, ItemContext } from './useItem';
import { Item, Kit } from '@/lib/appTypes';

interface ItemProviderProps {
    children: ReactNode;
    item?: Item;
    kit: Kit;
    isReadOnly?: boolean;
    afterItemUpdated?: (item: Item) => void;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({
    children,
    kit,
    item,
    isReadOnly = false,
    afterItemUpdated,
}) => {
    const [isEditingGearDetails, setIsEditingGearDetails] = useState(false);
    const itemContextValue: ItemContextType = {
        item,
        kit,
        isReadOnly,
        afterItemUpdated: afterItemUpdated ?? (() => {}),
        isEditingGearDetails,
        setIsEditingGearDetails,
    };

    return (
        <ItemContext.Provider value={itemContextValue}>
            {children}
        </ItemContext.Provider>
    );
};
