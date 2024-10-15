'use client';
import { GearSearchBar } from '@/features/gear/components/search/GearSearchBar';
import { SupabaseGearProvider } from '@/features/gear/SupabaseGearProvider';
import { GearDetails } from '../../features/gear/components/details/GearContext';
import { NoGearSelectedHolder } from '@/features/gear/components/details/NoGearSelectedHolder';
import { GearModal } from '@/features/gear/components/details/GearModal';
import {
    GearDeleteOption,
    GearEditOption,
    GearOpenModalOption,
} from '@/features/gear/components/details/GearQuickOptionsMenu';
import { GearQuickOptionsMenu } from '@/features/gear/components/details/GearQuickOptionsMenu';
import { Gear } from '@/lib/appTypes';
import { GearDetailCard } from '@/features/gear/components/details/GearDetailCard';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <SupabaseGearProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Gear</h1>
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
    const gear: Gear = {
        id: '1',
        name: 'Test Gear',
        description: 'This is a test gear item',
        weight: 1,
        brand: 'DIY',
        image: '',
        price: 350,
        isPublic: false,
        purchaseLinks: [],
        createdById: '',
        isDeleted: false,
    };
    return (
        <div className=''>
            {/* <GearList gearClassName='break-inside-avoid' /> */}
            <GearDetails className='max-w-[35rem]' gear={gear} useModal={false}>
                <GearQuickOptionsMenu>
                    <GearEditOption />
                    <GearOpenModalOption />
                    <DropdownMenuSeparator />
                    <GearDeleteOption />
                </GearQuickOptionsMenu>
                <GearDetailCard />
                <NoGearSelectedHolder />
                <GearModal />
            </GearDetails>
        </div>
    );
}
