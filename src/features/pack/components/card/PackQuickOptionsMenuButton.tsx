import React from 'react';
import { Edit, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { usePack } from '../../usePack';
import {
    QuickActionMenu,
    QuickActionMenuOption,
} from '@/ui/quick-actions-dropdown-menu';
import { usePackModalContext } from '../modal/PackModal';

export function PackQuickOptionsMenuButton({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return <QuickActionMenu className={className}>{children}</QuickActionMenu>;
}

export function PackGoToDetailsPageOption() {
    const { pack } = usePack();
    if (!pack) return null;
    return (
        <Link key={pack.id} href={`/packs/${pack.id}`}>
            <QuickActionMenuOption
                name='Details'
                icon={<ExternalLink size={14} />}
            />
        </Link>
    );
}

export function PackEditInModalOption() {
    const { isReadOnly } = usePack();
    const { setIsEditing, setIsOpen } = usePackModalContext();
    if (isReadOnly) return null;
    return (
        <QuickActionMenuOption
            onClick={() => {
                setIsOpen(true);
                setIsEditing(true);
            }}
            icon={<Edit size={14} />}
            name='Edit'
        />
    );
}

export function PackDeleteOption() {
    const { pack, isReadOnly } = usePack();
    const { deletePack } = useAppMutations();
    if (isReadOnly || !pack) return null;
    return (
        <QuickActionMenuOption
            onClick={() => deletePack(pack)}
            icon={<Trash2 size={14} />}
            name='Delete'
        />
    );
}
