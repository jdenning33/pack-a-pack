'use client';
import { AddPackButton } from '@/features/pack/components/pack/AddPackButton';
import { PackList } from '@/features/pack/components/pack/PackList';
import { PackSearchBar } from '@/features/pack/components/pack/PacksSearchBar';
import { SupabasePacksProvider } from '@/features/pack/hooks/SupabasePacksProvider';

export default function PacksPage() {
    return (
        <main className='container flex flex-col gap-8 m-auto'>
            <SupabasePacksProvider>
                <div className='mx-auto p-4 w-full flex flex-col'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Packs</h1>
                        <AddPackButton size='sm' variant='outline' />
                    </div>
                    <PackSearchBar className='mb-6' />
                    <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]'>
                        <PackList packClassName='break-inside-avoid' />
                    </div>
                </div>
            </SupabasePacksProvider>
        </main>
    );
}
