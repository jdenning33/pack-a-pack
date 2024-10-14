import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { usePacks } from '../../hooks/usePacks';
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from '@/ui/select';
import { useAuth } from '@/features/auth/useAuth';

export const PackSearchBar = ({ className }: { className?: string }) => {
    const { searchParams, setSearchParams } = usePacks();
    const { user } = useAuth();
    const [localSearchText, setLocalSearchText] = useState<string>(
        searchParams.searchText || ''
    );
    const [packType, setPackType] = useState<'mypacks' | 'allpacks'>(
        user?.id ? 'mypacks' : 'allpacks'
    );

    function setSearchText(searchText: string) {
        setSearchParams((prev) => ({ ...prev, searchText }));
    }

    const userId = user?.id || 'no';
    useEffect(() => {
        setSearchParams((prev) => ({
            ...prev,
            excludePrivatePacks: packType === 'allpacks',
            packUserId: packType === 'mypacks' ? userId : undefined,
        }));
    }, [packType, userId, setSearchParams]);

    return (
        <div className={cn('flex gap-1', className)}>
            <div className='relative flex-1 max-w-96'>
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
            <Select
                defaultValue={packType}
                onValueChange={(v) => setPackType(v as 'mypacks' | 'allpacks')}
            >
                <SelectTrigger className='w-[180px]'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='mypacks'>My Packs</SelectItem>
                    <SelectItem value='allpacks'>Public Packs</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
