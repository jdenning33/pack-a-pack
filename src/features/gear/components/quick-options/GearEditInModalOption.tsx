import React from 'react';
import { Edit } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useGearBinModalContext } from '@/features/gear-bin/components/modal/GearBinModal';

export const GearEditInModalOption: React.FC = () => {
    const { user } = useAuth();
    const { setIsEditing, setIsOpen } = useGearBinModalContext();
    if (!user) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsEditing(true);
                setIsOpen(true);
            }}
            icon={<Edit size={14} />}
            name='Edit'
        />
    );
};
