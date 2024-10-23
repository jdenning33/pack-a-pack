import React from 'react';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';
import { useEditPackForm } from './EditPackForm';

export function PackIsPublicInput({ className }: { className?: string }) {
    const { control } = useEditPackForm();
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Controller
                control={control}
                name='isPublic'
                render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                        id='isPublic'
                        onCheckedChange={onChange}
                        onBlur={onBlur}
                        checked={value}
                    />
                )}
            />
            <Label htmlFor='isPublic'>Make this pack public</Label>
        </div>
    );
}
