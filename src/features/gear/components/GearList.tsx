import React from 'react';
import { GearCard } from './GearCard';
import { Gear, useGear } from '../useGear';
import { cn } from '@/lib/utils';

export function GearList({
    gearClassName,
    onSelected,
}: {
    gearClassName?: string;
    onSelected?: (gear: Gear) => void;
}) {
    const { gear } = useGear();

    return (
        <>
            {gear.map((gear) => (
                <GearCard
                    key={gear.id}
                    className={cn('h-[12.5rem]', gearClassName)}
                    gear={gear}
                    onSelect={onSelected}
                />
            ))}
        </>
    );
}
