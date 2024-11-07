'use client';
import React from 'react';
import { Gear, UserGearBin } from '@/lib/appTypes';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useUserGearBins } from '@/features/gear-bin/search/useGearBinSearch';
import { getNewOrderValue } from './getNewOrderValue';

export const GearDragContext = React.createContext<{
    activeGear: Gear | null;
    setActiveGear: (gear: Gear | null) => void;
}>({
    activeGear: null,
    setActiveGear: () => {},
});

export function GearDragProvider({ children }: { children: React.ReactNode }) {
    const [activeGear, setActiveGear] = useState<Gear | null>(null);
    const { gearBins, binlessGear } = useUserGearBins();

    const { addGearToUser } = useAppMutations();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const draggedGear = active.data.current as Gear;
        setActiveGear(draggedGear);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { over } = event;
        if (!activeGear || !over?.data?.current) {
            setActiveGear(null);
            return;
        }

        let newGearBinId = activeGear.userGearBinId || null;
        if (newGearBinId === 'binlessgear') newGearBinId = null;

        try {
            await addGearToUser(activeGear.id, newGearBinId, activeGear.order);
        } catch (error) {
            console.error('Failed to move gear:', error);
        }

        setActiveGear(null);
    };

    const handleDragOver = (event: DragEndEvent) => {
        const { over } = event;
        const overGearBin = over?.data?.current?.gearBin as
            | UserGearBin
            | undefined;
        const overGear = over?.data?.current?.gear as Gear | undefined;

        if (!overGearBin && !overGear) return;
        if (!activeGear) return;

        // find the bin that the gear is being dragged over
        const newBinId = overGearBin?.id || overGear?.userGearBinId;
        const currentGearBin = gearBins.find((bin) => bin.id === newBinId);

        // find the gear that the dragged gear is being dropped on
        const relevantGear = currentGearBin?.gear || binlessGear;

        // find the new order value for our dragged gear
        let newOrder = getNewOrderValue(overGear?.id || '', relevantGear);
        if (newOrder === undefined)
            newOrder = (relevantGear.at(-1)?.order || 100) + 11;

        // update the active gear with the new bin and order
        setActiveGear({
            ...activeGear,
            userGearBinId: newBinId,
            order: newOrder,
        });
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            sensors={sensors}
        >
            <GearDragContext.Provider value={{ activeGear, setActiveGear }}>
                {children}
            </GearDragContext.Provider>
        </DndContext>
    );
}
