import React from 'react';
import { Mountain } from 'lucide-react';
import { Gear } from '../useGear';
import { Button } from '@/ui/button';
import { GearCarousel } from './GearCarousel';
import { GearSearchBar } from './GearSearchBar';
import { ZustandGearProvider } from '../ZustandGearProvider';

export const AlternateGearPanel = ({
    searchTag,
    className,
    onSelected,
}: {
    searchTag?: string;
    className?: string;
    onSelected?: (gear: Gear) => void;
}) => {
    return (
        <div className={className}>
            <ZustandGearProvider>
                <div className='flex items-center space-x-2 mb-2'>
                    <GearSearchBar
                        defaultSearchTag={searchTag}
                        className='flex-grow'
                    />
                    <Button variant='outline'>
                        View All &nbsp; <Mountain size={14} />
                    </Button>
                </div>
                <GearCarousel variant='compact' onSelected={onSelected} />
            </ZustandGearProvider>
        </div>
    );
};
