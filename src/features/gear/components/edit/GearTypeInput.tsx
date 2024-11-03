import React from 'react';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

interface GearTypeInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearTypeInput({
    className,
    includeLabel = true,
}: GearTypeInputProps) {
    const { register, errors } = useEditGearForm();
    const inputId = 'gear-type';

    return (
        <div className={cn('', className)}>
            {includeLabel && <Label htmlFor={inputId}>Gear Type</Label>}
            <Input
                id={inputId}
                placeholder='Gear Type'
                {...register('type', {
                    required: 'Gear type is required',
                })}
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? `${inputId}-error` : undefined}
            />
            {errors.type && (
                <p
                    id={`${inputId}-error`}
                    className='text-sm font-medium text-destructive'
                >
                    {errors.type.message}
                </p>
            )}
        </div>
    );
}
