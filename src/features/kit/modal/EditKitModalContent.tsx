import React from 'react';
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/ui/dialog';
import {
    StandardEditKitButtons,
    StandardEditKitInputs,
} from '../edit/StandardEditKitForm';
import { EditKitForm } from '../edit/EditKitForm';
import { useKitModalContext } from './KitModal';

export function EditKitModalContent({}) {
    const { setIsEditing, setIsOpen } = useKitModalContext();
    return (
        <>
            <DialogHeader className='p-4 pb-3 border-b text-left'>
                <DialogTitle>Edit Kit</DialogTitle>
                <DialogDescription>
                    Update the details of this kit.
                </DialogDescription>
            </DialogHeader>
            <EditKitForm
                className='h-full flex flex-col gap-4 justify-between'
                onFinished={(k) => {
                    setIsEditing(false);
                    if (!k) setIsOpen(false);
                }}
            >
                <div className='p-4 max-w-xl'>
                    <StandardEditKitInputs />
                </div>
                <DialogFooter className='p-4 !justify-start'>
                    <StandardEditKitButtons />
                </DialogFooter>
            </EditKitForm>
        </>
    );
}
