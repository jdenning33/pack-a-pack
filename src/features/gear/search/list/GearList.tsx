import React from 'react';
import { Gear } from '@/lib/appTypes';
import { useGearSearch } from '../useGearSearch';
import { GearProvider } from '../../GearProvider';

export const GearList = ({
    gearFilter,
    children,
}: {
    gearFilter?: (gear: Gear) => boolean;
    children: React.ReactNode;
}) => {
    const { gear } = useGearSearch();
    const filteredGear = gearFilter ? gear.filter(gearFilter) : gear;

    return filteredGear.map((gear) => (
        <GearProvider key={gear.id} gear={gear}>
            {children}
        </GearProvider>
    ));
};
