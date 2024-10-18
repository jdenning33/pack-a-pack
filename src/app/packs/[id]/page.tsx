'use client';
import { StandardAddKitButton } from '@/features/kit/components/StandardAddKitButton';
import { PackProvider } from '@/features/pack/PackProvider';
import { PackKitsGrid } from '@/features/pack/components/PackKitsGrid';
import { usePack } from '@/features/pack/usePack';
import { useParams } from 'next/navigation';

export default function PackPage() {
    const { id } = useParams();
    return (
        <PackProvider packId={id as string}>
            <div className='flex flex-col p-4 container m-auto'>
                <PackContents />
            </div>
        </PackProvider>
    );
}

export function PackContents() {
    const { pack } = usePack();

    if (!pack) return <div>Pack not found!</div>;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-end'>
                <h1 className='text-2xl font-bold'>{pack.name}</h1>
                <StandardAddKitButton />
            </div>
            <PackNoKitsMessage />
            <PackKitsGrid />
        </div>
    );
}

function PackNoKitsMessage({ className }: { className?: string }) {
    const { pack, isReadOnly } = usePack();
    if (pack?.kits.length) return null;
    return (
        <div className={className}>
            Looks like this pack is empty.
            {!isReadOnly && ' Add a kit to get started!'}
        </div>
    );
}
