import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

export function GearTypeInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn(className)}>
            <Input
                placeholder='Gear Type'
                {...register('type', {
                    required: 'Gear type is required',
                })}
                aria-invalid={!!errors.type}
            />
            {errors.type && (
                <p className='text-sm text-red-600'>{errors.type.message}</p>
            )}
        </div>
    );
}
