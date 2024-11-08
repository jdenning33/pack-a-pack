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
import { GearAttributesInput } from './inputs/GearAttributesInput';
import { Label } from '@/ui/label';
import { FieldError } from 'react-hook-form';

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
                <div>
                    <GearInteractiveImage />
                </div>
                <div className='flex flex-col gap-4'>
                    <GearLabelAndField label='Name' htmlFor='name'>
                        <GearNameInput />
                    </GearLabelAndField>
                    <div className='flex gap-4'>
                        <GearLabelAndField label='Brand' htmlFor='brand'>
                            <GearBrandInput />
                        </GearLabelAndField>
                        <GearLabelAndField label='Price' htmlFor='price'>
                            <GearPriceInput />
                        </GearLabelAndField>
                        <GearLabelAndField label='Type' htmlFor='type'>
                            <GearTypeInput />
                        </GearLabelAndField>
                    </div>
                    <div className='flex gap-4'>
                        <GearLabelAndField label='Weight' htmlFor='weight'>
                            <GearWeightInput />
                        </GearLabelAndField>
                        <GearLabelAndField
                            label='Weight Type'
                            htmlFor='weightType'
                        >
                            <GearWeightTypeInput />
                        </GearLabelAndField>
                    </div>
                    <GearLabelAndField
                        label='Description'
                        htmlFor='description'
                    >
                        <GearDescriptionInput />
                    </GearLabelAndField>
                    <GearLabelAndField
                        label='Custom Attributes'
                        htmlFor='attributes'
                    >
                        <GearAttributesInput className='flex-row flex-wrap' />
                    </GearLabelAndField>

                    <GearUploadImageFromUrlInput />
                </div>
            </div>
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

export function GearLabelAndField({
    label,
    tooltip,
    children,
    htmlFor,
    className,
}: {
    label: React.ReactNode;
    tooltip?: React.ReactNode;
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}) {
    return (
        <div className={cn('', className)}>
            <Label htmlFor={htmlFor} className='p-2 flex'>
                {label} {tooltip}
            </Label>
            {children}
        </div>
    );
}

export function GearFieldWithError({
    children,
    error,
    className,
}: {
    children: React.ReactNode;
    error?: FieldError;
    className?: string;
}) {
    return (
        <div className={cn('space-y-2', className)}>
            {children}
            {error && <p className='text-sm text-red-600'>{error.message}</p>}
        </div>
    );
}
