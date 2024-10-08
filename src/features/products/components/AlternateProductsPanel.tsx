import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { PackItem, usePack } from '../../pack/hooks/usePack';
import { Input } from '@/ui/input';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { AddProductButton } from './AddProductButton';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/ui/carousel';
import { useProducts } from '../useProducts';

export const AlternateProductsPanel = ({
    item,
    className,
}: {
    item: PackItem;
    className?: string;
}) => {
    const {
        products,
        searchText,
        setSearchText,
        setSearchTag,
        incrementProductTag,
    } = useProducts();
    const { updateItem } = usePack();

    useEffect(() => {
        setSearchTag(item.name);
    }, [item]);

    return (
        <div className={className}>
            {/* <h3 className='text-lg font-bold mb-3'>
                Search "{item.name}" Products
            </h3> */}

            <div className='flex items-center space-x-2 mb-1'>
                <div className='relative flex-grow'>
                    <Input
                        type='text'
                        placeholder={`Search "${item.name.toLowerCase()}" products...`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='pl-10 pr-4'
                    />
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                </div>
                <AddProductButton />
            </div>
            <div className='relative mx-10'>
                <Carousel
                    opts={{
                        loop: false,
                    }}
                >
                    <CarouselContent className='-ml-2'>
                        {products.map((product) => (
                            <CarouselItem className='basis-1/2 md:basis-1/3 pl-2'>
                                <ProductCard
                                    key={product.id}
                                    className='h-48'
                                    product={product}
                                    onSelect={(_) => {
                                        item = {
                                            ...item,
                                            productName: product.name,
                                            productDescription:
                                                product.description,
                                            productBrand: product.brand,
                                            productImage: product.image,
                                            productPrice: product.price,
                                            productWeight: product.weight,
                                            productId: product.id,
                                        };
                                        updateItem(item);
                                        incrementProductTag(
                                            product.id,
                                            item.name
                                        );
                                    }}
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
                    <CarouselPrevious className='h-48 rounded-l-lg rounded-r-[1px] -left-10' />
                    <CarouselNext className='h-48 rounded-r-lg rounded-l-[1px] -right-10' />
                </Carousel>
            </div>
            {/* <div className='mt-4 text-center'>
                <Link
                    href='/all-products'
                    className='text-sm text-blue-600 hover:underline'
                >
                    View all products
                </Link>
            </div> */}
        </div>
    );
};
