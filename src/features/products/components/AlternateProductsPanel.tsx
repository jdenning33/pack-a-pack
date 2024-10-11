import React, { useEffect } from 'react';
import { Mountain } from 'lucide-react';
import { Gear } from '../useProducts';
import { Button } from '@/ui/button';
import { ProductsCarousel } from './ProductsCarousel';
import { ProductsSearchBar } from './ProductsSearchBar';
import { ZustandProductsProvider } from '../ZustandProductsProvider';

export const AlternateProductsPanel = ({
    searchTag,
    className,
    onSelected,
}: {
    searchTag?: string;
    className?: string;
    onSelected?: (product: Gear) => void;
}) => {
    return (
        <div className={className}>
            <ZustandProductsProvider>
                <div className='flex items-center space-x-2 mb-2'>
                    <ProductsSearchBar
                        defaultSearchTag={searchTag}
                        className='flex-grow'
                    />
                    <Button variant='outline'>
                        View All &nbsp; <Mountain size={14} />
                    </Button>
                </div>
                <ProductsCarousel variant='compact' onSelected={onSelected} />
            </ZustandProductsProvider>
        </div>
    );
};
