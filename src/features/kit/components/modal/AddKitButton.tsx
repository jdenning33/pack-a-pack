import React from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { useKitModalContext } from './KitModal';

export const AddKitButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { setIsEditing, setIsOpen } = useKitModalContext();
    return (
        <Button
            className={className}
            variant='outline'
            size='sm'
            onClick={() => {
                setIsEditing(true);
                setIsOpen(true);
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
