import React, { useEffect } from 'react';
import { Mountain, Search } from 'lucide-react';
import { PackItem } from '../../pack/hooks/usePack';
import { Input } from '@/ui/input';
import { useProducts } from '../useProducts';
import { Button } from '@/ui/button';
import { ProductsCarousel } from './ProductsCarousel';

export const AlternateProductsPanel = ({
    searchTag,
    className,
    onSelected,
}: {
    searchTag?: string;
    className?: string;
    onSelected?: (product: any) => void;
}) => {
    const {
        searchText,
        setSearchText,
        searchTag: currentSearchTag,
        setSearchTag,
    } = useProducts();

    useEffect(() => {
        setSearchTag(searchTag || '');
    }, [searchTag]);

    return (
        <div className={className}>
            {/* <h3 className='text-lg font-bold mb-3'>
                Search "{item.name}" Products
            </h3> */}

            <div className='flex items-center space-x-2 mb-2'>
                <div className='relative flex-grow'>
                    <Input
                        type='text'
                        placeholder={`Search "${currentSearchTag.toLowerCase()}" products...`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='pl-10 pr-4'
                    />
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                </div>
                <Button variant='outline'>
                    View All &nbsp; <Mountain size={14} />
                </Button>
            </div>
            <ProductsCarousel onSelected={onSelected} />
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
