import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearBinForm } from './EditGearBinForm';

export function GearBinNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearBinForm();
    return (
        <div className={cn(className)}>
            <Input
                id='name'
                placeholder='Name'
                {...register('name', {
                    required: 'Bin name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}
