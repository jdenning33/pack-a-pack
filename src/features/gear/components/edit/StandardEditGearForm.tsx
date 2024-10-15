import React from 'react';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import {
    EditGearForm,
    GearImage,
    GearNameInput,
    GearDescriptionInput,
    GearBrandInput,
    GearWeightInput,
    GearPriceInput,
    GearImageUrlInput,
    GearSaveButton,
    GearSaveAsNewButton,
    GearCancelButton,
} from './EditGearForm';

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
                <GearImage />
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
            <GearImageUrlInput />
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
