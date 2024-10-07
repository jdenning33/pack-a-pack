import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import Image from 'next/image';
import { Product } from '../../hooks/usePack';

export function ProductDetailsCard({ product }: { product: Product }) {
    return (
        <Card className='w-full max-w-md'>
            <CardContent className='p-4 flex'>
                <div className='relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                    <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        width={96}
                        height={96}
                        objectFit='cover'
                    />
                </div>
                <div className='ml-4 flex-grow flex flex-col'>
                    <h3 className='font-bold text-lg leading-tight mb-2'>
                        {product.name}
                    </h3>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        <Badge variant='secondary'>{product.brand}</Badge>
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
            </CardContent>
        </Card>
    );
}
