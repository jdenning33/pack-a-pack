import React from 'react';
import { Edit } from 'lucide-react';
import { usePack } from '../../usePack';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { usePackModalContext } from '../modal/PackModal';

export function PackEditInModalOption() {
    const { isReadOnly } = usePack();
    const { setIsEditing, setIsOpen } = usePackModalContext();
    if (isReadOnly) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsOpen(true);
                setIsEditing(true);
            }}
            icon={<Edit size={14} />}
            name='Edit'
        />
    );
}
