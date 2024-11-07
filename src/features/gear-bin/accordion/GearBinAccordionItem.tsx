import React, { useMemo } from 'react';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/ui/accordion';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { GearBinQuickOptions } from './GearBinQuickOptions';
import { Gear } from '@/lib/appTypes';
import { cn, useFormatWeight } from '@/lib/utils';

export function GearBinAccordionItem({
    className,
    variant = 'default',
    children,
}: {
    className?: string;
    variant?: 'default' | 'binless';
    children: React.ReactNode;
}) {
    const { gearBin } = useGearBin();
    const formatWeight = useFormatWeight();

    const stats = useMemo(
        () => calculateBinStats(gearBin?.gear || []),
        [gearBin]
    );

    return (
        <AccordionItem
            disabled={variant === 'binless'}
            value={gearBin.id}
            key={gearBin.id}
            className={cn(
                'rounded-lg [&[data-state=closed]>div]:rounded-b-md group',
                variant === 'binless' && '!border-b-0',
                className
            )}
        >
            <div className='flex items-center rounded-t-md '>
                <AccordionTrigger
                    className={cn(
                        'px-4 py-2 hover:underline rounded-t-lg w-48',
                        variant === 'binless' && '[&>svg]:opacity-20'
                    )}
                >
                    <span className='flex-1 text-lg text-left'>
                        {gearBin.name}
                    </span>
                </AccordionTrigger>
                {variant !== 'binless' && (
                    <>
                        <div className='flex-grow px-4 text-sm hidden md:block'>
                            <span className='mr-4'>
                                {formatWeight(stats.weight)}
                            </span>
                            <span className='mr-4'>
                                ${stats.cost.toFixed(2)}
                            </span>
                            <span>{stats.count} items</span>
                        </div>
                        <div className='flex-grow'></div>
                        <GearBinQuickOptions />
                    </>
                )}
            </div>
            <AccordionContent
                className={cn(
                    'text-primary-foreground rounded-md p-2 min-h-48',
                    variant !== 'binless' && 'bg-muted border'
                )}
            >
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

export function calculateBinStats(gear: Gear[]) {
    const weight = gear.reduce((sum, g) => sum + g.weight, 0);
    const cost = gear.reduce((sum, item) => sum + item.price, 0);
    return { weight, cost, count: gear.length };
}
