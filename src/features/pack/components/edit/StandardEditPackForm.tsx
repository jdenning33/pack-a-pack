import React from 'react';
import { cn } from '@/lib/utils';
import {
    EditPackForm,
    PackNameInput,
    PackDescriptionInput,
    PackIsPublicInput,
    PackSaveButton,
    PackCancelButton,
} from './EditPackForm';

export function StandardEditPackForm(
    props: Omit<React.ComponentProps<typeof EditPackForm>, 'children'>
) {
    return (
        <EditPackForm {...props}>
            <StandardEditPackInputs />
            <br />
            <StandardEditPackButtons />
        </EditPackForm>
    );
}

export function StandardEditPackInputs({ className }: { className?: string }) {
    return (
        <div className={cn('space-y-4', className)}>
            <PackNameInput />
            <PackDescriptionInput />
            <PackIsPublicInput />
        </div>
    );
}

export function StandardEditPackButtons({ className }: { className?: string }) {
    return (
        <div className={cn('flex gap-4', className)}>
            <PackSaveButton />
            <PackCancelButton />
        </div>
    );
}
