import React from 'react';
import { useKitContext } from '../../useKitContext';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { Trash } from 'lucide-react';

export function DeleteKitOption() {
    const { kit, isReadOnly } = useKitContext();
    const { deleteKit } = useAppMutations();
    if (!kit || isReadOnly) return null;
    return (
        <QuickActionMenuOption
            icon={<Trash size={14} />}
            onClick={() => deleteKit(kit)}
            name='Delete'
        />
    );
}
