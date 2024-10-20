'use client';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { Gear } from '@/lib/appTypes';
import { Button } from '@/ui/button';
import { gearToUpload } from './gearToUpload';

export function UploadGearButton() {
    const { user } = useAuth();
    const { addGear } = useAppMutations();
    const gear = gearToUpload;

    if (!user) return null;

    function uploadGear() {
        console.log('Uploading gear...');
        gear.forEach((gearItem) => {
            const appGearItem: Omit<Gear, 'id'> = {
                name: gearItem.name,
                price: gearItem.price,
                description: gearItem.description,
                brand: gearItem.brand,
                image: gearItem.image,
                weight: gearItem.weight,
                isPublic: true,
                purchaseLinks: [],
                createdById: user?.id || '',
                createdByUserName: '',
                isDeleted: false,
                isOwnedByUser: false,
                isRetiredByUser: false,
            };
            addGear(appGearItem);
        });
    }

    return (
        <Button className='w-fit' onClick={uploadGear}>
            Load Gear
        </Button>
    );
}
