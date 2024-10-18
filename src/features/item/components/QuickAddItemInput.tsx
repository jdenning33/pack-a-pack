import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/ui/input';
import React from 'react';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';

export const QuickAddPackItem = () => {
    const { addItem } = useAppMutations();
    const { kit, isReadOnly } = useItemContext();
    const [newItemName, setNewItemName] = React.useState('');
    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            await addItem({
                kitId: kit.id,
                packId: kit.packId,
                name: newItemName.trim(),
                quantity: 1,
                isPacked: false,
                isDeleted: false,
                notes: '',
            });
            setNewItemName('');
        }
    };

    return (
        <form onSubmit={handleAddItem} className='flex space-x-2'>
            <Input
                id='new-item-name'
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder='Add new item'
                disabled={isReadOnly}
                title='You do not have access to add items to this pack'
            />
            <Button
                type='submit'
                disabled={isReadOnly}
                disabledTitle='You do not have access to add items to this pack'
            >
                <Plus className='h-4 w-4' />
            </Button>
        </form>
    );
};
