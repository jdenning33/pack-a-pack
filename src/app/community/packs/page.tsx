'use client';
import { PackSearchBar } from '@/features/pack/search/PacksSearchBar';
import { PackSearchProvider } from '@/features/pack/search/PackSearchProvider';
import { cn } from '@/lib/utils';
import { PackList } from '@/features/pack/search/PackList';

export default function PacksPage() {
    return (
        <main className='container flex flex-col gap-8 m-auto'>
            <PackSearchProvider>
                <div className='mx-auto p-4 w-full flex flex-col'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Community Packs</h1>
                    </div>
                    <PackSearchBar className='mb-6' />
                    <div
                        className={cn(
                            'grid gap-4 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]'
                        )}
                    >
                        <PackList packClassName='h-full overflow-hidden break-inside-avoid' />
                    </div>
                </div>
            </PackSearchProvider>
        </main>
    );
}
