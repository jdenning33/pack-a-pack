import { Button } from '@/ui/button';
import { GearBinModal } from './modal/GearBinModal';
import { GearBinModalTrigger } from './modal/GearBinModalTrigger';
import { UserGearBinProvider } from '../GearBinProvider';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AddGearBinButton({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <UserGearBinProvider gearBin={undefined}>
            <GearBinModal
                isOpen={isOpen}
                onIsOpenChange={setIsOpen}
                onIsEditingChange={(e) => !e && setIsOpen(false)}
            >
                <GearBinModalTrigger isEditing={true} asChild>
                    <Button
                        {...buttonProps}
                        className={cn(
                            'flex items-center gap-2',
                            buttonProps?.className
                        )}
                    >
                        <Plus size={14} />
                        Add Gear Bin
                    </Button>
                </GearBinModalTrigger>
            </GearBinModal>
        </UserGearBinProvider>
    );
}
