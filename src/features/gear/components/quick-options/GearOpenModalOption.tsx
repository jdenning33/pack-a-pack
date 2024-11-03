import React from 'react';
import { Maximize } from 'lucide-react';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useGearModal } from '../modal/GearModal';

export const GearOpenModalOption: React.FC = () => {
    const { setIsOpen } = useGearModal();
    return (
        <QuickActionMenuOption
            onClick={() => setIsOpen(true)}
            icon={<Maximize size={14} />}
            name='Details'
        />
    );
};
