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

export function AddKitButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [newKitName, setNewKitName] = useState('');
    const [newKitDescription, setNewKitDescription] = useState('');
    const { pack, addKit } = usePack();

    const handleAddKit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newKitName.trim()) {
            await addKit({
                packId: pack.id,
                name: newKitName,
                description: newKitDescription,
                items: [],
            });
            setNewKitName('');
            setNewKitDescription('');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <Plus className='mr-2 h-4 w-4' /> Add a Kit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Kit</DialogTitle>
                    <DialogDescription>
                        Create a new kit for your pack items.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddKit} className='space-y-4'>
                    <Input
                        placeholder='Kit Name'
                        value={newKitName}
                        onChange={(e) => setNewKitName(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder='Kit Description (optional)'
                        value={newKitDescription}
                        onChange={(e) => setNewKitDescription(e.target.value)}
                    />
                    <Button type='submit'>Add Kit</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
