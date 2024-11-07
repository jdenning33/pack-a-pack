'use client';
import React, { useCallback } from 'react';
import { Gear } from '@/lib/appTypes';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useGearContext } from '@/features/gear/useGearContext';
import { cn } from '@/lib/utils';

export function GearDragDropSlot({
    className,
    isDraggingClassName,
    isOverClassName,
    children,
}: {
    className?: string;
    isDraggingClassName?: string;
    isOverClassName?: string;
    children?: React.ReactNode;
}) {
    const { gear: maybeGear } = useGearContext();
    const gear = maybeGear as Gear;

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: gear.id,
        data: gear,
    });

    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id: gear.id,
        data: { gear: gear },
    });

    const combinedRef = useCallback(
        (n: HTMLDivElement | null) => {
            setNodeRef(n);
            setDroppableNodeRef(n);
        },
        [setNodeRef, setDroppableNodeRef]
    );

    return (
        <div
            ref={combinedRef}
            className={cn(
                className,
                isDragging ? isDraggingClassName : '',
                isOver ? isOverClassName : ''
            )}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}
