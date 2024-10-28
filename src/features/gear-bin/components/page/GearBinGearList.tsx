'use client';
import React from 'react';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { GearProvider } from '@/features/gear/GearProvider';
import {
    GearModal,
    GearModalTrigger,
} from '@/features/gear/components/GearModal';
import { AlternateGearCard } from '@/features/gear/components/card/AlternateGearCard';

export function GearBinGearList() {
    const { gearBin } = useGearBin();
    const gear = gearBin?.gear || [];

    if (gear.length === 0)
        return (
            <div className='px-4 py-2 flex flex-col items-center justify-center h-48'>
                No gear in this bin
            </div>
        );
    return (
        <div className='gap-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]'>
            {gear.map((gear) => (
                <GearProvider key={gear.id} gear={gear}>
                    <GearModal />
                    <GearModalTrigger className='h-full'>
                        <AlternateGearCard gear={gear} />
                    </GearModalTrigger>
                </GearProvider>
            ))}
        </div>
    );
}
