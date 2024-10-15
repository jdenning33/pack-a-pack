'use client';
import { Gear } from '@/lib/appTypes';
import React, { ReactNode } from 'react';
import {
    GearMutationsContract,
    GearMutationsContext,
    useGearMutations,
} from './useGearMutations';
import { useUpsertGear } from '@/lib/supabse/gear/useUpsertGear';

export const GearMutationsProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const upsertGearMutation = useUpsertGear();

    const gearMutationsContract: GearMutationsContract = {
        addGear: (gear: Omit<Gear, 'id'>) =>
            upsertGearMutation.mutateAsync(gear),
        updateGear: (gear: Gear) => upsertGearMutation.mutateAsync(gear),
        removeGear: (gear: Gear) =>
            upsertGearMutation.mutateAsync({ ...gear, isDeleted: true }),
    };

    return (
        <GearMutationsContext.Provider value={gearMutationsContract}>
            {children}
        </GearMutationsContext.Provider>
    );
};

export { useGearMutations };
