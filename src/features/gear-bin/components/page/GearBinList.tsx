import React from 'react';
import { useUserGearBins } from '@/features/gear-bin-search/useGearBinSearch';
import { UserGearBin } from '@/lib/appTypes';

export const GearBinList = ({
    className,
    binRenderer,
}: {
    className?: string;
    binRenderer: (bin: UserGearBin) => React.ReactNode;
}) => {
    const { gearBins: userGearBins } = useUserGearBins();

    return (
        <div className={className}>
            {userGearBins.map((bin) => binRenderer(bin))}
        </div>
    );
};
