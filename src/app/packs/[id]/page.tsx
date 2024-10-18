'use client';
import { PackProvider } from '@/features/pack/PackProvider';
import { PackContents } from '@/features/pack/components/PackContents';
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
