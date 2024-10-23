import React from 'react';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';
import { useEditPackForm } from './EditPackForm';

export function PackIsGearLockerInput({ className }: { className?: string }) {
    const { control } = useEditPackForm();
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Controller
                control={control}
                name='isGearLocker'
                render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                        id='isGearLocker'
                        onCheckedChange={onChange}
                        onBlur={onBlur}
                        checked={value}
                    />
                )}
            />
            <Label htmlFor='isGearLocker'>Use as gear locker</Label>
        </div>
    );
}
