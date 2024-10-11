'use client';
import { PackContents } from '@/features/pack/components/pack/PackContents';
import { ZustandPackProvider } from '@/features/pack/hooks/ZustandPackProvider';
import { PackNavigationProvider } from '@/features/pack/hooks/usePackNavigation';
import { useParams } from 'next/navigation';

export default function PackPage() {
    const { id } = useParams();
    return (
        <ZustandPackProvider packId={id as string}>
            <PackNavigationProvider>
                <div className='flex flex-col'>
                    <PackContents />
                </div>
            </PackNavigationProvider>
        </ZustandPackProvider>
    );
}
