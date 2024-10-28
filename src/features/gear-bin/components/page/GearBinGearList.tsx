import React from 'react';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { Gear } from '@/lib/appTypes';

export function GearBinGearList({
    className,
    gearRenderer,
}: {
    className?: string;
    gearRenderer: (gear: Gear) => React.ReactNode;
}) {
    const { gearBin } = useGearBin();
    const gear = gearBin?.gear || [];

    if (gear.length === 0)
        return (
            <div className='px-4 py-2 flex flex-col items-center justify-center h-48'>
                No gear in this bin
            </div>
        );
    return (
        <div className={className}>
            {gear.map((gear) => gearRenderer(gear))}
        </div>
    );
}
