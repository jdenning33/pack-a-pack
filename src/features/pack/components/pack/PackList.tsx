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
                <PackCard key={pack.id} pack={pack} className={packClassName} />
            ))}
        </>
    );
};
