import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PackItem, usePack } from '../../hooks/usePack';
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

export const AlternateProductsPanel = ({ item }: { item: PackItem }) => {
    const { updateItem } = usePack();
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 3;
    const products = item.prospectiveProducts;
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const nextProducts = () => {
        setCarouselIndex(
            (prevIndex) =>
                (prevIndex + 1) %
                (filteredProducts.length - productsPerPage + 1)
        );
    };

    const prevProducts = () => {
        setCarouselIndex(
            (prevIndex) =>
                (prevIndex -
                    1 +
                    (filteredProducts.length - productsPerPage + 1)) %
                (filteredProducts.length - productsPerPage + 1)
        );
    };
    return (
        <div className=''>
            <h3 className='text-lg font-bold mb-3'>
                Search "{item.name}" Products
            </h3>

            <div className='flex items-center space-x-2 mb-4'>
                <div className='relative flex-grow'>
                    <Input
                        type='text'
                        placeholder='Search products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='pl-10 pr-4'
                    />
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                </div>
                <AddProductButton item={item} />
            </div>

            <div className='relative mx-12'>
                <Carousel
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent className='-ml-2'>
                        {filteredProducts.map((product) => (
                            <CarouselItem className='basis-1/3 pl-2'>
                                <ProductCard
                                    product={product}
                                    onSelect={(_) => {
                                        item.selectedProduct = product;
                                        updateItem(item);
                                    }}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className='mt-4 text-center'>
                <Link
                    href='/all-products'
                    className='text-sm text-blue-600 hover:underline'
                >
                    View all products
                </Link>
            </div>
        </div>
    );
};
