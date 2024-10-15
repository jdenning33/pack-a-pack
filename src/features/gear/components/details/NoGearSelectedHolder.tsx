import React from 'react';
import { useGearContext } from './GearDetails';
import { cn } from '@/lib/utils';
import { AddGearButton } from './AddGearButton';

// CreateNewGear component

export const NoGearSelectedHolder: React.FC<{ className?: string }> = ({
    className,
}) => {
    const { gear, isEditing } = useGearContext();
    if (gear || isEditing) return null;
    return (
        <div className={cn('space-y-2', className)}>
            <div className='text-muted-foreground text-sm'>
                No gear selected.
            </div>
            <AddGearButton />
        </div>
    );
};
