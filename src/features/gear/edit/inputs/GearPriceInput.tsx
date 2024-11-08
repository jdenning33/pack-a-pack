import React from 'react';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { cn } from '@/lib/utils';
import { useEditGearForm } from '../EditGearForm';

interface GearPriceInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearPriceInput({
    className,
    includeLabel = true,
}: GearPriceInputProps) {
    const { register, errors } = useEditGearForm();
    const inputId = 'gear-price';

    return (
        <div className={cn('', className)}>
            {includeLabel && <Label htmlFor={inputId}>Price</Label>}
            <div className='flex items-center gap-1 relative'>
                <span className='absolute top-0 bottom-0 flex items-center left-3 text-sm '>
                    $
                </span>
                <Input
                    id={inputId}
                    type='number'
                    step={0.01}
                    className='pl-6'
                    placeholder='Price'
                    {...register('price', {
                        required: 'Price is required',
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: 'Price must be a positive number',
                        },
                    })}
                    aria-invalid={!!errors.price}
                    aria-describedby={
                        errors.price ? `${inputId}-error` : undefined
                    }
                />
            </div>
            {errors.price && (
                <p
                    id={`${inputId}-error`}
                    className='text-sm font-medium text-destructive'
                >
                    {errors.price.message}
                </p>
            )}
        </div>
    );
}
