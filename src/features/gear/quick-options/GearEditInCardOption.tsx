import React from 'react';
import { Edit } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useGearDetailCard } from '../card/GearDetailCard';

export const GearEditInCardOption: React.FC = () => {
    const { user } = useAuth();
    const { setIsEditing } = useGearDetailCard();
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
