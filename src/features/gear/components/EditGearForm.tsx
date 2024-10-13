import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { useGear } from '../useGear';
import { Gear } from '@/lib/appTypes';
import { Optional, cn } from '@/lib/utils';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useAuth } from '@/features/auth/useAuth';

export interface GearFormValues {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
}

export function EditGearForm({
    gear,
    onFinished,
}: {
    gear?: Optional<Gear, 'id'>;
    onFinished?: (gear: Gear | undefined) => void;
}) {
    const { user } = useAuth();
    const { addGear, updateGear } = useGear();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GearFormValues>({
        defaultValues: {
            name: gear?.name || '',
            description: gear?.description || '',
            brand: gear?.brand || '',
            image: gear?.image || '',
            weight: gear?.weight || 0,
            price: gear?.price || 0,
        },
    });

    const onSubmitSave = async (data: GearFormValues) => {
        onSubmit(data, false);
    };

    const onSubmitSaveAsNew = async (data: GearFormValues) => {
        onSubmit(data, true);
    };

    const onSubmit = async (data: GearFormValues, saveAs: boolean) => {
        const newGear = {
            ...gear,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
            isPublic: gear?.isPublic || false,
            isDeleted: gear?.isDeleted || false,
            purchaseLinks: gear?.purchaseLinks || [],
            createdById: gear?.createdById || user?.id || '',
        };
        if (saveAs) delete newGear.id;
        let id;
        if (newGear.id) id = await updateGear(newGear as Gear);
        else id = await addGear(newGear as Omit<Gear, 'id'>);
        onFinished?.({ ...newGear, id });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitSave)} className='space-y-4'>
            <div className='flex gap-4'>
                <GearImage />
                <div className='space-y-4 flex-grow'>
                    <GearNameInput />
                    <div className='flex gap-4'>
                        <GearBrandInput className='basis-1/3' />
                        <GearWeightInput className='basis-1/3' />
                        <GearPriceInput className='basis-1/3' />
                    </div>
                </div>
            </div>
            <GearDescriptionInput />
            <GearImageUrlInput />

            <div className='flex gap-2'>
                <Button type='submit'>Save</Button>
                {gear?.id && (
                    <Button
                        type='button'
                        variant={'outline'}
                        onClick={handleSubmit(onSubmitSaveAsNew)}
                    >
                        Save As New
                    </Button>
                )}
                <Button
                    variant='ghost'
                    type='button'
                    onClick={() => onFinished?.(undefined)}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );

    function GearImage() {
        const gearImage = useWatch({
            control: control,
            name: 'image',
        });

        return (
            <div className='relative w-24 h-24 rounded-lg flex-shrink-0'>
                <ImageWithFallback
                    src={gearImage || ''}
                    fallbackSrc='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt={gear?.name || 'placeholder'}
                    fill={true}
                    sizes='100% 100%'
                    className='rounded w-full h-full object-contain'
                />
            </div>
        );
    }

    function GearNameInput({ className }: { className?: string }) {
        return (
            <div className={cn(className)}>
                <Input
                    placeholder='Gear Name'
                    {...register('name', {
                        required: 'Gear name is required',
                    })}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className='text-sm text-red-600'>
                        {errors.name.message}
                    </p>
                )}
            </div>
        );
    }

    function GearWeightInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <div className='flex items-center gap-1'>
                    <Input
                        type='number'
                        placeholder='Weight'
                        {...register('weight', {
                            required: 'Weight is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Weight must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.weight}
                    />
                    <span className='text-sm font-semibold text-primary/70'>
                        oz
                    </span>
                </div>
                {errors.weight && (
                    <p className='text-sm text-red-600'>
                        {errors.weight.message}
                    </p>
                )}
            </div>
        );
    }

    function GearPriceInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <div className='flex items-center gap-1'>
                    <span className='text-sm font-semibold text-primary/70'>
                        $
                    </span>
                    <Input
                        type='number'
                        placeholder='Price'
                        {...register('price', {
                            required: 'Price is required',
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: 'Price must be a positive number',
                            },
                        })}
                        aria-invalid={!!errors.price}
                    />
                </div>
                {errors.price && (
                    <p className='text-sm text-red-600'>
                        {errors.price.message}
                    </p>
                )}
            </div>
        );
    }

    function GearDescriptionInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Textarea
                    placeholder='Description (optional)'
                    {...register('description')}
                />
            </div>
        );
    }

    function GearImageUrlInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input
                    placeholder='Image URL (optional)'
                    {...register('image', {
                        pattern: {
                            value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
                            message: 'Invalid image URL',
                        },
                    })}
                    aria-invalid={!!errors.image}
                />
                {errors.image && (
                    <p className='text-sm text-red-600'>
                        {errors.image.message}
                    </p>
                )}
            </div>
        );
    }

    function GearBrandInput({ className }: { className?: string }) {
        return (
            <div className={className}>
                <Input placeholder='Brand (optional)' {...register('brand')} />
            </div>
        );
    }
}
