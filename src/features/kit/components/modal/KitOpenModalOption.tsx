import React from 'react';
import { DropdownMenuItem } from '@/ui/dropdown-menu';
import { useKitModalContext } from './KitModal';

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
    const { setIsOpen, setIsEditing } = useKitModalContext();
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
