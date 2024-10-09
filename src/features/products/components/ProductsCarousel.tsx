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
import { Product, useProducts } from '../useProducts';

export function ProductsCarousel({
    onSelected,
}: {
    className?: string;
    onSelected?: (product: Product) => void;
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
                <div className='bg-muted border-t border-b px-2 h-52 flex items-stretch'>
                    <CarouselContent className='-ml-2 '>
                        {products.map((product) => (
                            <CarouselItem className='w-36 max-w-36 pl-2 '>
                                <ProductCard
                                    key={product.id}
                                    className='h-[12.5rem]'
                                    product={product}
                                    onSelect={onSelected}
                                />
                            </CarouselItem>
                        ))}
                        <CarouselItem className='basis-1/2 md:basis-1/3 pl-2 flex items-center '>
                            <AddProductButton
                                className={
                                    'bg-[unset] border-0 shadow-none h-48'
                                }
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
