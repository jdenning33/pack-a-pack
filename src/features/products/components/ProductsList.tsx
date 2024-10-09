import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, useProducts } from '../useProducts';
import { cn } from '@/lib/utils';

export function ProductsList({
    productClassName,
    onSelected,
}: {
    productClassName?: string;
    onSelected?: (product: Product) => void;
}) {
    const { products } = useProducts();

    return (
        <>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    className={cn('h-[12.5rem]', productClassName)}
                    product={product}
                    onSelect={onSelected}
                />
            ))}
        </>
    );
}
