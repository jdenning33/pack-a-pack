import React from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';

export function GearBrandInput({ className }: { className?: string }) {
    const { register } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <Input placeholder='Brand (optional)' {...register('brand')} />
        </div>
    );
}
