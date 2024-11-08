import React from 'react';
import { useGearContext } from '../useGearContext';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Gear } from '@/lib/appTypes';

export function GearSelectBanner({
    onSelect,
}: {
    onSelect?: (gear: Gear) => void;
}) {
    const { gear } = useGearContext();
    if (!gear) return null;
    return (
        <div
            className={cn(
                'flex opacity-0 group-hover:opacity-100 z-10',
                'absolute inset-0 top-3/4 bg-primary/30 items-center justify-center rounded-b-xl transition-all'
            )}
        >
            <div className='bg-primary rounded-lg'>
                <Button
                    variant='secondary'
                    className='!bg-opacity-100'
                    onClick={() => onSelect?.(gear)}
                >
                    Select
                </Button>
            </div>
        </div>
    );
}
