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
import { usePacks } from '../../pack-search/usePackSearch';
import { PackSummary } from '@/lib/appTypes';
import Link from 'next/link';

export function PackQuickOptionsMenuButton({
    pack,
    className,
    onEditRequested,
}: {
    pack: PackSummary;
    className?: string;
    onEditRequested?: () => void;
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
                {onEditRequested && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditRequested();
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                )}
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
