'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useGearBin } from '@/features/gear-bin/useGearBin';

export function GearBinGearDropSlot({
    children,
    isOverClassName,
}: {
    children?: React.ReactNode;
    isOverClassName?: string;
}) {
    const { gearBin } = useGearBin();

    const { setNodeRef, isOver } = useDroppable({
        id: gearBin.id,
        data: { gearBin: gearBin },
    });

    return (
        <div ref={setNodeRef} className={isOver ? isOverClassName : ''}>
            {children}
        </div>
    );
}
