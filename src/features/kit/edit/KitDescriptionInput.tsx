import React from 'react';
import { Textarea } from '@/ui/textarea';
import { useEditKitForm } from './EditKitForm';

export function KitDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditKitForm();
    return (
        <div className={className}>
            <Textarea
                placeholder='Description'
                {...register('description')}
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
