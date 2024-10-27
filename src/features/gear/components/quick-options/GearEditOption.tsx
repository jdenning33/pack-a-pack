import React from 'react';
import { Edit } from 'lucide-react';
import { useGearContext } from '../../useGearContext';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

export const GearEditInModalOption: React.FC = () => {
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

export const GearEditInCardOption: React.FC = () => {
    const { user } = useAuth();
    const { setIsEditing } = useGearContext();
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsEditing(true);
            }}
            icon={<Edit size={14} />}
            name='Edit'
        />
    );
};
