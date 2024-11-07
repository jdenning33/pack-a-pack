import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { usePack } from '../usePack';
import { EditPackForm } from '../edit/EditPackForm';
import { usePackModalContext } from './PackModal';
import {
    StandardEditPackButtons,
    StandardEditPackInputs,
} from '../edit/StandardEditPackForm';

export const EditPackModalContent: React.FC = () => {
    const { pack } = usePack();
    const { setIsEditing } = usePackModalContext();

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {pack ? 'Edit Pack' : 'Create New Pack'}
                </DialogTitle>
                <DialogDescription>
                    {pack
                        ? 'Update your pack details.'
                        : 'Enter details for your new pack.'}
                </DialogDescription>
            </DialogHeader>
            <EditPackForm onFinished={() => setIsEditing(false)}>
                <StandardEditPackInputs />
                <DialogFooter className='!justify-start mt-10'>
                    <StandardEditPackButtons />
                </DialogFooter>
            </EditPackForm>
        </>
    );
};
