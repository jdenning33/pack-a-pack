import React from 'react';
import { cn } from '@/lib/utils';
import { EditKitForm, KitSaveButton, KitCancelButton } from './EditKitForm';
import { KitDescriptionInput } from './KitDescriptionInput';
import { KitNameInput } from './KitNameInput';

export function StandardEditKitForm(
    props: Omit<React.ComponentProps<typeof EditKitForm>, 'children'>
) {
    return (
        <EditKitForm {...props}>
            <StandardEditKitInputs />
            <br />
            <StandardEditKitButtons />
        </EditKitForm>
    );
}

export function StandardEditKitInputs({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            <KitNameInput />
            <KitDescriptionInput />
        </div>
    );
}

export function StandardEditKitButtons({ className }: { className?: string }) {
    return (
        <div className={cn('flex gap-4', className)}>
            <KitSaveButton />
            <KitCancelButton />
        </div>
    );
}
