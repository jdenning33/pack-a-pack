import React from 'react';
import { Trash } from 'lucide-react';
import { useGearContext } from '../useGearContext';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

export const GearDeleteOption: React.FC = () => {
    const { user } = useAuth();
    const { gear } = useGearContext();
    const { removeGear } = useAppMutations();
    if (!gear) return null;
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => removeGear(gear)}
            icon={<Trash size={14} />}
            name='Delete'
        />
    );
};
