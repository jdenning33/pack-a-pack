import React, { MouseEventHandler } from 'react';
import {
    useForm,
    Control,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { Button } from '@/ui/button';
import { Gear } from '@/lib/appTypes';
import { useAuth } from '@/features/auth/useAuth';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export interface GearFormValues {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
    type: string;
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

export function useEditGearForm() {
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
            type: gear?.type || '',
        },
    });

    async function onSubmitSave(data: GearFormValues) {
        onSubmit(data, false);
    }

    async function onSubmitSaveAsNew(data: GearFormValues) {
        onSubmit(data, true);
    }

    async function onSubmit(data: GearFormValues, saveAs: boolean) {
        let newGear = {
            ...gear,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
            type: data.type,
            isPublic: gear?.isPublic || false,
            isDeleted: gear?.isDeleted || false,
            purchaseLinks: gear?.purchaseLinks || [],
            createdById: gear?.createdById || user?.id || '',
        };
        if (saveAs) {
            newGear = {
                ...newGear,
                id: undefined,
                createdById: user?.id || '',
            };
        }
        let id;
        if (newGear.id) id = await updateGear(newGear as Gear);
        else id = await addGear(newGear as Omit<Gear, 'id'>);
        afterSave?.({
            ...newGear,
            id,
            createdByUserName: '',
            isOwnedByUser: true,
            isRetiredByUser: false,
        });
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
        <AuthGuard>
            <EditGearContext.Provider value={provider}>
                <form onSubmit={handleSubmit(onSubmitSave)}>{children}</form>
            </EditGearContext.Provider>
        </AuthGuard>
    );
}

export function GearSaveButton() {
    const { gear } = useEditGearForm();
    return (
        <Button
            type='submit'
            disabled={gear?.isPublic}
            disabledTitle='You cannot edit public gear directly, use "Save As New" instead.'
        >
            Save
        </Button>
    );
}

export function GearSaveAsNewButton() {
    const { handleSubmit, onSubmitSaveAsNew } = useEditGearForm();
    return (
        <Button
            type='button'
            variant={'outline'}
            onClick={handleSubmit(onSubmitSaveAsNew)}
            title='This will create a new gear item with these details, leaving the original unchanged.'
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
