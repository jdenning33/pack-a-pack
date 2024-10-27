import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearBinForm } from './EditGearBinForm';

export function GearBinDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearBinForm();
    return (
        <div className={cn(className)}>
            <Input
                id='description'
                placeholder='Description'
                {...register('description', {
                    required: 'Bin description is required',
                })}
                aria-invalid={!!errors.description}
            />
            {errors.description && (
                <p className='text-sm text-red-600'>
                    {errors.description.message}
                </p>
            )}
        </div>
    );
}
