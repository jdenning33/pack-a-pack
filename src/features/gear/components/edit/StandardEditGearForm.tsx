import React from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import {
    EditGearForm,
    GearSaveButton,
    GearSaveAsNewButton,
    GearCancelButton,
} from './EditGearForm';
import { GearImage } from './GearImage';
import { InteractiveGearImage } from './InteractiveGearImage';
import { GearBrandInput } from './GearBrandInput';
import { GearImageUrlInput } from './GearImageUrlInput';
import { GearDescriptionInput } from './GearDescriptionInput';
import { GearPriceInput } from './GearPriceInput';
import { GearWeightInput } from './GearWeightInput';
import { GearNameInput } from './GearNameInput';
import { UploadImageInput } from './UploadImageInput';
import { UploadImageInputWithDownload } from './UploadImageInputWithDownload';

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
                <InteractiveGearImage />
                {/* <GearImage /> */}
                {/* <UploadImageInput /> */}
                {/* </div> */}
                <div className='flex flex-col gap-4'>
                    <GearNameInput />
                    <div className='flex gap-4'>
                        <GearBrandInput />
                        <GearWeightInput />
                        <GearPriceInput />
                    </div>
                </div>
            </div>
            <GearDescriptionInput />
            {/* <GearImageUrlInput /> */}
            <UploadImageInput />
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
