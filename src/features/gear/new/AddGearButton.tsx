import React from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';
import { useGearModal } from '../modal/GearModal';

export const AddGearButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { user } = useAuth();
    const { setIsEditing, setIsOpen } = useGearModal();
    return (
        <Button
            className={className + ' relative'}
            variant='outline'
            size='sm'
            onClick={() => {
                setIsEditing(true);
                setIsOpen(true);
            }}
            disabled={!user}
            disabledTitle='You must be logged in to add gear'
        >
            {children ? (
                children
            ) : (
                <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add New Gear
                </>
            )}
        </Button>
    );
};
