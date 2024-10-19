import Link from 'next/link';
import { usePacks } from '../usePackSearch';
import { PackCard } from '../../pack/components/card/PackCard';
import { ReactElement } from 'react';
import { PackModal } from '@/features/pack/components/modal/PackModal';
import { PackQuickOptionsMenu } from '@/features/pack/components/quick-options/PackQuickOptionsMenuButton';
import { PackDeleteOption } from '@/features/pack/components/quick-options/PackDeleteOption';
import { PackEditInModalOption } from '@/features/pack/components/quick-options/PackEditInModalOption';
import { PackGoToDetailsPageOption } from '@/features/pack/components/quick-options/PackGoToDetailsPageOption';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ClonePackModal } from '@/features/pack/components/clone-modal/ClonePackModal';
import { LoadedPackProvider } from '@/features/pack/LoadedPackProvider';

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
                <Link
                    key={pack.id}
                    href={`/packs/${pack.id}`}
                    className='hover:scale-[102%] transition-all'
                >
                    <LoadedPackProvider pack={{ ...pack, kits: [] }}>
                        <PackModal>
                            <ClonePackModal>
                                <PackCard className={packClassName}>
                                    <PackQuickOptionsMenu>
                                        <PackGoToDetailsPageOption />
                                        <PackEditInModalOption />
                                        <DropdownMenuSeparator />
                                        <PackDeleteOption />
                                    </PackQuickOptionsMenu>
                                </PackCard>
                            </ClonePackModal>
                        </PackModal>
                    </LoadedPackProvider>
                </Link>
            ))}
        </>
    );
};
