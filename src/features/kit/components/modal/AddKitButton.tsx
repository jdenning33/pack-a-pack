import React from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { useKitModalContext } from './KitModal';
import { useKitContext } from '../../useKitContext';

export const AddKitButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { isReadOnly } = useKitContext();
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
            disabled={isReadOnly}
            disabledTitle='You cannot edit this kit'
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
