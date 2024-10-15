import { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/ui/dialog';
import { Plus } from 'lucide-react';
import { PackSummary } from '@/lib/appTypes';
import { EditPackForm } from './EditPackForm';

export function PackModal({
    pack,
    className,
    children,
    isOpen: isOpenProp,
    onOpenChange,
    isEditing: isEditingProp,
}: {
    pack?: PackSummary;
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    isEditing?: boolean;
    onIsEditingChange?: (isEditing: boolean) => void;
}) {
    const [isOpen, setIsOpen] = useState(isOpenProp || false);
    const [isEditing, setIsEditing] = useState(true);

    const hasPack = !!pack;
    useEffect(() => {
        setIsEditing(!hasPack || isEditingProp || false);
    }, [isOpen, hasPack, isEditingProp]);

    useEffect(() => {
        if (isOpenProp !== undefined) setIsOpen(isOpenProp);
    }, [isOpenProp]);
    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button variant='outline' size='sm' className={className}>
                        <Plus className='mr-2 h-4 w-4' />
                        {pack ? 'Edit Pack' : 'Add Pack'}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                {isEditing ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                {pack ? 'Edit Pack' : 'Add New Pack'}
                            </DialogTitle>
                            <DialogDescription>
                                {pack
                                    ? 'Edit the details of your pack.'
                                    : 'Create a new pack by providing a name and description.'}
                            </DialogDescription>
                        </DialogHeader>
                        <EditPackForm
                            pack={pack}
                            onFinished={(updatedPackId) => {
                                setIsEditing(false);
                                if (updatedPackId && updatedPackId !== pack?.id)
                                    setIsOpen(false);
                            }}
                        />
                    </>
                ) : (
                    pack && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{pack?.name}</DialogTitle>
                                <DialogDescription>
                                    {pack?.userName}
                                </DialogDescription>
                            </DialogHeader>
                            <p className='text-sm'>{pack?.description}</p>
                            <DialogFooter className='!justify-start'>
                                <Button onClick={(_) => setIsEditing(true)}>
                                    Edit
                                </Button>
                            </DialogFooter>
                        </>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
}
