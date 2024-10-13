import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/ui/input';
import React from 'react';
import { usePack } from '../../hooks/usePack';

export const QuickAddPackItem = ({ kitId }: { kitId: string }) => {
    const { pack, addItem } = usePack();
    const [newItemName, setNewItemName] = React.useState('');
    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            await addItem({
                kitId: kitId,
                packId: pack.id,
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
            />
            <Button type='submit'>
                <Plus className='h-4 w-4' />
            </Button>
        </form>
    );
};
