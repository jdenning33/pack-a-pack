import React from 'react';
import { cn } from '@/lib/utils';
import { usePack } from '../../hooks/usePack';
import { Kit } from '@/lib/appTypes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Settings } from 'lucide-react';

export function KitQuickOptionsMenuButton({
    kit,
    className,
}: {
    kit: Kit;
    className?: string;
}) {
    const { deleteKit } = usePack();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='sm' className={cn('', className)}>
                    <Settings size={12} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuItem>Details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteKit(kit);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
