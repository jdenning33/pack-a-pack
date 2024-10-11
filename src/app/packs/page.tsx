'use client';
import { AddPackButton } from '@/features/pack/components/pack/AddPackButton';
import { PackList } from '@/features/pack/components/pack/PackList';
import { SupabasePacksProvider } from '@/features/pack/hooks/SupabasePacksProvider';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8'>
            <SupabasePacksProvider>
                <div className='mx-auto p-4 w-full flex flex-col'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Your Packs</h1>
                        <AddPackButton />
                    </div>
                    <div className='columns-[300px]'>
                        <PackList packClassName='break-inside-avoid' />
                    </div>
                </div>
            </SupabasePacksProvider>
        </main>
    );
}
