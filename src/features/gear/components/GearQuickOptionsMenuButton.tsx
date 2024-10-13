import React from 'react';
import { cn } from '@/lib/utils';
import { Gear } from '@/lib/appTypes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Settings } from 'lucide-react';
import { useGear } from '../useGear';

export function GearQuickOptionsMenuButton({
    gear,
    className,
}: {
    gear: Gear;
    className?: string;
}) {
    const { removeGear } = useGear();

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
                        removeGear(gear);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
