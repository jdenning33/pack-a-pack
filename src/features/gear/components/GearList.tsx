import React from 'react';
import { GearCard } from './GearCard';
import { useGear } from '../useGear';
import { Gear } from '@/lib/appTypes';
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
