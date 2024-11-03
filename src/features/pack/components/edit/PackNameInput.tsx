import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditPackForm } from './EditPackForm';

export function PackNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditPackForm();
    return (
        <div className={cn(className)}>
            <Input
                id='name'
                placeholder='Pack Name'
                {...register('name', {
                    required: 'Pack name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}
