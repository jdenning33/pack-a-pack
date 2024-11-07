'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useGearBin } from '@/features/gear-bin/useGearBin';

export function GearBinDropSlot({ children }: { children?: React.ReactNode }) {
    const { gearBin } = useGearBin();
    if (!gearBin) throw new Error('Gear bin not found');

    const { setNodeRef } = useDroppable({
        id: gearBin.id,
        data: { gearBin: gearBin },
    });

    return <div ref={setNodeRef}>{children}</div>;
}
