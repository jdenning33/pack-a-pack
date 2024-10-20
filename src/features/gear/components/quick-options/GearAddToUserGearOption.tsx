import React from 'react';
import { BadgePlusIcon } from 'lucide-react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useGearContext } from '../../useGearContext';

export const GearAddToUserGearOption = () => {
    const { user } = useAuth();
    const { gear } = useGearContext();
    const { addGearToUser } = useAppMutations();
    if (!user || !gear || gear.isOwnedByUser) return null;
    return (
        <QuickActionMenuOption
            onClick={() => addGearToUser(gear.id)}
            icon={<BadgePlusIcon size={14} />}
            name='Add to My Gear'
        />
    );
};
