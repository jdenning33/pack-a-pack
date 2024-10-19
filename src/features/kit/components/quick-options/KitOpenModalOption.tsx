import React from 'react';
import { useKitModalContext } from '../modal/KitModal';
import { useKitContext } from '../../useKitContext';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { Edit, Maximize } from 'lucide-react';

export function KitOpenModalOption() {
    const { setIsOpen, setIsEditing } = useKitModalContext();
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsOpen(true);
                setIsEditing(false);
            }}
            name='Details'
            icon={<Maximize size={14} />}
        />
    );
}

export function KitOpenEditModalOption() {
    const { isReadOnly } = useKitContext();
    const { setIsOpen, setIsEditing } = useKitModalContext();

    if (isReadOnly) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsOpen(true);
                setIsEditing(true);
            }}
            name='Edit'
            icon={<Edit size={14} />}
        />
    );
}
