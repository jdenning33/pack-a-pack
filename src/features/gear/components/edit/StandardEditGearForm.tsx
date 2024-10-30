import React from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import {
    EditGearForm,
    GearSaveButton,
    GearSaveAsNewButton,
    GearCancelButton,
} from './EditGearForm';
import { GearInteractiveImage } from './GearInteractiveImage';
import { GearBrandInput } from './GearBrandInput';
import { GearDescriptionInput } from './GearDescriptionInput';
import { GearPriceInput } from './GearPriceInput';
import { GearWeightInput } from './GearWeightInput';
import { GearNameInput } from './GearNameInput';
import { GearUploadImageFromUrlInput } from './GearUploadImageFromUrlInput';
import { GearTypeInput } from './GearTypeInput';

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
                        <GearTypeInput />
                    </div>
                    <div className='flex gap-4'>
                        <GearBrandInput />
                        <GearWeightInput />
                        <GearPriceInput />
                    </div>
                </div>
            </div>
            <GearDescriptionInput />
            {/* <GearImageUrlInput /> */}
            <GearUploadImageFromUrlInput />
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
