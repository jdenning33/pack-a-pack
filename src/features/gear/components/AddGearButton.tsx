import { useState } from 'react';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { EditGearForm } from './EditGearForm';

// Define the type for form inputs

export function AddGearButton({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className={className}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Gear
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Gear</DialogTitle>
                    <DialogDescription>
                        Provide details for the new gear.
                    </DialogDescription>
                </DialogHeader>
                <EditGearForm onFinished={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
