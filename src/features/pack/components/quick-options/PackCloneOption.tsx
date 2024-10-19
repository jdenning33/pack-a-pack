import React from 'react';
import { Copy } from 'lucide-react';
import { usePack } from '../../usePack';
import { QuickActionMenuOption } from '@/ui/quick-actions-dropdown-menu';
import { useClonePackModalContext } from '../clone-modal/ClonePackModal';

export function PackCloneOption() {
    const { pack } = usePack();
    const { setIsOpen } = useClonePackModalContext();
    if (!pack) return null;
    return (
        <QuickActionMenuOption
            onClick={() => setIsOpen(true)}
            icon={<Copy size={14} />}
            name='Clone'
        />
    );
}
