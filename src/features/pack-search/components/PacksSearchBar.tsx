import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { usePacks } from '../usePackSearch';

export const PackSearchBar = ({ className }: { className?: string }) => {
    const { searchParams, setSearchParams } = usePacks();
    const [localSearchText, setLocalSearchText] = useState<string>(
        searchParams.searchText || ''
    );

    function setSearchText(searchText: string) {
        setSearchParams((prev) => ({ ...prev, searchText }));
    }

    return (
        <div className={cn('relative max-w-96', className)}>
            <Input
                id='pack-search-text'
                type='text'
                placeholder={`Search packs...`}
                value={localSearchText}
                onChange={(e) => setLocalSearchText(e.target.value)}
                onBlur={(_) => setSearchText(localSearchText)}
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
