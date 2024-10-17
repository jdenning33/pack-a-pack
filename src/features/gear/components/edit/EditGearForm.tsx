import React, { MouseEventHandler } from 'react';
import {
    useForm,
    useWatch,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Gear } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useAuth } from '@/features/auth/useAuth';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';

export interface GearFormValues {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
}

const EditGearContext = React.createContext<{
    gear?: Gear;
    control: Control<GearFormValues, unknown>;
    register: UseFormRegister<GearFormValues>;
    errors: FieldErrors<GearFormValues>;
    handleSubmit: (
        onSubmit: (data: GearFormValues) => Promise<void>
    ) => MouseEventHandler<HTMLButtonElement> | undefined;
    onSubmitSave: (data: GearFormValues) => Promise<void>;
    onSubmitSaveAsNew: (data: GearFormValues) => Promise<void>;
    onCancel: (() => void) | undefined;
} | null>(null);

function useEditGearForm() {
    const context = React.useContext(EditGearContext);
    if (!context) {
        throw new Error(
            'EditGearForm components must be used within a EditGearFormProvider'
        );
    }
    return context;
}

export function EditGearForm({
    gear,
    afterSave,
    onCancel,
    children,
}: {
    gear?: Gear;
    afterSave?: (gear: Gear) => void;
    onCancel?: () => void;
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const { addGear, updateGear } = useAppMutations();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
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

    async function onSubmitSave(data: GearFormValues) {
        onSubmit(data, false);
    }

    async function onSubmitSaveAsNew(data: GearFormValues) {
        onSubmit(data, true);
    }

    async function onSubmit(data: GearFormValues, saveAs: boolean) {
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
        afterSave?.({ ...newGear, id });
        //reset the form
        reset();
    }

    const provider = {
        gear,
        control,
        register,
        errors,
        handleSubmit,
        onSubmitSave,
        onSubmitSaveAsNew,
        onCancel,
    };

    return (
        <EditGearContext.Provider value={provider}>
            <form onSubmit={handleSubmit(onSubmitSave)}>{children}</form>
        </EditGearContext.Provider>
    );
}

export function GearImage() {
    const { control, gear } = useEditGearForm();
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

export function GearNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
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
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}

export function GearWeightInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
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
                <p className='text-sm text-red-600'>{errors.weight.message}</p>
            )}
        </div>
    );
}

export function GearPriceInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <div className='flex items-center gap-1'>
                <span className='text-sm font-semibold text-primary/70'>$</span>
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
                <p className='text-sm text-red-600'>{errors.price.message}</p>
            )}
        </div>
    );
}

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

export function GearImageUrlInput({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
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
                <p className='text-sm text-red-600'>{errors.image.message}</p>
            )}
        </div>
    );
}

export function GearBrandInput({ className }: { className?: string }) {
    const { register } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <Input placeholder='Brand (optional)' {...register('brand')} />
        </div>
    );
}

export function GearSaveButton() {
    const {} = useEditGearForm();
    return <Button type='submit'>Save</Button>;
}

export function GearSaveAsNewButton() {
    const { handleSubmit, onSubmitSaveAsNew } = useEditGearForm();
    return (
        <Button
            type='button'
            variant={'outline'}
            onClick={handleSubmit(onSubmitSaveAsNew)}
        >
            Save As New
        </Button>
    );
}

export function GearCancelButton() {
    const { onCancel } = useEditGearForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
