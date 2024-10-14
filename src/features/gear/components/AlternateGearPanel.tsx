import React from 'react';
import { Gear } from '@/lib/appTypes';
import { GearCarousel } from './GearCarousel';
import { GearSearchBar } from './GearSearchBar';
import { SupabaseGearProvider } from '../SupabaseGearProvider';
import Link from 'next/link';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';

export const AlternateGearPanel = ({
    itemFilter,
    kitFilter,
    className,
    onSelected,
}: {
    itemFilter?: string;
    kitFilter?: string;
    className?: string;
    onSelected?: (gear: Gear) => void;
}) => {
    return (
        <div className={cn('flex flex-col', className)}>
            <SupabaseGearProvider
                defaultSearchParams={{
                    kitFilter: kitFilter,
                    itemFilter: itemFilter,
                }}
            >
                <div className='flex items-center space-x-2 mb-2'>
                    <GearSearchBar className='flex-grow' />
                </div>
                <GearCarousel variant='compact' onSelected={onSelected} />
            </SupabaseGearProvider>
            <Link
                href={`/gear?searchTag=${itemFilter}`}
                className='self-center mt-1'
            >
                <Button variant='link' size={'sm'}>
                    Search All Gear
                </Button>
            </Link>
        </div>
    );
};
