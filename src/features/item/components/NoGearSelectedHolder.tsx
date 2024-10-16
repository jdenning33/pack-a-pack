import React from 'react';
import { cn } from '@/lib/utils';
import { AddGearButton } from '../../gear/components/AddGearButton';
import { useItemContext } from '../useItem';

// CreateNewGear component

export const NoGearSelectedHolder: React.FC<{ className?: string }> = ({
    className,
}) => {
    const { item, isEditingGearDetails, isReadOnly } = useItemContext();
    if (item?.gear || isEditingGearDetails) return null;
    return (
        <div className={cn('space-y-2', className)}>
            <div className='text-muted-foreground text-sm'>
                No gear selected.
            </div>
            {!isReadOnly && <AddGearButton />}
        </div>
    );
};
