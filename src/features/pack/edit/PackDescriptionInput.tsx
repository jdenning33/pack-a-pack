import React from 'react';
import { Textarea } from '@/ui/textarea';
import { useEditPackForm } from './EditPackForm';

export function PackDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditPackForm();
    return (
        <div className={className}>
            <Textarea
                id='description'
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
