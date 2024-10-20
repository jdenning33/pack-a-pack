import React from 'react';
import { Maximize } from 'lucide-react';
import { useGearContext } from '../../useGearContext';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

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
