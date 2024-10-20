'use client';
import { GearProvider } from '../../features/gear/GearProvider';
import { GearModal } from '@/features/gear/components/GearModal';
import { GearEditOption } from '@/features/gear/components/quick-options/GearEditOption';
import { GearDeleteOption } from '@/features/gear/components/quick-options/GearDeleteOption';
import { GearOpenModalOption } from '@/features/gear/components/quick-options/GearOpenModalOption';
import { GearQuickOptionsMenu } from '@/features/gear/components/quick-options/GearQuickOptionsMenu';
import { Gear } from '@/lib/appTypes';
import { GearDetailCard } from '@/features/gear/components/card/GearDetailCard';
import { DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { KitProvider } from '@/features/kit/KitProvider';
import { KitCard } from '@/features/kit/components/card/KitCard';
import {
    KitModal,
    KitModalTrigger,
} from '@/features/kit/components/modal/KitModal';
import { usePack } from '@/features/pack/usePack';
import { KitQuickOptionsMenuButton } from '@/features/kit/components/quick-options/KitQuickOptionsMenuButton';
import { GearSearchProvider } from '@/features/gear-search/GearSearchProvider';
import { GearSearchBar } from '@/features/gear-search/components/GearSearchBar';
import { PackProvider } from '@/features/pack/PackProvider';
import { EditKitCardOption } from '@/features/kit/components/quick-options/EditKitCardOption';
import {
    KitOpenEditModalOption,
    KitOpenModalOption,
} from '@/features/kit/components/quick-options/KitOpenModalOption';
import { GearAddToUserGearOption } from '@/features/gear/components/quick-options/GearAddToUserGearOption';
import { GearRemoveFromUserGearOption } from '@/features/gear/components/quick-options/GearRemoveFromMyGearOption';

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
                <PackProvider packId='c542f6a8-b4e6-4477-85a4-ffe1583d544c'>
                    <KitDetailsCardList />
                </PackProvider>
            </div>
        </main>
    );
}

function KitDetailsCardList() {
    const { pack, isReadOnly } = usePack();
    if (!pack) return null;
    return pack.kits.map((kit) => (
        <KitProvider
            key={kit.id}
            isReadOnly={isReadOnly}
            packId={pack.id}
            className='max-w-lg'
            kit={kit}
        >
            <KitModal>
                <KitModalTrigger>
                    <KitCard>
                        <KitQuickOptionsMenuButton>
                            <EditKitCardOption />
                            <KitOpenModalOption />
                            <KitOpenEditModalOption />
                        </KitQuickOptionsMenuButton>
                    </KitCard>
                </KitModalTrigger>
            </KitModal>
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
        createdByUserName: 'unknown',
        isDeleted: false,
        isOwnedByUser: false,
        isRetiredByUser: false,
    };
    return (
        <div className=''>
            {/* <GearList gearClassName='break-inside-avoid' /> */}
            <GearProvider className='max-w-lg' gear={gear} useModal={true}>
                <GearQuickOptionsMenu>
                    <GearEditOption />
                    <GearOpenModalOption />
                    <GearAddToUserGearOption />
                    <GearRemoveFromUserGearOption />
                    <DropdownMenuSeparator />
                    <GearDeleteOption />
                </GearQuickOptionsMenu>
                <GearDetailCard />
                <GearModal />
            </GearProvider>
        </div>
    );
}
