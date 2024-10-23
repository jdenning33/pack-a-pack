import React from 'react';
import { cn } from '@/lib/utils';
import { EditPackForm, PackSaveButton, PackCancelButton } from './EditPackForm';
import { PackNameInput } from './PackNameInput';
import { PackIsPublicInput } from './PackIsPublicInput';
import { PackDescriptionInput } from './PackDescriptionInput';

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
        <div className={cn('flex gap-4', className)}>
            <div className='space-y-4 flex-1'>
                <PackNameInput />
                <PackDescriptionInput />
                <PackIsPublicInput />
            </div>
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
