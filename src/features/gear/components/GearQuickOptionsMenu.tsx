import React from 'react';
import { Minus } from 'lucide-react';
import { Edit, Trash, Maximize } from 'lucide-react';
import { useGearContext } from '../useGearContext';
import { Item } from '@/lib/appTypes';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import {
    QuickActionMenu,
    QuickActionMenuOption,
} from '@/ui/quick-actions-dropdown-menu';

// GearQuickOptions component
export const GearQuickOptionsMenu: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children }) => {
    const { gear, isEditing } = useGearContext();
    if (!gear || isEditing) return null;
    return <QuickActionMenu className={className}>{children}</QuickActionMenu>;
};

export const GearEditOption: React.FC = () => {
    const { user } = useAuth();
    const { setIsEditing, setIsModalOpen } = useGearContext();
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsEditing(true);
                setIsModalOpen(true);
            }}
            icon={<Edit size={14} />}
            name='Edit'
        />
    );
};

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

export const GearOpenModalOption: React.FC = () => {
    const { setIsModalOpen } = useGearContext();
    return (
        <QuickActionMenuOption
            onClick={() => setIsModalOpen(true)}
            icon={<Maximize size={14} />}
            name='Details'
        />
    );
};

export const GearDeleteOption: React.FC = () => {
    const { user } = useAuth();
    const { gear } = useGearContext();
    const { removeGear } = useAppMutations();
    if (!gear) return null;
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => removeGear(gear)}
            icon={<Trash size={14} />}
            name='Delete'
        />
    );
};
