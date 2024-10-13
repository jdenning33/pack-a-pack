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
import { usePacks } from '../../hooks/usePacks';
import { PackSummary } from '@/lib/appTypes';
import Link from 'next/link';

export function PackQuickOptionsMenuButton({
    pack,
    className,
}: {
    pack: PackSummary;
    className?: string;
}) {
    const { deletePack } = usePacks();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='sm' className={cn('', className)}>
                    <Settings size={12} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <Link key={pack.id} href={`/packs/${pack.id}`}>
                    <DropdownMenuItem>Details</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation();
                        deletePack(pack);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
