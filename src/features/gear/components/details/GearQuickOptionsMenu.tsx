import React from 'react';
import { Button } from '@/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Minus, Settings } from 'lucide-react';
import { useGear } from '@/features/gear/useGear';
import { DropdownMenuItem } from '@/ui/dropdown-menu';
import { Edit, Trash, Maximize } from 'lucide-react';
import { useGearContext } from './GearDetails';
import { Item } from '@/lib/appTypes';
import { usePack } from '@/features/pack/hooks/usePack';

// GearQuickOptions component
export const GearQuickOptionsMenu: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { gear, isEditing } = useGearContext();
    if (!gear || isEditing) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='sm'
                    className='absolute top-1 right-1 z-10'
                >
                    <Settings size={16} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>{children}</DropdownMenuContent>
        </DropdownMenu>
    );
};

export const GearEditOption: React.FC = () => {
    const { setIsEditing, setIsModalOpen } = useGearContext();
    return (
        <DropdownMenuItem
            onClick={() => {
                setIsEditing(true);
                setIsModalOpen(true);
            }}
        >
            <Edit className='mr-2 h-4 w-4' />
            Edit
        </DropdownMenuItem>
    );
};

export const GearRemoveFromItemOption = ({ item }: { item: Item }) => {
    const { updateItem } = usePack();
    return (
        <DropdownMenuItem
            onClick={(_) => updateItem({ ...item, gearId: undefined })}
        >
            <Minus className='mr-2 h-4 w-4' />
            Remove from Item
        </DropdownMenuItem>
    );
};

export const GearOpenModalOption: React.FC = () => {
    const { setIsModalOpen } = useGearContext();
    return (
        <DropdownMenuItem onClick={(_) => setIsModalOpen(true)}>
            <Maximize className='mr-2 h-4 w-4' />
            Open in Modal
        </DropdownMenuItem>
    );
};

export const GearDeleteOption: React.FC = () => {
    const { gear } = useGearContext();
    const { removeGear } = useGear();
    if (!gear) return null;
    return (
        <DropdownMenuItem onClick={() => removeGear(gear)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
        </DropdownMenuItem>
    );
};

export const GearOption: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    name: string;
}> = ({ onClick, icon, name }) => {
    return (
        <DropdownMenuItem onClick={onClick}>
            {icon}
            {name}
        </DropdownMenuItem>
    );
};
