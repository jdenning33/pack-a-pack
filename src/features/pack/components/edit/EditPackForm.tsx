import React from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { PackSummary } from '@/lib/appTypes';
import { Optional } from '@/lib/utils';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { usePack } from '../../usePack';

export interface PackFormValues {
    name: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
    attributes: Record<string, string | number>;
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

export function useEditPackForm() {
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
            attributes: pack?.attributes || {},
        },
    });

    async function onSubmit(data: PackFormValues) {
        if (!user) {
            toast.error('Uh oh! You must be logged in to save a pack');
            return;
        }

        console.log('onSubmit pack data', data);

        const newPack: Optional<PackSummary, 'id'> = {
            ...pack,
            ...data,
            userId: user.id,
            isDeleted: false,
            isTripCompleted: false,
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

export function PackSaveButton() {
    const { pack } = useEditPackForm();
    return <Button type='submit'>{pack?.id ? 'Save' : 'Create'} Pack</Button>;
}

export function PackCancelButton() {
    const { onCancel } = useEditPackForm();
    return (
        <Button variant='ghost' type='button' onClick={() => onCancel?.()}>
            Cancel
        </Button>
    );
}
