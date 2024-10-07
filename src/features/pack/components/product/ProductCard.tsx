import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/ui/badge';

interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    weight: number;
    price: number;
    image?: string;
}

export function ProductCard({
    product,
    onSelect,
}: {
    product: Product;
    onSelect: (product: Product) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            key={product.id}
            className='relative flex-shrink-0 h-48  transition-shadow duration-300 ease-in-out hover:shadow-lg mb-1'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className='p-3 flex flex-col h-full'>
                <div className='w-24 h-24 mb-2 relative flex self-center shrink-0'>
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
                <div className='absolute top-2 right-2 flex flex-col items-end gap-1'>
                    <Badge variant='secondary' className='bg-opacity-60'>
                        {product.brand}
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/70'
                    >
                        {product.weight.toFixed(0)} oz
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/70'
                    >
                        ${product.price.toFixed(0)}
                    </Badge>
                </div>
                <div className='text-left flex-grow overflow-hidden'>
                    <h4 className='font-bold text-sm line-clamp-2'>
                        {product.name}
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                        {product.description}
                    </p>
                </div>
            </CardContent>
            {isHovered && (
                <div className='absolute inset-0 bg-primary/80 flex items-center justify-center'>
                    <Button
                        variant='secondary'
                        onClick={() => onSelect(product)}
                    >
                        Select Product
                    </Button>
                </div>
            )}
        </Card>
    );
}
