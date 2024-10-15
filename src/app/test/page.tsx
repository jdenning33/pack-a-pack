'use client';
import { GearSearchBar } from '@/features/gear/components/search/GearSearchBar';
import { SupabaseGearProvider } from '@/features/gear/SupabaseGearProvider';
import { GearDetails } from '../../features/gear/components/details/GearDetails';
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
import { SupabasePackProvider } from '@/features/pack/hooks/SupabasePackProvider';
import { KitDetails } from '@/features/kit/KitDetails';
import { KitCard } from '@/features/kit/components/details/KitCard';
import {
    KitModal,
    KitModalTrigger,
} from '@/features/kit/components/details/KitModal';
import { usePack } from '@/features/pack/hooks/usePack';
import { KitQuickOptionsMenuButton } from '@/features/kit/components/details/KitQuickOptionsMenuButton';

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
                <SupabasePackProvider packId='4c1cd859-56bf-4d45-a675-227b66812c78'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Kit Details</h1>
                    </div>
                    <KitDetailsCardList />
                </SupabasePackProvider>
            </div>
        </main>
    );
}

function KitDetailsCardList() {
    const { pack } = usePack();
    return pack.kits.map((kit) => (
        <KitDetails key={kit.id} className='max-w-lg' useModal={true} kit={kit}>
            <KitModalTrigger>
                <KitCard />
            </KitModalTrigger>
            <KitQuickOptionsMenuButton />
            <KitModal />
        </KitDetails>
    ));
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
            <GearDetails className='max-w-lg' gear={gear} useModal={true}>
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
