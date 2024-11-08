import { usePacks } from './usePackSearch';
import { PackCard } from '../card/PackCard';
import { ReactElement } from 'react';
import { PackModal } from '@/features/pack/modal/PackModal';
import { PackQuickOptionsMenu } from '@/features/pack/quick-options/PackQuickOptionsMenuButton';
import { PackDeleteOption } from '@/features/pack/quick-options/PackDeleteOption';
import { PackEditInModalOption } from '@/features/pack/quick-options/PackEditInModalOption';
import { PackGoToDetailsPageOption } from '@/features/pack/quick-options/PackGoToDetailsPageOption';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { LoadedPackProvider } from '@/features/pack/LoadedPackProvider';
import { PackModalTrigger } from '@/features/pack/modal/PackModalTrigger';

// PackList Component
export const PackList = ({
    packClassName,
}: {
    packClassName?: string;
}): ReactElement => {
    const { packs } = usePacks();

    return (
        <>
            {packs.map((pack) => (
                <LoadedPackProvider key={pack.id} pack={{ ...pack, kits: [] }}>
                    <PackModal>
                        <PackModalTrigger>
                            <PackCard className={packClassName}>
                                <PackQuickOptionsMenu>
                                    <PackGoToDetailsPageOption />
                                    <PackEditInModalOption />
                                    <DropdownMenuSeparator />
                                    <PackDeleteOption />
                                </PackQuickOptionsMenu>
                            </PackCard>
                        </PackModalTrigger>
                    </PackModal>
                </LoadedPackProvider>
            ))}
        </>
    );
};
