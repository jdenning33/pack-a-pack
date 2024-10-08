import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import Image from 'next/image';
import { Product } from '../../pack/hooks/usePack';

export function ProductDetailsCard({ product }: { product: Product }) {
    return (
        <div className='w-full max-w-md'>
            <div className='flex'>
                <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <Image
                        src={
                            product.image ||
                            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        }
                        alt={product.name}
                        layout='fill'
                        objectFit='cover'
                        className='rounded'
                    />
                </div>
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {product.name}
                    </h3>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <Badge variant='outline' className='bg-background'>
                            {product.brand}
                        </Badge>
                        <Badge variant='outline'>
                            {product.weight.toFixed(0)} oz
                        </Badge>
                        <Badge variant='outline'>
                            ${product.price.toFixed(0)}
                        </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
