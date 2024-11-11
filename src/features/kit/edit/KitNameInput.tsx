import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditKitForm } from './EditKitForm';

export function KitNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditKitForm();
    return (
        <div className={cn(className)}>
            <Input
                placeholder='Kit Name'
                {...register('name', {
                    required: 'Kit name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}
