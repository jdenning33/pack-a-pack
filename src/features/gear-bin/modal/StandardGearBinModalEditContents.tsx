import React from 'react';
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';
import {
    GearBinModalEditContents,
    useGearBinModalContext,
} from './GearBinModal';
import { EditGearBinForm } from '../edit/EditGearBinForm';
import { GearBinNameInput } from '../edit/GearBinNameInput';
import { GearBinDescriptionInput } from '../edit/GearBinDescriptionInput';
import { GearBinSaveButton } from '../edit/GearBinSaveButton';
import { GearBinCancelButton } from '../edit/GearBinCancelButton';
import { useOptionalGearBin } from '../useGearBin';

export const StandardGearBinModalEditContents = () => {
    const { gearBin } = useOptionalGearBin();
    const { setIsEditing } = useGearBinModalContext();

    return (
        <GearBinModalEditContents>
            <DialogHeader>
                <DialogTitle>
                    {gearBin
                        ? `Edit ${gearBin.name} Gear Bin`
                        : 'Create New GearBin'}
                </DialogTitle>
                <DialogDescription>
                    {gearBin
                        ? 'Update your gear bin details.'
                        : 'Enter details for your new gear bin.'}
                </DialogDescription>
            </DialogHeader>
            <EditGearBinForm
                gearBin={gearBin}
                onFinished={() => setIsEditing(false)}
            >
                <div className='flex flex-col gap-4'>
                    <GearBinNameInput />
                    <GearBinDescriptionInput />
                </div>
                <DialogFooter className='!justify-start mt-6'>
                    <GearBinSaveButton />
                    <GearBinCancelButton />
                </DialogFooter>
            </EditGearBinForm>
        </GearBinModalEditContents>
    );
};
