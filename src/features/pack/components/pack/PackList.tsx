import { AddPackButton } from './AddPackButton';
import Link from 'next/link';
import { usePacks } from '../../hooks/usePacks';
import { PackCard } from './PackCard';
import { ReactElement } from 'react';

// PackList Component
export const PackList = (): ReactElement => {
    const { packs, deletePack } = usePacks();

    return (
        <>
            {packs.map((pack) => (
                <PackCard pack={pack} />
            ))}
        </>
    );
};
