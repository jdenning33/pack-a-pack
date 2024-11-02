import React from 'react';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { Label } from '@/ui/label';
import { EditWeightTypeToggle } from '@/features/shared/EditWeightTypeToggle';

interface GearWeightInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearWeightTypeInput({
    className,
    includeLabel = true,
}: GearWeightInputProps) {
    const { errors, control } = useEditGearForm();
    const inputId = 'gear-weight-type';

    return (
        <div className={cn('', className)}>
            {includeLabel && (
                <Label
                    htmlFor={inputId}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Weight Type
                </Label>
            )}
            <Controller
                name='weightType'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <EditWeightTypeToggle
                        weightType={value}
                        onChange={onChange}
                        activeButtonVariant='outline'
                        inactiveButtonVariant='secondary'
                        activeButtonClassName='hover:bg-background'
                    />
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
