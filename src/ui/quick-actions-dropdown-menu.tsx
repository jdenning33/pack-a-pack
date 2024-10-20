import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Settings } from 'lucide-react';

export function QuickActionMenu({
    useStaticPosition = false,
    className,
    children,
}: {
    useStaticPosition?: boolean;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='sm'
                    className={cn(
                        useStaticPosition ? '' : 'absolute top-1 right-1 z-10',
                        className
                    )}
                >
                    <Settings size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const QuickActionMenuOption: React.FC<{
    onClick?: () => void;
    icon?: React.ReactNode;
    name: string;
}> = ({ onClick, icon, name }) => {
    return (
        <DropdownMenuItem
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            <div className='w-6'>{icon || ''}</div>
            {name}
        </DropdownMenuItem>
    );
};
