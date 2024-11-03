import React from 'react';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { Label } from '@/ui/label';
import { EditWeightPopover } from '@/features/shared/EditWeightPopover';

interface GearWeightInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearWeightInput({
    className,
    includeLabel = true,
}: GearWeightInputProps) {
    const { errors, control } = useEditGearForm();
    const inputId = 'gear-weight';

    return (
        <div className={cn('', className)}>
            {includeLabel && (
                <Label
                    htmlFor={inputId}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Weight
                </Label>
            )}
            <Controller
                name='weight'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className='min-w-20'>
                        <EditWeightPopover grams={value} onChange={onChange} />
                    </div>
                )}
            />
            {errors.weight && (
                <p
                    id={`${inputId}-error`}
                    className='text-sm font-medium text-destructive'
                >
                    {errors.weight.message}
                </p>
            )}
        </div>
    );
}
