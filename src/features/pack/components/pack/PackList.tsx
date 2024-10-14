import Link from 'next/link';
import { usePacks } from '../../hooks/usePacks';
import { PackCard } from './PackCard';
import { ReactElement } from 'react';

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
                    <PackCard
                        key={pack.id}
                        pack={pack}
                        className={packClassName}
                    />
                </Link>
            ))}
        </>
    );
};
