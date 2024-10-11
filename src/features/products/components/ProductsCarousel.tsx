import React from 'react';
import { ProductCard } from './ProductCard';
import { AddProductButton } from './AddProductButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/ui/carousel';
import { Gear, useProducts } from '../useProducts';
import { cn } from '@/lib/utils';

export function ProductsCarousel({
    onSelected,
    variant = 'default',
}: {
    className?: string;
    variant?: 'default' | 'compact';
    onSelected?: (product: Gear) => void;
}) {
    const { products } = useProducts();

    return (
        <div className='relative mx-10'>
            <Carousel
                className='background-red-500'
                opts={{
                    loop: false,
                }}
            >
                <div
                    className={cn(
                        ' h-52 flex items-center',
                        variant === 'compact'
                            ? ''
                            : 'bg-muted border-t border-b px-2'
                    )}
                >
                    <CarouselContent className='-ml-2 '>
                        {products.map((product) => (
                            <CarouselItem
                                key={product.id}
                                className='w-36 max-w-36 pl-2 '
                            >
                                <ProductCard
                                    key={product.id}
                                    className={
                                        variant === 'compact'
                                            ? 'h-52'
                                            : 'h-[12.5rem]'
                                    }
                                    product={product}
                                    onSelect={onSelected}
                                />
                            </CarouselItem>
                        ))}
                        <CarouselItem className='basis-1/2 md:basis-1/3 pl-2 flex items-center '>
                            <AddProductButton
                                className={cn(
                                    'bg-[unset] border-0 shadow-none h-48',
                                    variant === 'compact' ? 'h-52' : 'h-48'
                                )}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className='h-52 rounded-l-lg rounded-r-[1px] -left-10' />
                    <CarouselNext className='h-52 rounded-r-lg rounded-l-[1px] -right-10' />
                </div>
            </Carousel>
        </div>
    );
}
