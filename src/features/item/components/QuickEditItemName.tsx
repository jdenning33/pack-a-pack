import React, { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Check, Edit, X } from 'lucide-react';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext } from '../useItem';

export function QuickEditItemName({ className }: { className?: string }) {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(item?.name);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(item.name);
    };

    const handleConfirm = () => {
        updateItem({ ...item, name: editedName || '' });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedName(item.name);
    };

    return (
        <div className={className}>
            {isEditing ? (
                <div className='flex items-center'>
                    <Input
                        value={editedName}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleConfirm();
                            } else if (e.key === 'Escape') {
                                handleCancel();
                            }
                        }}
                        onChange={(e) => setEditedName(e.target.value)}
                        className='text-xl h-10 w-40 mr-1 bg-background'
                    />
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleConfirm}
                        className='w-6'
                    >
                        <Check className='h-4' />
                    </Button>
                    <Button
                        size='icon'
                        variant='ghost'
                        onClick={handleCancel}
                        className='w-6'
                    >
                        <X className='h-4' />
                    </Button>
                </div>
            ) : (
                <div
                    className='flex items-center group'
                    onClick={(e) =>
                        e.detail === 2 && !isReadOnly && handleEdit()
                    }
                >
                    <h2 className='text-2xl font-bold mr-1'>{item.name}</h2>
                    {isReadOnly && (
                        <Button
                            size='icon'
                            variant='ghost'
                            className='opacity-0 group-hover:opacity-100 h-8 w-6 pt-1'
                            onClick={handleEdit}
                        >
                            <Edit className='h-[.85rem]' />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
