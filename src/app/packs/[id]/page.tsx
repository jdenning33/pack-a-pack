'use client';
import { PackContents } from '@/features/pack/components/PackContents';
import { PackProvider } from '@/features/pack/hooks/PackProvider';
import { useParams } from 'next/navigation';

export default function PackPage() {
    const { id } = useParams();
    return (
        <PackProvider packId={id as string}>
            <div className='flex flex-col'>
                <PackContents />
            </div>
        </PackProvider>
    );
}
