import React from 'react';
import { Button } from '@/ui/button';
import { useGearContext } from './GearContext';
import { Plus } from 'lucide-react';

export const AddGearButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { setIsEditing, setIsModalOpen } = useGearContext();
    return (
        <Button
            className={className}
            variant='outline'
            size='sm'
            onClick={() => {
                setIsEditing(true);
                setIsModalOpen(true);
            }}
        >
            {children ? (
                children
            ) : (
                <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Gear
                </>
            )}
        </Button>
    );
};
