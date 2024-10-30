import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { useGearContext } from '../../useGearContext';
import { EditGearForm } from '../edit/EditGearForm';
import {
    StandardEditGearInputs,
    StandardEditGearButtons,
} from '../edit/StandardEditGearForm';
import { useGearModal } from './GearModal';

export const EditGearModalContent: React.FC = () => {
    const { gear, afterGearUpdated } = useGearContext();
    const { setIsEditing } = useGearModal();

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit Your Gear</DialogTitle>
                <DialogDescription>
                    Provide details for the gear.
                </DialogDescription>
            </DialogHeader>
            <EditGearForm
                gear={gear}
                afterSave={(gear) => {
                    setIsEditing(false);
                    afterGearUpdated(gear);
                }}
                onCancel={() => setIsEditing(false)}
            >
                <StandardEditGearInputs />
                <DialogFooter className='mt-4 !justify-start'>
                    <StandardEditGearButtons />
                </DialogFooter>
            </EditGearForm>
        </>
    );
};
