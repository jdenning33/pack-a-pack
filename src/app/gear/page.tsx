'use client';
import { GearSearchBar } from '@/features/gear/components/search/GearSearchBar';
import {
    SupabaseGearProvider,
    useGear,
} from '@/features/gear/SupabaseGearProvider';
import { AddGearButton } from '@/features/gear/components/details/AddGearButton';
import { GearModal } from '@/features/gear/components/details/GearModal';
import { GearDetailCard } from '@/features/gear/components/details/GearDetailCard';
import {
    GearQuickOptionsMenu,
    GearEditOption,
    GearOpenModalOption,
    GearDeleteOption,
} from '@/features/gear/components/details/GearQuickOptionsMenu';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { GearDetails } from '@/features/gear/components/details/GearDetails';

export default function GearPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <SupabaseGearProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Gear</h1>
                        <GearDetails closeModalOnSave={false}>
                            <AddGearButton />
                            <GearModal />
                        </GearDetails>
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
                // <GearModal gear={gear} key={gear.id}>
                //     <div>
                <GearDetails key={gear.id} gear={gear} useModal={true}>
                    <GearQuickOptionsMenu>
                        <GearOpenModalOption />
                        <GearEditOption />
                        <DropdownMenuSeparator />
                        <GearDeleteOption />
                    </GearQuickOptionsMenu>
                    <GearDetailCard />
                    <GearModal />
                </GearDetails>
                //     </div>
                // </GearModal>
            ))}
        </div>
    );
}
