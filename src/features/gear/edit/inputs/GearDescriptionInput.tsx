import React from 'react';
import { Textarea } from '@/ui/textarea';
import { useEditGearForm } from '../EditGearForm';
import { Label } from '@/ui/label';

export function GearDescriptionInput({
    className,
    includeLabel = true,
}: {
    className?: string;
    includeLabel?: boolean;
}) {
    const { register } = useEditGearForm();
    return (
        <div className={className}>
            {includeLabel && <Label htmlFor='description'>Description</Label>}
            <Textarea id='description' {...register('description')} />
        </div>
    );
}
