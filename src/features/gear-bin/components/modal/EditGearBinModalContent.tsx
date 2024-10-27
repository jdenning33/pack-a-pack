import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import { useGearBin } from '../../useGearBin';
import { useGearBinModalContext } from './GearBinModal';
import { EditGearBinForm } from '../edit/EditGearBinForm';
import { GearBinNameInput } from '../edit/GearBinNameInput';
import { GearBinDescriptionInput } from '../edit/GearBinDescriptionInput';
import { GearBinSaveButton } from '../edit/GearBinSaveButton';
import { GearBinCancelButton } from '../edit/GearBinCancelButton';

export const EditGearBinModalContent: React.FC = () => {
    const { gearBin } = useGearBin();
    const { setIsEditing } = useGearBinModalContext();

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    {gearBin ? 'Edit GearBin' : 'Create New GearBin'}
                </DialogTitle>
                <DialogDescription>
                    {gearBin
                        ? 'Update your gearbin details.'
                        : 'Enter details for your new gearbin.'}
                </DialogDescription>
            </DialogHeader>
            <EditGearBinForm onFinished={() => setIsEditing(false)}>
                <GearBinNameInput />
                <GearBinDescriptionInput />
                <DialogFooter className='!justify-start mt-10'>
                    <GearBinSaveButton />
                    <GearBinCancelButton />
                </DialogFooter>
            </EditGearBinForm>
        </>
    );
};
