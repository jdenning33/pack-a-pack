import React, { MouseEventHandler } from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Kit } from '@/lib/appTypes';
import { Optional, cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/useAuth';
import { usePack } from '@/features/pack/hooks/usePack';
import { toast } from 'sonner';

export interface KitFormValues {
    name: string;
    description: string;
}

type KitContract = {
    kit?: Kit;
    control: Control<KitFormValues, unknown>;
    register: UseFormRegister<KitFormValues>;
    errors: FieldErrors<KitFormValues>;
    handleSubmit: (
        onSubmit: (data: KitFormValues) => Promise<void>
    ) => MouseEventHandler<HTMLButtonElement> | undefined;
    onSubmit: (data: KitFormValues) => Promise<void>;
    onCancel: (() => void) | undefined;
};

const EditKitContext = React.createContext<KitContract | null>(null);

function useEditKitForm() {
    const context = React.useContext(EditKitContext);
    if (!context) {
        throw new Error(
            'EditKitForm components must be used within a EditKitFormProvider'
        );
    }
    return context;
}

export function EditKitForm({
    kit,
    afterSave,
    onCancel,
    children,
    className,
}: {
    kit?: Kit;
    afterSave?: (kit: Kit) => void;
    onCancel?: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { user } = useAuth();
    const { pack, addKit, updateKit } = usePack();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<KitFormValues>({
        defaultValues: {
            name: kit?.name || '',
            description: kit?.description || '',
        },
    });

    async function onSubmit(data: KitFormValues) {
        if (!user) {
            toast.error('Uh oh! You must be logged in to save a kit');
            return;
        }

        const newKit: Optional<Kit, 'id'> = {
            ...kit,
            packId: pack.id,
            name: data.name,
            description: data.description,
            isDeleted: false,
            items: kit?.items || [],
        };
        let id: string;
        if (newKit.id) id = await updateKit(newKit as Kit);
        else id = await addKit(newKit as Omit<Kit, 'id'>);
        afterSave?.({ ...newKit, id });
        reset();
    }

    const provider: KitContract = {
        kit,
        control,
        register,
        errors,
        handleSubmit,
        onSubmit,
        onCancel,
    };

    return (
        <EditKitContext.Provider value={provider}>
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </EditKitContext.Provider>
    );
}

export function KitNameInput({ className }: { className?: string }) {
    const { register, errors } = useEditKitForm();
    return (
        <div className={cn(className)}>
            <Input
                placeholder='Kit Name'
                {...register('name', {
                    required: 'Kit name is required',
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && (
                <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
        </div>
    );
}

export function KitDescriptionInput({ className }: { className?: string }) {
    const { register, errors } = useEditKitForm();
    return (
        <div className={className}>
            <Textarea
                placeholder='Description'
                {...register('description', {
                    required: 'Description is required',
                })}
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

export function KitSaveButton() {
    const {} = useEditKitForm();
    return <Button type='submit'>Save</Button>;
}

export function KitCancelButton() {
    const { onCancel } = useEditKitForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
