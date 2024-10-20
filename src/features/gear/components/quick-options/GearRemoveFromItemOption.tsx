import React from 'react';
import { Minus } from 'lucide-react';
import { Item } from '@/lib/appTypes';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

export const GearRemoveFromItemOption = ({ item }: { item: Item }) => {
    const { user } = useAuth();
    const { updateItem } = useAppMutations();
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => updateItem({ ...item, gearId: undefined })}
            icon={<Minus size={14} />}
            name='Remove from Item'
        />
    );
};
