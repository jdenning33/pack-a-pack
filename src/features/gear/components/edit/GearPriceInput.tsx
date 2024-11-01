import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

export function GearPriceInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <div className='flex items-center gap-1'>
                <span className='text-sm font-semibold text-primary/70'>$</span>
                <Input
                    type='number'
                    step={0.01}
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
                />
            </div>
            {errors.price && (
                <p className='text-sm text-red-600'>{errors.price.message}</p>
            )}
        </div>
    );
}
