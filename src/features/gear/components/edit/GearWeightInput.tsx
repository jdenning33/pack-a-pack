import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

export function GearWeightInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <div className='flex items-center gap-1'>
                <Input
                    type='number'
                    placeholder='Weight'
                    {...register('weight', {
                        required: 'Weight is required',
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: 'Weight must be a positive number',
                        },
                    })}
                    aria-invalid={!!errors.weight}
                />
                <span className='text-sm font-semibold text-primary/70'>
                    oz
                </span>
            </div>
            {errors.weight && (
                <p className='text-sm text-red-600'>{errors.weight.message}</p>
            )}
        </div>
    );
}
