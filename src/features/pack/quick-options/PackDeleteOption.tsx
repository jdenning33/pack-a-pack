import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { usePack } from '../usePack';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

export function PackDeleteOption() {
    const { pack, isReadOnly } = usePack();
    const { deletePack } = useAppMutations();
    if (isReadOnly || !pack) return null;
    return (
        <QuickActionMenuOption
            onClick={() => deletePack(pack)}
            icon={<Trash2 size={14} />}
            name='Delete'
        />
    );
}
