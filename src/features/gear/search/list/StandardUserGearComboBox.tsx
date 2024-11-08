import React from 'react';
import { Gear } from '@/lib/appTypes';
import { useGearModal } from '@/features/gear/modal/GearModal';
import { PlusIcon } from 'lucide-react';
import {
    ComboboxItem,
    Combobox,
    ComboboxInput,
    ComboboxList,
} from '@/ui/combobox';
import { GearSearchProvider } from '@/features/gear/search/GearSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { GearList } from '@/features/gear/search/list/GearList';
import { ComboBoxGearItem } from '@/features/gear/card/ComboBoxGearItem';

export function StandardUserGearComboBox({
    onGearSelect,
}: {
    onGearSelect: (gear: Gear) => void;
}) {
    const { user } = useAuth();
    const { setIsOpen, setIsEditing } = useGearModal();
    return (
        <GearSearchProvider
            defaultSearchParams={{
                gearType: 'user',
                gearUserId: user?.id,
            }}
        >
            <Combobox placeholder='My Gear'>
                <ComboboxInput />
                <ComboboxList className='max-h-64'>
                    <GearList>
                        <ComboBoxGearItem onGearSelect={onGearSelect} />
                    </GearList>
                </ComboboxList>
                <ComboboxItem
                    value='new'
                    forceMount={true}
                    className='border-t rounded-none min-h-10'
                    onSelect={() => {
                        setIsOpen(true);
                        setIsEditing(true);
                    }}
                >
                    <PlusIcon className='h-4 w-4 mr-2' />
                    Add New Gear
                </ComboboxItem>
            </Combobox>
        </GearSearchProvider>
    );
}
