import React from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePack } from '../../usePack';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';

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
