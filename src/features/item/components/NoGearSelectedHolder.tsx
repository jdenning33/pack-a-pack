import React from 'react';
import { cn } from '@/lib/utils';
import { AddGearButton } from '../../gear/new/AddGearButton';
import { useItemContext } from '../useItem';

// CreateNewGear component

export const NoGearSelectedHolder: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { item, isEditingGearDetails, isReadOnly } = useItemContext();
    if (item?.gear || isEditingGearDetails) return null;
    if (children) return <div className={className}>{children}</div>;
    return (
        <div className={cn('space-y-2', className)}>
            <div className='text-muted-foreground text-sm'>
                No gear selected.
            </div>
            {!isReadOnly && <AddGearButton />}
        </div>
    );
};
