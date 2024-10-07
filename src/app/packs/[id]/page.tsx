'use client';
import { PackContents } from '@/features/pack/components/pack/PackContents';
import { PackProvider } from '@/features/pack/hooks/usePack';
import { PackNavigationProvider } from '@/features/pack/hooks/usePackNavigation';
import { useParams } from 'next/navigation';

export default function PackPage() {
    let { id } = useParams();
    return (
        <PackProvider packId={id as string}>
            <PackNavigationProvider>
                <div className='flex flex-col'>
                    <PackContents />
                </div>
            </PackNavigationProvider>
        </PackProvider>
    );
}
