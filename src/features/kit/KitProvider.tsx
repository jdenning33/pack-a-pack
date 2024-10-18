import React from 'react';
import { Kit } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { KitContextType, KitContext } from './useKitContext';

// Main Kit component
export const KitProvider: React.FC<
    {
        className?: string;
        kit?: Kit;
        packId: string;
        isReadOnly: boolean;
        afterKitUpdated?: (kit: Kit) => void;
        onIsEditingChanged?: (isEditing: boolean) => void;
        children: React.ReactNode;
    } & React.HTMLAttributes<HTMLDivElement>
> = ({
    className,
    kit,
    packId,
    isReadOnly,
    afterKitUpdated,
    children,
    ...divProps
}) => {
    const contextValue: KitContextType = {
        kit: kit,
        packId,
        isReadOnly,
        afterKitUpdated: (kit) => {
            afterKitUpdated?.(kit);
        },
    };

    return (
        <KitContext.Provider value={contextValue}>
            <div {...divProps} className={cn('relative group', className)}>
                {children}
            </div>
        </KitContext.Provider>
    );
};
