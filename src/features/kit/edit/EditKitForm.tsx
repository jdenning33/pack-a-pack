import React, { MouseEventHandler } from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { Kit } from '@/lib/appTypes';
import { Optional } from '@/lib/utils';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useKitContext } from '../useKitContext';

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

export function useEditKitForm() {
    const context = React.useContext(EditKitContext);
    if (!context) {
        throw new Error(
            'EditKitForm components must be used within a EditKitFormProvider'
        );
    }
    return context;
}

export function EditKitForm({
    onFinished,
    children,
    className,
}: {
    onFinished?: (kit?: Kit) => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { user } = useAuth();
    const { addKit, updateKit } = useAppMutations();
    const { kit, packId, afterKitUpdated } = useKitContext();

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
            packId: packId,
            name: data.name,
            description: data.description,
            isDeleted: false,
            items: kit?.items || [],
        };
        let id: string;
        if (newKit.id) id = await updateKit(newKit as Kit);
        else id = await addKit(newKit as Omit<Kit, 'id'>);
        afterKitUpdated?.({ ...newKit, id });
        reset();
        onFinished?.({ ...newKit, id });
    }

    function onCancel() {
        onFinished?.();
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

export function KitSaveButton() {
    const {} = useEditKitForm();
    return (
        <Button type='submit' onClick={(e) => e.stopPropagation()}>
            Save
        </Button>
    );
}

export function KitCancelButton() {
    const { onCancel } = useEditKitForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
