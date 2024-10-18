import React from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Settings } from 'lucide-react';
import { useKitContext } from '../useKitContext';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';

export function KitQuickOptionsMenuButton({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    const { kit } = useKitContext();
    if (!kit) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='sm'
                    className={cn('absolute top-1 right-1', className)}
                >
                    <Settings size={12} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-56'
                align='end'
                onClick={(e) => {
                    e.stopPropagation();
                }}
                forceMount
            >
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function DeleteKitOption() {
    const { kit, isReadOnly } = useKitContext();
    const { deleteKit } = useAppMutations();
    if (!kit || isReadOnly) return null;
    return (
        <DropdownMenuItem
            onClick={(e) => {
                e.stopPropagation();
                deleteKit(kit);
            }}
        >
            Delete
        </DropdownMenuItem>
    );
}
