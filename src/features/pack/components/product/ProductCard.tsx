import { Card, CardContent } from '@/ui/card';
import React from 'react';
import { Product } from '../../hooks/usePack';

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card
            key={product.id}
            className='flex-shrink-0 mr-3'
            style={{
                width: `10rem`,
            }}
        >
            <CardContent className='p-3 flex flex-col items-center'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-24 h-24 rounded object-cover mb-2'
                />
                <div className='text-center'>
                    <h4 className='font-bold text-sm truncate'>
                        {product.name}
                    </h4>
                    <p className='text-xs text-gray-600 truncate'>
                        {product.brand}
                    </p>
                    <p className='text-xs text-gray-600 mt-1 line-clamp-2'>
                        {product.description}
                    </p>
                    <p className='font-bold text-xs mt-1'>
                        {product.weight.toFixed(3)} kg
                    </p>
                    <p className='text-xs text-gray-600'>
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
