'use client';
import { GearProvider } from '../../features/gear/GearProvider';
import { NoGearSelectedHolder } from '@/features/gear/components/NoGearSelectedHolder';
import { GearModal } from '@/features/gear/components/GearModal';
import {
    GearDeleteOption,
    GearEditOption,
    GearOpenModalOption,
} from '@/features/gear/components/GearQuickOptionsMenu';
import { GearQuickOptionsMenu } from '@/features/gear/components/GearQuickOptionsMenu';
import { Gear } from '@/lib/appTypes';
import { GearDetailCard } from '@/features/gear/components/GearDetailCard';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { KitProvider } from '@/features/kit/KitProvider';
import { KitCard } from '@/features/kit/components/KitCard';
import { KitModal, KitModalTrigger } from '@/features/kit/components/KitModal';
import { usePack } from '@/features/pack/usePack';
import { KitQuickOptionsMenuButton } from '@/features/kit/components/KitQuickOptionsMenuButton';
import { GearSearchProvider } from '@/features/gear-search/GearSearchProvider';
import { GearSearchBar } from '@/features/gear-search/components/GearSearchBar';
import { PackProvider } from '@/features/pack/PackProvider';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Gear</h1>
                </div>
                <div>
                    <GearSearchProvider>
                        <GearSearchBar className='mb-6' />
                        <GearDetailsCardList />
                    </GearSearchProvider>
                </div>
                <div className='flex justify-between items-center my-6'>
                    <h1 className='text-2xl font-bold'>Kit Details</h1>
                </div>
                <PackProvider packId='4c1cd859-56bf-4d45-a675-227b66812c78'>
                    <KitDetailsCardList />
                </PackProvider>
            </div>
        </main>
    );
}

function KitDetailsCardList() {
    const { pack } = usePack();
    return pack.kits.map((kit) => (
        <KitProvider
            key={kit.id}
            isReadOnly={false}
            packId={pack.id}
            className='max-w-lg'
            useModal={true}
            kit={kit}
        >
            <KitModalTrigger>
                <KitCard />
            </KitModalTrigger>
            <KitQuickOptionsMenuButton />
            <KitModal />
        </KitProvider>
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
            <GearProvider className='max-w-lg' gear={gear} useModal={true}>
                <GearQuickOptionsMenu>
                    <GearEditOption />
                    <GearOpenModalOption />
                    <DropdownMenuSeparator />
                    <GearDeleteOption />
                </GearQuickOptionsMenu>
                <GearDetailCard />
                <NoGearSelectedHolder />
                <GearModal />
            </GearProvider>
        </div>
    );
}
