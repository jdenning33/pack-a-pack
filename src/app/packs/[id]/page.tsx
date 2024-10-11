'use client';
import { PackContents } from '@/features/pack/components/pack/PackContents';
import { SupabasePackProvider } from '@/features/pack/hooks/SupabasePackProvider';
import { PackNavigationProvider } from '@/features/pack/hooks/usePackNavigation';
import { useParams } from 'next/navigation';

export default function PackPage() {
    const { id } = useParams();
    return (
        <SupabasePackProvider packId={id as string}>
            <PackNavigationProvider>
                <div className='flex flex-col'>
                    <PackContents />
                </div>
            </PackNavigationProvider>
        </SupabasePackProvider>
    );
}
