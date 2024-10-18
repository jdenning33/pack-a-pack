import React from 'react';
import { DropdownMenuItem } from '@/ui/dropdown-menu';
import { useKitModalContext } from './KitModal';
import { useKitContext } from '../../useKitContext';

export function KitOpenModalOption() {
    const { setIsOpen, setIsEditing } = useKitModalContext();
    return (
        <DropdownMenuItem
            onClick={() => {
                setIsOpen(true);
                setIsEditing(false);
            }}
        >
            Details
        </DropdownMenuItem>
    );
}

export function KitOpenEditModalOption() {
    const { isReadOnly } = useKitContext();
    const { setIsOpen, setIsEditing } = useKitModalContext();

    if (isReadOnly) return null;
    return (
        <DropdownMenuItem
            onClick={() => {
                setIsOpen(true);
                setIsEditing(true);
            }}
        >
            Edit
        </DropdownMenuItem>
    );
}
