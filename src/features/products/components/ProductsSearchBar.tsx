import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/ui/input';
import { useProducts } from '../useProducts';
import { SelectKitFilter } from './SelectKitFilter';
import { cn } from '@/lib/utils';
import { SelectItemFilter } from './SelectItemFilter';

export const ProductsSearchBar = ({
    defaultSearchTag,
    className,
}: {
    defaultSearchTag?: string;
    className?: string;
}) => {
    const { searchText, setSearchText, setSearchTag } = useProducts();

    useEffect(() => {
        setSearchTag(defaultSearchTag || '');
    }, [defaultSearchTag, setSearchTag]);

    return (
        <div className={cn('flex gap-1', className)}>
            <div className='relative flex-1 max-w-96'>
                <Input
                    type='text'
                    placeholder={`Search products...`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='pl-10 pr-4'
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            </div>
            <SelectKitFilter />
            <SelectItemFilter />
        </div>
    );
};
