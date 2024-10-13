import { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { EditGearForm } from './EditGearForm';
import { Gear } from '@/lib/appTypes';
import { GearDetailsPanel } from './GearDetailsPanel';

// Define the type for form inputs
export function GearModal({
    gear,
    className,
    children,
}: {
    className?: string;
    gear?: Gear;
    children?: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsEditing(false);
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button variant='outline' size='sm' className={className}>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Gear
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                {isEditing || !gear ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Edit Your Gear</DialogTitle>
                            <DialogDescription>
                                Provide details for the new gear.
                            </DialogDescription>
                        </DialogHeader>
                        <EditGearForm
                            gear={gear}
                            onFinished={(g) => {
                                setIsEditing(false);
                                if (g && g.id != gear?.id) setIsOpen(false);
                            }}
                        />
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                {gear.isPublic ? 'Public Gear' : 'My Gear'}
                            </DialogTitle>
                        </DialogHeader>
                        <GearDetailsPanel gear={gear} />
                        <DialogFooter className='flex !justify-start'>
                            <Button onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
