import React from 'react';
import { Gear, WeightType } from '@/lib/appTypes';
import { useAuth } from '@/features/auth/useAuth';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { AuthGuard } from '@/features/auth/AuthGuard';
import { createIq7FormContext, Iq7Form } from '@/ui/iq7-form';

export type GearFormData = {
    name: string;
    description?: string;
    brand?: string;
    image?: string;
    weight: number;
    price: number;
    type: string;
    weightType: WeightType;
};

// Define the extra context type for gear form
type GearFormExtraContext = {
    gear?: Gear;
    onSubmitAsNew: (data: GearFormData) => Promise<void>;
};

// Create context with the extra values
export const [GearFormContext, useEditGearForm] = createIq7FormContext<
    GearFormData,
    GearFormExtraContext
>();

export function EditGearForm({
    gear,
    afterSave,
    onCancel,
    children,
    className,
}: {
    gear?: Gear;
    afterSave?: (gear: Gear) => void;
    onCancel?: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    const { user } = useAuth();
    const { addGear, updateGear } = useAppMutations();

    async function handleSubmit(data: GearFormData) {
        onSubmit(data, false);
    }
    async function handleSubmitAsNew(data: GearFormData) {
        onSubmit(data, true);
    }

    async function onSubmit(data: GearFormData, saveAs: boolean) {
        let newGear = {
            ...gear,
            name: data.name,
            description: data.description || '',
            brand: data.brand || '',
            image: data.image || '',
            weight: data.weight,
            price: data.price,
            type: data.type,
            weightType: data.weightType,
            isPublic: gear?.isPublic || false,
            isDeleted: gear?.isDeleted || false,
            purchaseLinks: gear?.purchaseLinks || [],
            createdById: gear?.createdById || user?.id || '',
            order: gear?.order || Math.random() * 1000,
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
    }

    const extraContext: GearFormExtraContext = {
        gear,
        onSubmitAsNew: handleSubmitAsNew,
    };

    return (
        <AuthGuard>
            <Iq7Form
                context={GearFormContext}
                defaultValues={gear}
                onSubmit={handleSubmit}
                onFinished={onCancel}
                className={className}
                extraContext={extraContext}
            >
                {children}
            </Iq7Form>
        </AuthGuard>
    );
}
