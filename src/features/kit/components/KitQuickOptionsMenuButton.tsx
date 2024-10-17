import React from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Settings } from 'lucide-react';
import { useKitContext } from '../useKitContext';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';

export function KitQuickOptionsMenuButton({
    className,
}: {
    className?: string;
}) {
    const { deleteKit } = useAppMutations();
    const { kit, setIsEditing, setIsModalOpen, isReadOnly } = useKitContext();

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
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                    Details
                </DropdownMenuItem>
                {!isReadOnly && (
                    <>
                        <DropdownMenuItem
                            onClick={(_) => {
                                setIsModalOpen(true);
                                setIsEditing(true);
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteKit(kit);
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
