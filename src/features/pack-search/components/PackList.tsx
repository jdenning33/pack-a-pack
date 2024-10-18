import Link from 'next/link';
import { usePacks } from '../usePackSearch';
import { PackCard } from '../../pack/components/card/PackCard';
import { ReactElement } from 'react';
import { PackProvider } from '@/features/pack/PackProvider';
import { PackModal } from '@/features/pack/components/modal/PackModal';
import {
    PackQuickOptionsMenuButton,
    PackGoToDetailsPageOption,
    PackEditInModalOption,
    PackDeleteOption,
} from '@/features/pack/components/card/PackQuickOptionsMenuButton';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

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
                    <PackProvider packId={pack.id}>
                        <PackModal>
                            <PackCard pack={pack} className={packClassName}>
                                <PackQuickOptionsMenuButton>
                                    <PackGoToDetailsPageOption />
                                    <PackEditInModalOption />
                                    <DropdownMenuSeparator />
                                    <PackDeleteOption />
                                </PackQuickOptionsMenuButton>
                            </PackCard>
                        </PackModal>
                    </PackProvider>
                </Link>
            ))}
        </>
    );
};
