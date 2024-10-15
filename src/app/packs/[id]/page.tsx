'use client';
import { PackContents } from '@/features/pack/components/pack/PackContents';
import { SupabasePackProvider } from '@/features/pack/hooks/SupabasePackProvider';
import { useParams } from 'next/navigation';

export default function PackPage() {
    const { id } = useParams();
    return (
        <SupabasePackProvider packId={id as string}>
            <div className='flex flex-col'>
                <PackContents />
            </div>
        </SupabasePackProvider>
    );
}
