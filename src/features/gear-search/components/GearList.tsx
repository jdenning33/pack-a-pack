import React from 'react';
import { Gear } from '@/lib/appTypes';
import { useGearSearch } from '../useGearSearch';

export const GearList = ({
    gearFilter,
    gearRenderer,
}: {
    gearFilter?: (gear: Gear) => boolean;
    gearRenderer: (gear: Gear) => React.ReactNode;
}) => {
    const { gear } = useGearSearch();
    const filteredGear = gearFilter ? gear.filter(gearFilter) : gear;

    return filteredGear.map((gear) => gearRenderer(gear));
};
