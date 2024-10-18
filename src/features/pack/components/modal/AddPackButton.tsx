import React from 'react';
import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { usePack } from '../../usePack';
import { usePackModalContext } from './PackModal';

export const AddPackButton: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { isReadOnly } = usePack();
    const { setIsEditing, setIsOpen } = usePackModalContext();
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
            disabledTitle='You cannot edit this pack'
        >
            {children ? (
                children
            ) : (
                <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Pack
                </>
            )}
        </Button>
    );
};
