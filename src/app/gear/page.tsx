'use client';
import { AddGearButton } from '@/features/gear/components/AddGearButton';
import {
    GearModal,
    GearModalTrigger,
} from '@/features/gear/components/GearModal';
import { GearDetailCard } from '@/features/gear/components/GearDetailCard';
import {
    GearQuickOptionsMenu,
    GearEditOption,
    GearOpenModalOption,
    GearDeleteOption,
} from '@/features/gear/components/GearQuickOptionsMenu';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { GearSearchBar } from '@/features/gear-search/components/GearSearchBar';
import {
    GearSearchProvider,
    useGearSearch,
} from '@/features/gear-search/GearSearchProvider';
import { GearProvider } from '@/features/gear/GearProvider';

export default function GearPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Gear</h1>
                    <GearProvider closeModalOnSave={false}>
                        <AddGearButton />
                        <GearModal />
                    </GearProvider>
                </div>
                <div>
                    <GearSearchProvider>
                        <GearSearchBar className='mb-6' />
                        <GearDetailsCardList />
                    </GearSearchProvider>
                </div>
            </div>
        </main>
    );
}

function GearDetailsCardList() {
    const { gear } = useGearSearch();
    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
            {gear.map((gear) => (
                <GearProvider key={gear.id} gear={gear} useModal={true}>
                    <GearQuickOptionsMenu>
                        <GearOpenModalOption />
                        <GearEditOption />
                        <DropdownMenuSeparator />
                        <GearDeleteOption />
                    </GearQuickOptionsMenu>
                    <GearModalTrigger>
                        <GearDetailCard />
                    </GearModalTrigger>
                    <GearModal />
                </GearProvider>
            ))}
        </div>
    );
}
