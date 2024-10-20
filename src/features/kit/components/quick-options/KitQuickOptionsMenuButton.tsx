import React from 'react';
import { useKitContext } from '../../useKitContext';
import { QuickActionMenu } from '@/ui/quick-actions-dropdown-menu';

export function KitQuickOptionsMenuButton({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    const { kit } = useKitContext();
    if (!kit) return null;
    return <QuickActionMenu className={className}>{children}</QuickActionMenu>;
}
