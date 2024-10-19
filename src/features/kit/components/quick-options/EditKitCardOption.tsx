import React from 'react';
import { useKitCardContext } from '../card/KitCard';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { Edit } from 'lucide-react';

export function EditKitCardOption() {
    const { setIsEditing } = useKitCardContext();
    return (
        <QuickActionMenuOption
            icon={<Edit size={14} />}
            onClick={() => setIsEditing(true)}
            name='Quick Edit'
        />
    );
}
