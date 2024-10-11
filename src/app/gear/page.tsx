'use client';
import { AddGearButton } from '@/features/gear/components/AddGearButton';
import { GearSearchBar } from '@/features/gear/components/GearSearchBar';
import { GearList } from '@/features/gear/components/GearList';
import { ZustandGearProvider } from '@/features/gear/ZustandGearProvider';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <ZustandGearProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Your Gear</h1>
                        <AddGearButton />
                    </div>
                    <div>
                        <GearSearchBar className='mb-6' />
                        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
                            <GearList gearClassName='break-inside-avoid' />
                        </div>
                    </div>
                </ZustandGearProvider>
            </div>
        </main>
    );
}
