'use client';
import { PackList } from '@/features/pack/components/pack/PackList';

export default function Home() {
    return (
        <main className='flex flex-col gap-8'>
            <div className='z-10 flex flex-col'>
                <PackList />
            </div>
        </main>
    );
}
