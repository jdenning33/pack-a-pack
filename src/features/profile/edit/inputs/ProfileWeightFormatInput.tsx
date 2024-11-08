'use client';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { useEditProfileForm } from '../EditProfileForm';
import React from 'react';
import { FieldWithError } from '../ProfileEditFormContents';

export function ProfileWeightFormatInput({
    className,
}: {
    className?: string;
}) {
    const { watch, setValue, errors } = useEditProfileForm();
    return (
        <FieldWithError
            error={errors.preferredWeightFormat}
            className={className}
        >
            <RadioGroup
                value={watch('preferredWeightFormat')}
                onValueChange={(value) =>
                    setValue(
                        'preferredWeightFormat',
                        value as 'kg' | 'lbs' | 'lbs+oz'
                    )
                }
                className='flex space-x-4'
                aria-invalid={!!errors.preferredWeightFormat}
            >
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='kg' id='kg' />
                    <Label htmlFor='kg'>
                        Kilograms <br /> (1.4 kg)
                    </Label>
                </div>
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='lbs' id='lbs' />
                    <Label htmlFor='lbs'>
                        Pounds <br /> (2.6 lbs)
                    </Label>
                </div>
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='lbs+oz' id='lbs+oz' />
                    <Label htmlFor='lbs+oz'>
                        Pounds + Ounces <br /> (2 lbs, 6 oz)
                    </Label>
                </div>
            </RadioGroup>
        </FieldWithError>
    );
}
