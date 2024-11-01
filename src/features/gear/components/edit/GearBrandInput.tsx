import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Label } from '@/ui/label';

export function GearBrandInput({
    className,
    includeLabel = true,
}: {
    className?: string;
    includeLabel?: boolean;
}) {
    const { register } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            {includeLabel && <Label htmlFor='brand'>Brand</Label>}
            <Input
                id='brand'
                placeholder='Brand (optional)'
                {...register('brand')}
            />
        </div>
    );
}
