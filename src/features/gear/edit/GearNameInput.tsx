import React from 'react';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

interface GearNameInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearNameInput({
    className,
    includeLabel = true,
}: GearNameInputProps) {
    const { register, errors } = useEditGearForm();
    const inputId = 'gear-name';

    return (
        <div className={cn('', className)}>
            {includeLabel && (
                <Label
                    htmlFor={inputId}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Name
                </Label>
            )}
            <Input
                id={inputId}
                placeholder='Gear Name'
                {...register('name', {
                    required: 'Gear name is required',
                })}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${inputId}-error` : undefined}
            />
            {errors.name && (
                <p
                    id={`${inputId}-error`}
                    className='text-sm font-medium text-destructive'
                >
                    {errors.name.message}
                </p>
            )}
        </div>
    );
}
