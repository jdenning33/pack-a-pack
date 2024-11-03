import React from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Optional } from '@/lib/utils';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useGearBin } from '../../useGearBin';
import { UserGearBin } from '@/lib/appTypes';

export interface GearBinFormValues {
    name: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
    attributes: Record<string, string | number>;
}

type GearBinFormContract = {
    gearBin?: UserGearBin;
    control: Control<GearBinFormValues, unknown>;
    register: UseFormRegister<GearBinFormValues>;
    errors: FieldErrors<GearBinFormValues>;
    handleSubmit: (
        onSubmit: (data: GearBinFormValues) => Promise<void>
    ) => React.FormEventHandler<HTMLFormElement>;
    onSubmit: (data: GearBinFormValues) => Promise<void>;
    onCancel: (() => void) | undefined;
};

const EditGearBinContext = React.createContext<GearBinFormContract | null>(
    null
);

export function useEditGearBinForm() {
    const context = React.useContext(EditGearBinContext);
    if (!context) {
        throw new Error(
            'EditGearBinForm components must be used within an EditGearBinFormProvider'
        );
    }
    return context;
}

export function EditGearBinForm({
    onFinished,
    children,
    className,
}: {
    onFinished?: (gearBinId?: string) => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { user } = useAuth();
    const { upsertUserGearBin } = useAppMutations();
    const { gearBin, afterGearBinUpdated } = useGearBin();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GearBinFormValues>({
        defaultValues: {
            name: gearBin?.name || '',
            description: gearBin?.description || '',
        },
    });

    async function onSubmit(data: GearBinFormValues) {
        if (!user) {
            toast.error('Uh oh! You must be logged in to save a gearBin');
            return;
        }

        console.log('onSubmit gearBin data', data);

        const newGearBin: Optional<UserGearBin, 'id'> = {
            ...gearBin,
            ...data,
            userId: user.id,
            order: gearBin?.order || 0,
            gear: gearBin?.gear || [],
            isDeleted: false,
        };

        const upsertId = await upsertUserGearBin(newGearBin);
        afterGearBinUpdated?.({ ...newGearBin, id: upsertId, gear: [] });
        reset();
        onFinished?.(upsertId);
    }

    function onCancel() {
        onFinished?.();
    }

    const provider: GearBinFormContract = {
        gearBin,
        control,
        register,
        errors,
        handleSubmit,
        onSubmit,
        onCancel,
    };

    return (
        <EditGearBinContext.Provider value={provider}>
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </EditGearBinContext.Provider>
    );
}
