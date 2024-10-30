import React from 'react';
import { useGearContext } from '../../useGearContext';
import { QuickActionMenu } from '@/ui/quick-actions-dropdown-menu';

// GearQuickOptions component
export const GearQuickOptionsMenu: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children }) => {
    const { gear } = useGearContext();
    if (!gear) return null;
    return <QuickActionMenu className={className}>{children}</QuickActionMenu>;
};
