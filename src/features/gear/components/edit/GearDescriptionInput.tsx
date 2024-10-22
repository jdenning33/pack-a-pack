import React from 'react';
import { Textarea } from '@/ui/textarea';
import { useEditGearForm } from './EditGearForm';

export function GearDescriptionInput({ className }: { className?: string }) {
    const { register } = useEditGearForm();
    return (
        <div className={className}>
            <Textarea
                placeholder='Description (optional)'
                {...register('description')}
            />
        </div>
    );
}
