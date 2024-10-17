import React from 'react';
import { DropdownMenuItem } from '@/ui/dropdown-menu';
import { useKitCardContext } from './KitCard';

export function EditKitCardOption() {
    const { setIsEditing } = useKitCardContext();
    return (
        <DropdownMenuItem
            onClick={() => {
                setIsEditing(true);
            }}
        >
            Quick Edit
        </DropdownMenuItem>
    );
}
