import React from 'react';
import { Button } from '@/ui/button';
import { Edit2 } from 'lucide-react';
import { PackItem, Product } from '../../hooks/usePack';
import { AlternateProductsPanel } from '../product/AlternateProductsPanel';
import { ProductDetailsCard } from '../product/ProductDetailsCard';

export const ItemDetailsPanel: React.FC<{
    item: PackItem;
    products: Product[];
}> = ({ item, products }) => {
    let selectedProduct = item.selectedProduct;
    return (
        <div className='space-y-4'>
            <div className=''>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>{item.name}</h2>
                    <Button
                        variant='ghost'
                        size='icon'
                        // onClick={onEdit}
                        aria-label='Edit packing item'
                    >
                        <Edit2 className='h-4 w-4' />
                    </Button>
                </div>
                <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
            </div>

            <div className='flex-1 overflow-auto p-4'>
                {selectedProduct ? (
                    <ProductDetailsCard product={selectedProduct} />
                ) : (
                    <p className='text-muted-foreground'>No product selected</p>
                )}
            </div>

            <AlternateProductsPanel products={products} />
        </div>
    );
};
