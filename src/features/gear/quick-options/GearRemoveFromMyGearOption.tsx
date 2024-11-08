import React from 'react';
import { BadgeMinusIcon } from 'lucide-react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useGearContext } from '../useGearContext';

export const GearRemoveFromUserGearOption = () => {
    const { user } = useAuth();
    const { gear } = useGearContext();
    const { removeGearFromUser } = useAppMutations();
    if (!user || !gear || !gear.isOwnedByUser) return null;
    return (
        <QuickActionMenuOption
            onClick={() => removeGearFromUser(gear.id)}
            icon={<BadgeMinusIcon size={14} />}
            name='Remove from My Gear'
        />
    );
};
