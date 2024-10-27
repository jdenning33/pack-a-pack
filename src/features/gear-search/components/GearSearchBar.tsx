import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useGearSearch } from '../useGearSearch';

export const GearSearchBar = ({ className }: { className?: string }) => {
    const { searchParams, setSearchParams } = useGearSearch();

    const searchText = searchParams.searchText || '';
    const setSearchText = (searchText: string) => {
        setSearchParams((prev) => ({ ...prev, searchText }));
    };

    const [localSearchText, setLocalSearchText] = React.useState(searchText);
    return (
        <div className={cn('flex gap-1 max-w-96', className)}>
            <Input
                id='gear-search-text'
                type='text'
                placeholder={`Search gear...`}
                value={localSearchText}
                onChange={(e) => setLocalSearchText(e.target.value)}
                onBlur={() => setSearchText(localSearchText)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setSearchText(localSearchText);
                    }
                }}
                className='pl-10 pr-4'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
        </div>
    );
};
