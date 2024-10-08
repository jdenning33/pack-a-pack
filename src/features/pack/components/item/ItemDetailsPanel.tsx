import React, { useState } from 'react';
import { Button } from '@/ui/button';
import { ArrowRight, ChevronRight, Edit2 } from 'lucide-react';
import { PackItem, Product } from '../../hooks/usePack';
import { AlternateProductsPanel } from '../../../products/components/AlternateProductsPanel';
import { ProductDetailsCard } from '../../../products/components/ProductDetailsCard';
import SimpleProductsProvider from '@/features/products/SimpleProductsProvider';
import { EditProductForm } from '@/features/products/components/EditProductForm';
import { usePackNavigation } from '../../hooks/usePackNavigation';

export const ItemDetailsPanel: React.FC<{
    item: PackItem;
}> = ({ item }) => {
    let selectedProduct = item.selectedProduct;
    const { isEditingProductDetails, setIsEditingProductDetails } =
        usePackNavigation();

    return (
        <div className='relative'>
            <div>
                <h2 className='text-xl font-bold'>{item.name}</h2>
                <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
            </div>

            {isEditingProductDetails ? (
                <div>
                    <EditProductForm
                        item={item}
                        product={selectedProduct}
                        onFinished={() => setIsEditingProductDetails(false)}
                    />
                </div>
            ) : (
                <>
                    <div
                        className='flex-1 overflow-hidden py-4 h-36'
                        onClick={(e) => {
                            if (e.detail === 2) {
                                setIsEditingProductDetails(true);
                            }
                        }}
                    >
                        {selectedProduct ? (
                            <ProductDetailsCard product={selectedProduct} />
                        ) : (
                            <p className='text-muted-foreground'>
                                No product selected
                            </p>
                        )}
                    </div>
                    <SimpleProductsProvider>
                        <AlternateProductsPanel className='pt-12' item={item} />
                    </SimpleProductsProvider>
                </>
            )}
        </div>
    );
};
