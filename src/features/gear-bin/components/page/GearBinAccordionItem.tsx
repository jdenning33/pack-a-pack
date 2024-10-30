import React, { useMemo } from 'react';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/ui/accordion';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { GearBinQuickOptions } from './GearBinQuickOptions';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';

export function GearBinAccordionItem({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const { gearBin } = useGearBin();

    const stats = useMemo(
        () => calculateKitStats(gearBin?.gear || []),
        [gearBin]
    );

    if (!gearBin) return null;
    return (
        <AccordionItem
            value={gearBin.id}
            key={gearBin.id}
            className={cn(
                'rounded-lg [&[data-state=closed]>div]:rounded-b-md group',
                className
            )}
        >
            <div className='flex items-center rounded-t-md '>
                <AccordionTrigger className='px-4 py-2 hover:underline rounded-t-lg w-48'>
                    <div className='flex items-center justify-between w-full'>
                        <span className='text-lg'>{gearBin.name}</span>
                    </div>
                </AccordionTrigger>
                <div className='flex-grow px-4 text-sm hidden md:block'>
                    <span className='mr-4'>{formatWeight(stats.weight)}</span>
                    <span className='mr-4'>${stats.cost.toFixed(2)}</span>
                    <span>{stats.count} items</span>
                </div>
                <div className='flex-grow'></div>
                <GearBinQuickOptions />
            </div>
            <AccordionContent className='bg-muted text-primary-foreground border rounded-md p-2 min-h-48'>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}
export function formatWeight(oz: number): string {
    const lbs = Math.floor(oz / 16);
    const remainingOz = oz % 16;
    if (lbs === 0) return `${remainingOz.toFixed(1)} oz`;
    if (remainingOz === 0) return `${lbs} lbs`;
    return `${lbs} lbs ${remainingOz.toFixed(0)} oz`;
}

export function calculateKitStats(gear: Gear[]) {
    const weight = gear.reduce((sum, g) => sum + g.weight, 0);
    const cost = gear.reduce((sum, item) => sum + item.price, 0);
    return { weight, cost, count: gear.length };
}
