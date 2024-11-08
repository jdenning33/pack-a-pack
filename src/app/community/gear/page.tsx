'use client';
import { GearDetailCard } from '@/features/gear/card/GearDetailCard';
import { GearQuickOptionsMenu } from '@/features/gear/quick-options/GearQuickOptionsMenu';
import { GearDeleteOption } from '@/features/gear/quick-options/GearDeleteOption';
import { GearOpenModalOption } from '@/features/gear/quick-options/GearOpenModalOption';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { GearSearchBar } from '@/features/gear/search/filters/GearSearchBar';
import {
    GearSearchProvider,
    useGearSearch,
} from '@/features/gear/search/GearSearchProvider';
import { GearProvider } from '@/features/gear/GearProvider';
import { GearAddToUserGearOption } from '@/features/gear/quick-options/GearAddToUserGearOption';
import { GearRemoveFromUserGearOption } from '@/features/gear/quick-options/GearRemoveFromMyGearOption';
import { GearModal } from '@/features/gear/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/modal/GearModalTrigger';

export default function GearPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Find Gear</h1>
                </div>
                <div>
                    <GearSearchProvider
                        defaultSearchParams={{
                            gearType: 'public',
                        }}
                    >
                        <div className='flex justify-between'>
                            <GearSearchBar className='mb-6 flex-1' />{' '}
                        </div>
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
                <GearProvider key={gear.id} gear={gear}>
                    <div className='h-full relative group'>
                        <GearModal>
                            <GearQuickOptionsMenu className='bg-background/90 p-2'>
                                <GearOpenModalOption />
                                <GearAddToUserGearOption />
                                <GearRemoveFromUserGearOption />
                                <DropdownMenuSeparator />
                                <GearDeleteOption />
                            </GearQuickOptionsMenu>
                            <GearModalTrigger className='h-full'>
                                <GearDetailCard className='h-full' />
                            </GearModalTrigger>
                        </GearModal>
                    </div>
                </GearProvider>
            ))}
        </div>
    );
}
