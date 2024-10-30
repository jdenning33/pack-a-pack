import { Button } from '@/ui/button';
import { GearBinModal } from './modal/GearBinModal';
import { GearBinModalTrigger } from './modal/GearBinModalTrigger';
import { UserGearBinProvider } from '../GearBinProvider';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export function AddGearBinButton({ children }: { children?: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <UserGearBinProvider gearBin={undefined}>
            <GearBinModal
                isOpen={isOpen}
                onIsOpenChange={setIsOpen}
                onIsEditingChange={(e) => !e && setIsOpen(false)}
            >
                <GearBinModalTrigger isEditing={true} asChild>
                    {children ? (
                        children
                    ) : (
                        <Button
                            className='w-fit flex items-center gap-2'
                            variant='default'
                        >
                            <Plus size={14} />
                            Add Gear Bin
                        </Button>
                    )}
                </GearBinModalTrigger>
            </GearBinModal>
        </UserGearBinProvider>
    );
}
