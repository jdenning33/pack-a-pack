import React from 'react';
import { Button } from '@/ui/button';
import { ArrowRight, ChevronRight, Edit2 } from 'lucide-react';
import { PackItem, Product } from '../../hooks/usePack';
import { AlternateProductsPanel } from '../product/AlternateProductsPanel';
import { ProductDetailsCard } from '../product/ProductDetailsCard';

export const ItemDetailsPanel: React.FC<{
    item: PackItem;
    products: Product[];
    onDismiss?: () => void;
}> = ({ item, products, onDismiss }) => {
    let selectedProduct = item.selectedProduct;
    return (
        <div className='p-4 pt-2 relative'>
            {onDismiss && (
                <div className='flex items-center gap-1'>
                    <Button
                        variant='link'
                        size='sm'
                        className='px-0 pt-0 h-[unset]'
                        onClick={onDismiss}
                    >
                        Overview
                    </Button>
                    <ChevronRight size={12} className='text-primary' />
                    <Button
                        variant='link'
                        size='sm'
                        className='px-0 pt-0 h-[unset]'
                        onClick={onDismiss}
                    >
                        {item.name}
                    </Button>
                </div>
            )}

            <div>
                <h2 className='text-xl font-bold'>{item.name}</h2>
                <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
            </div>

            <div className='flex-1 overflow-auto p-4'>
                {selectedProduct ? (
                    <ProductDetailsCard product={selectedProduct} />
                ) : (
                    <p className='text-muted-foreground'>No product selected</p>
                )}
            </div>

            <AlternateProductsPanel item={item} />
        </div>
    );
};
