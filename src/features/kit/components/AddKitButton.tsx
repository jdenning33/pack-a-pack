import React from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { useKitContext } from '../useKitContext';

export const AddKitButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { setIsEditing, setIsModalOpen } = useKitContext();
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
                    Add Kit
                </>
            )}
        </Button>
    );
};
