import { Card, CardContent } from '@/ui/card';
import { Button } from '@/ui/button';
import Image from 'next/image';
import { Badge } from '@/ui/badge';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/ui/image-with-fallback';

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
    className,
}: {
    product: Product;
    onSelect: (product: Product) => void;
    className?: string;
}) {
    return (
        <Card
            key={product.id}
            className={cn(
                'relative flex-shrink-0 transition-shadow duration-300 ease-in-out hover:shadow my-1 group',
                className
            )}
        >
            <CardContent className='p-3 flex flex-col h-full'>
                <div className='w-24 h-24 mb-2 relative flex self-center shrink-0'>
                    <ImageWithFallback
                        src={product.image || ''}
                        fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        alt={product.name}
                        layout='fill'
                        objectFit='contain'
                        className='rounded'
                    />
                </div>
                <div className='absolute top-2 right-2 flex flex-col items-end gap-1'>
                    <Badge variant='secondary' className='bg-opacity-60'>
                        {product.brand}
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/90'
                    >
                        {product.weight.toFixed(0)} oz
                    </Badge>
                    <Badge
                        variant='outline'
                        className='whitespace-nowrap bg-background/90'
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
            {onSelect && (
                <div
                    className={cn(
                        'flex opacity-0 group-hover:opacity-100',
                        'absolute inset-0 top-3/4 bg-primary/30 items-center justify-center rounded-b-xl transition-all'
                    )}
                >
                    <div className='bg-primary rounded-lg'>
                        <Button
                            variant='secondary'
                            className='!bg-opacity-100'
                            onClick={() => onSelect(product)}
                        >
                            Select
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
