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
import { usePacks } from '../../pack-search/usePackSearch';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { PackModal } from './PackModal';

// PackAddButton Component
export const AddPackButton = (props: React.ComponentProps<typeof Button>) => {
    return (
        <PackModal>
            <Button {...props}>
                <Plus className='mr-2 h-4 w-4' /> Add New Pack
            </Button>
        </PackModal>
    );
};
export const AddPackButton2 = (props: React.ComponentProps<typeof Button>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newPackName, setNewPackName] = useState('');
    const [newPackDescription, setNewPackDescription] = useState('');
    const { upsertPack: addPack } = usePacks();
    const { user } = useAuth();

    const handleAddPack = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPackName.trim() && newPackDescription.trim()) {
            if (!user?.id) {
                toast.error('You must be signed in to create a new pack.');
                return;
            }
            addPack({
                userId: user.id,
                name: newPackName,
                description: newPackDescription,
                isPublic: false,
                isGearLocker: false,
                isDeleted: false,
            });
            setNewPackName('');
            setNewPackDescription('');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button {...props}>
                    <Plus className='mr-2 h-4 w-4' /> Add New Pack
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Pack</DialogTitle>
                    <DialogDescription>
                        Create a new pack by providing a name and description.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddPack} className='space-y-4'>
                    <Input
                        placeholder='Pack Name'
                        value={newPackName}
                        onChange={(e) => setNewPackName(e.target.value)}
                        required
                    />
                    <Textarea
                        placeholder='Pack Description'
                        value={newPackDescription}
                        onChange={(e) => setNewPackDescription(e.target.value)}
                        required
                    />
                    <Button type='submit'>Add Pack</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
