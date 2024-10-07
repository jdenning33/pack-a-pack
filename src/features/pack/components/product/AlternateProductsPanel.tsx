import React, { useState } from 'react';
import { Button } from '@/ui/button';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { Product } from '../../hooks/usePack';
import { Input } from '@/ui/input';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { AddProductButton } from './AddProductButton';

export const AlternateProductsPanel = ({
    products,
}: {
    products: Product[];
}) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 3;
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
            <h3 className='text-lg font-bold mb-3'>Alternative Products</h3>

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
                <AddProductButton />
            </div>
            <div className='relative'>
                <div className='flex overflow-hidden'>
                    <div
                        className='flex transition-transform duration-300 ease-in-out'
                        style={{
                            transform: `translateX(-${
                                carouselIndex * (100 / productsPerPage)
                            }%)`,
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard product={product} />
                        ))}
                    </div>
                </div>
                {filteredProducts.length > productsPerPage && (
                    <>
                        <Button
                            variant='outline'
                            size='icon'
                            className='absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2'
                            onClick={prevProducts}
                        >
                            <ChevronLeft className='h-4 w-4' />
                            <span className='sr-only'>Previous products</span>
                        </Button>
                        <Button
                            variant='outline'
                            size='icon'
                            className='absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2'
                            onClick={nextProducts}
                        >
                            <ChevronRight className='h-4 w-4' />
                            <span className='sr-only'>Next products</span>
                        </Button>
                    </>
                )}
            </div>
            <div className='mt-4 text-center'>
                <Link
                    href='/all-products'
                    className='text-sm text-blue-600 hover:underline'
                >
                    View all alternative products
                </Link>
            </div>
        </div>
    );
};
