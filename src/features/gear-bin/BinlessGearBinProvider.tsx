'use client';
import React from 'react';
import { useUserGearBins } from '@/features/gear-bin/search/useGearBinSearch';
import { GearBinProvider } from '@/features/gear-bin/GearBinProvider';

export function BinlessGearBinProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { binlessGear } = useUserGearBins();
    if (!binlessGear.length) return null;
    return (
        <GearBinProvider
            key='binlessgear'
            gearBin={{
                id: 'binlessgear',
                name: 'Binless Gear',
                order: 0,
                description: 'Gear that has not been assigned to a gear bin',
                userId: '',
                isDeleted: false,
                gear: binlessGear,
            }}
        >
            {children}
        </GearBinProvider>
    );
}
