import React from 'react';
import { QuickActionMenu } from '@/ui/quick-actions-dropdown-menu';

export function PackQuickOptionsMenu({
    className,
    children,
    ...menuProps
}: {
    className?: string;
    children?: React.ReactNode;
} & React.ComponentProps<typeof QuickActionMenu>) {
    return (
        <QuickActionMenu className={className} {...menuProps}>
            {children}
        </QuickActionMenu>
    );
}
