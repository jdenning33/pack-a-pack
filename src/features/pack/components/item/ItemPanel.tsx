import React from 'react';
import { PackItem } from '../../hooks/usePack';
import { AlternateProductsPanel } from '../../../products/components/AlternateProductsPanel';
import SimpleProductsProvider from '@/features/products/SimpleProductsProvider';
import { usePackNavigation } from '../../hooks/usePackNavigation';
import { ItemProductCard } from './ItemProductCard';

export const ItemPanel: React.FC<{
    item: PackItem;
}> = ({ item }) => {
    const { isEditingProductDetails, setIsEditingProductDetails } =
        usePackNavigation();

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1'>
                <h2 className='text-xl font-bold pb-4'>{item.name}</h2>
                <ItemProductCard item={item} />
            </div>

            {!isEditingProductDetails && (
                <SimpleProductsProvider>
                    <AlternateProductsPanel className='pt-12' item={item} />
                </SimpleProductsProvider>
            )}
        </div>
    );
};
