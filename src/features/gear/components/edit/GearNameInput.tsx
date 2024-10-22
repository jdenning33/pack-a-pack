import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

export function GearNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn(className)}>
            <Input
                placeholder='Gear Name'
                {...register('name', {
                    required: 'Gear name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}
