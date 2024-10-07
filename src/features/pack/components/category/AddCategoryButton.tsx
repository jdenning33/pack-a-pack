import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { usePack } from '../../hooks/usePack';

export function AddCategoryButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const { addCategory } = usePack();

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            await addCategory({
                name: newCategoryName,
                description: newCategoryDescription,
                items: [],
            });
            setNewCategoryName('');
            setNewCategoryDescription('');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <Plus className='mr-2 h-4 w-4' /> Add Pack Category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Pack Category</DialogTitle>
                    <DialogDescription>
                        Create a new category for your pack items.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCategory} className='space-y-4'>
                    <Input
                        placeholder='Category Name'
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder='Category Description (optional)'
                        value={newCategoryDescription}
                        onChange={(e) =>
                            setNewCategoryDescription(e.target.value)
                        }
                    />
                    <Button type='submit'>Add Category</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
