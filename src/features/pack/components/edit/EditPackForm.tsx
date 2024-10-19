import React from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
    Controller,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { PackSummary } from '@/lib/appTypes';
import { Optional, cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { usePack } from '../../usePack';
import { Checkbox } from '@/ui/checkbox';
import { Label } from '@/ui/label';

export interface PackFormValues {
    name: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
}

type PackFormContract = {
    pack?: PackSummary;
    control: Control<PackFormValues, unknown>;
    register: UseFormRegister<PackFormValues>;
    errors: FieldErrors<PackFormValues>;
    handleSubmit: (
        onSubmit: (data: PackFormValues) => Promise<void>
    ) => React.FormEventHandler<HTMLFormElement>;
    onSubmit: (data: PackFormValues) => Promise<void>;
    onCancel: (() => void) | undefined;
};

const EditPackContext = React.createContext<PackFormContract | null>(null);

function useEditPackForm() {
    const context = React.useContext(EditPackContext);
    if (!context) {
        throw new Error(
            'EditPackForm components must be used within an EditPackFormProvider'
        );
    }
    return context;
}

export function EditPackForm({
    onFinished,
    children,
    className,
}: {
    onFinished?: (packId?: string) => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { user } = useAuth();
    const { upsertPack } = useAppMutations();
    const { pack, afterPackUpdated } = usePack();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PackFormValues>({
        defaultValues: {
            name: pack?.name || '',
            description: pack?.description || '',
            isPublic: pack?.isPublic || false,
            isGearLocker: pack?.isGearLocker || false,
        },
    });

    async function onSubmit(data: PackFormValues) {
        if (!user) {
            toast.error('Uh oh! You must be logged in to save a pack');
            return;
        }

        const newPack: Optional<PackSummary, 'id'> = {
            ...pack,
            ...data,
            userId: user.id,
            isDeleted: false,
        };

        const upsertId = await upsertPack(newPack as PackSummary);
        afterPackUpdated?.({ ...newPack, id: upsertId, kits: [] });
        reset();
        onFinished?.(upsertId);
    }

    function onCancel() {
        onFinished?.();
    }

    const provider: PackFormContract = {
        pack,
        control,
        register,
        errors,
        handleSubmit,
        onSubmit,
        onCancel,
    };

    return (
        <EditPackContext.Provider value={provider}>
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </EditPackContext.Provider>
    );
}

export function PackNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditPackForm();
    return (
        <div className={cn(className)}>
            <Input
                id='name'
                placeholder='Pack Name'
                {...register('name', {
                    required: 'Pack name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}

export function PackDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditPackForm();
    return (
        <div className={className}>
            <Textarea
                id='description'
                placeholder='Description'
                {...register('description')}
                aria-invalid={!!errors.description}
            />
            {errors.description && (
                <p className='text-sm text-red-600'>
                    {errors.description.message}
                </p>
            )}
        </div>
    );
}

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

export function PackSaveButton() {
    const { pack } = useEditPackForm();
    return <Button type='submit'>{pack ? 'Update' : 'Create'} Pack</Button>;
}

export function PackCancelButton() {
    const { onCancel } = useEditPackForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
