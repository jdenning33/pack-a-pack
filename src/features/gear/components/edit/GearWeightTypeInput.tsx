import React from 'react';
import { cn } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';

interface GearWeightInputProps {
    className?: string;
    includeLabel?: boolean;
}

export function GearWeightTypeInput({
    className,
    includeLabel = true,
}: GearWeightInputProps) {
    const { errors, control } = useEditGearForm();
    const inputId = 'gear-weight-type';

    return (
        <div className={cn('', className)}>
            {includeLabel && (
                <Label
                    htmlFor={inputId}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Weight Type
                </Label>
            )}
            <Controller
                name='weightType'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className='flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md'>
                        <Button
                            type='button'
                            variant={value == 'base' ? 'outline' : 'secondary'}
                            onClick={() => onChange('base')}
                        >
                            Base
                        </Button>
                        <Button
                            type='button'
                            variant={
                                value == 'wearable' ? 'outline' : 'secondary'
                            }
                            onClick={() => onChange('wearable')}
                        >
                            Clothes
                        </Button>
                        <Button
                            type='button'
                            variant={
                                value == 'consumable' ? 'outline' : 'secondary'
                            }
                            onClick={() => onChange('consumable')}
                        >
                            Food
                        </Button>
                    </div>
                )}
            />
            {errors.weight && (
                <p
                    id={`${inputId}-error`}
                    className='text-sm font-medium text-destructive'
                >
                    {errors.weight.message}
                </p>
            )}
        </div>
    );
}
