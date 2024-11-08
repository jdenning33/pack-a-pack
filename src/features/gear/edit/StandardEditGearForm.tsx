import React from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { EditGearForm } from './EditGearForm';
import { GearCancelButton } from './buttons/GearCancelButton';
import { GearSaveAsNewButton } from './buttons/GearSaveAsNewButton';
import { GearSaveButton } from './buttons/GearSaveButton';
import { GearInteractiveImage } from './GearInteractiveImage';
import { GearBrandInput } from './inputs/GearBrandInput';
import { GearDescriptionInput } from './inputs/GearDescriptionInput';
import { GearPriceInput } from './inputs/GearPriceInput';
import { GearWeightInput } from './inputs/GearWeightInput';
import { GearNameInput } from './inputs/GearNameInput';
import { GearUploadImageFromUrlInput } from './inputs/GearUploadImageFromUrlInput';
import { GearTypeInput } from './inputs/GearTypeInput';
import { GearWeightTypeInput } from './inputs/GearWeightTypeInput';

export function StandardEditGearForm(props: {
    gear?: Gear;
    afterSave?: (gear: Gear) => void;
    onCancel?: () => void;
}) {
    return (
        <EditGearForm {...props}>
            <StandardEditGearInputs />
            <br />
            <StandardEditGearButtons />
        </EditGearForm>
    );
}
export function StandardEditGearInputs({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            <div className='flex gap-4'>
                {/* <div> */}
                <GearInteractiveImage />
                {/* <GearImage /> */}
                {/* <UploadImageInput /> */}
                {/* </div> */}
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <GearNameInput />
                    </div>
                    <div className='flex gap-4'>
                        <GearBrandInput />
                        <GearPriceInput />
                        <GearTypeInput />
                    </div>
                    <div className='flex gap-4'>
                        <GearWeightInput />
                        <GearWeightTypeInput />
                    </div>
                    <GearDescriptionInput />
                    <div>
                        <GearUploadImageFromUrlInput />
                    </div>
                </div>
            </div>
            {/* <GearImageUrlInput /> */}
        </div>
    );
}
export function StandardEditGearButtons({ className }: { className?: string }) {
    return (
        <div className={cn('flex gap-4', className)}>
            <GearSaveButton />
            <GearSaveAsNewButton />
            <GearCancelButton />
        </div>
    );
}
