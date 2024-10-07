import React from 'react';
import { Product } from './usePack';

export const ProductDetailsCard = ({ product }: { product: Product }) => {
    return (
        <div className='flex items-start space-x-4'>
            <img
                src={product.image}
                alt={product.name}
                className='w-16 h-16 rounded-lg object-cover'
            />
            <div>
                <h3 className='text-lg font-bold'>{product.name}</h3>
                <p className='text-sm text-gray-600'>{product.brand}</p>
                <p className='text-sm text-gray-600 mt-1'>
                    {product.description}
                </p>
                <p className='text-sm font-bold mt-2'>
                    {product.weight.toFixed(3)} kg
                </p>
                <p className='text-sm text-gray-600'>
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    );
};
