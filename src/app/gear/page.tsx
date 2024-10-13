'use client';
import { AddGearButton } from '@/features/gear/components/AddGearButton';
import { GearSearchBar } from '@/features/gear/components/GearSearchBar';
import {
    SupabaseGearProvider,
    useGear,
} from '@/features/gear/SupabaseGearProvider';
import { GearDetailsCard } from '@/features/gear/components/GearDetailsCard';
import { GearModal } from '@/features/gear/components/GearModal';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <SupabaseGearProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Gear</h1>
                        <AddGearButton />
                    </div>
                    <div>
                        <GearSearchBar className='mb-6' />
                        <GearDetailsCardList />
                    </div>
                </SupabaseGearProvider>
            </div>
        </main>
    );
}

function GearDetailsCardList() {
    const { gear } = useGear();
    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
            {/* <GearList gearClassName='break-inside-avoid' /> */}
            {gear.map((gear) => (
                <GearModal gear={gear} key={gear.id}>
                    <div>
                        <GearDetailsCard
                            key={gear.id}
                            gear={gear}
                            allowEdit={false}
                        />
                    </div>
                </GearModal>
            ))}
        </div>
    );
}
