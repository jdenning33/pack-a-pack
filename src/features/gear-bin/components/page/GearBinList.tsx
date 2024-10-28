'use client';
import React from 'react';
import { Accordion } from '@/ui/accordion';
import { useUserGearBins } from '@/features/gear-bin-search/useGearBinSearch';
import { UserGearBinProvider } from '@/features/gear-bin/GearBinProvider';
import { GearBinAccordionItem } from './GearBinAccordionItem';
import { BinlessGearAccordionItem } from './BinlessGearAccordionItem';

export function GearBinList() {
    const { gearBins: userGearBins, binlessGear } = useUserGearBins();

    return (
        <div className='flex flex-col gap-4'>
            <Accordion
                type='multiple'
                className='w-full space-y-6'
                defaultValue={['binless']}
            >
                {binlessGear.length > 0 && <BinlessGearAccordionItem />}
                {userGearBins.map((bin) => (
                    <UserGearBinProvider key={bin.id} gearBin={bin}>
                        <GearBinAccordionItem />
                    </UserGearBinProvider>
                ))}
            </Accordion>
        </div>
    );
}
