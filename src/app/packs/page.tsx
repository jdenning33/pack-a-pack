'use client';
import { PackSearchBar } from '@/features/pack-search/components/PacksSearchBar';
import { PackSearchProvider } from '@/features/pack-search/PackSearchProvider';
import { PackList } from '@/features/pack-search/components/PackList';
import { StandardAddPackButton } from '@/features/pack/components/StandardAddPackButton';
import { cn } from '@/lib/utils';

export default function PacksPage() {
    return (
        <main className='container flex flex-col gap-8 m-auto'>
            <PackSearchProvider>
                <div className='mx-auto p-4 w-full flex flex-col'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Packs</h1>
                        <StandardAddPackButton />
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
