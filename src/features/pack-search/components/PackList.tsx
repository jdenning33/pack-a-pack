import Link from 'next/link';
import { usePacks } from '../usePackSearch';
import { PackCard } from '../../pack/components/PackCard';
import { ReactElement } from 'react';
import { PackProvider } from '@/features/pack/PackProvider';

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
                        <PackCard
                            key={pack.id}
                            pack={pack}
                            className={packClassName}
                        />
                    </PackProvider>
                </Link>
            ))}
        </>
    );
};
