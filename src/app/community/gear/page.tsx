'use client';
import { AddGearButton } from '@/features/gear/components/AddGearButton';
import { GearDetailCard } from '@/features/gear/components/card/GearDetailCard';
import { GearQuickOptionsMenu } from '@/features/gear/components/quick-options/GearQuickOptionsMenu';
import { GearEditInModalOption } from '@/features/gear/components/quick-options/GearEditInModalOption';
import { GearDeleteOption } from '@/features/gear/components/quick-options/GearDeleteOption';
import { GearOpenModalOption } from '@/features/gear/components/quick-options/GearOpenModalOption';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { GearSearchBar } from '@/features/gear-search/components/GearSearchBar';
import {
    GearSearchProvider,
    useGearSearch,
} from '@/features/gear-search/GearSearchProvider';
import { GearProvider } from '@/features/gear/GearProvider';
import { useAuth } from '@/features/auth/useAuth';
import { GearAddToUserGearOption } from '@/features/gear/components/quick-options/GearAddToUserGearOption';
import { GearRemoveFromUserGearOption } from '@/features/gear/components/quick-options/GearRemoveFromMyGearOption';
import { GearModal } from '@/features/gear/components/modal/GearModal';
import { GearModalTrigger } from '@/features/gear/components/modal/GearModalTrigger';

export default function GearPage() {
    const { user } = useAuth();
    const gearType = user ? 'user' : 'public';
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Gear</h1>
                </div>
                <div>
                    <GearSearchProvider
                        defaultSearchParams={{
                            gearType,
                        }}
                    >
                        <div className='flex justify-between'>
                            <GearSearchBar className='mb-6 flex-1' />{' '}
                            <GearProvider>
                                <GearModal>
                                    <AddGearButton />
                                </GearModal>
                            </GearProvider>
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
                <GearProvider key={gear.id} gear={gear} className='h-full'>
                    <GearQuickOptionsMenu className='bg-background/90 p-2'>
                        <GearOpenModalOption />
                        <GearEditInModalOption />
                        <GearAddToUserGearOption />
                        <GearRemoveFromUserGearOption />
                        <DropdownMenuSeparator />
                        <GearDeleteOption />
                    </GearQuickOptionsMenu>
                    <GearModalTrigger className='h-full'>
                        <GearDetailCard className='h-full' />
                    </GearModalTrigger>
                    <GearModal />
                </GearProvider>
            ))}
        </div>
    );
}
