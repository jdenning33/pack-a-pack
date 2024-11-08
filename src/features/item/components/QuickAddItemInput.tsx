import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/ui/input';
import React from 'react';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useItemContext } from '../useItem';
import { ItemSuggestionMenu } from '../../suggestions/ItemSuggestionsMenu';
import { Command, CommandInput, CommandItem, CommandList } from '@/ui/command';
import { GearSearchProvider } from '@/features/gear/search/GearSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { GearList } from '@/features/gear/search/list/GearList';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Gear } from '@/lib/appTypes';
import { useGearContext } from '@/features/gear/useGearContext';

export const QuickAddPackItem = () => {
    const { user } = useAuth();
    const { addItem } = useAppMutations();
    const { kit, isReadOnly } = useItemContext();
    const [newItemName, setNewItemName] = React.useState('');
    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            await addItem({
                kitId: kit.id,
                packId: kit.packId,
                name: newItemName.trim(),
                weight: null,
                weightType: null,
                quantity: 1,
                isPacked: false,
                isDeleted: false,
                notes: '',
            });
            setNewItemName('');
        }
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const onGearSelect = async (gear: Gear) => {
        console.log(gear);
        await addItem({
            kitId: kit.id,
            packId: kit.packId,
            name: gear.type,
            quantity: 1,
            isPacked: false,
            isDeleted: false,
            notes: '',
            gearId: gear.id,
            weight: null,
            weightType: null,
        });
        setIsOpen(false);
    };

    if (true)
        return (
            <GearSearchProvider
                defaultSearchParams={{
                    gearType: 'user',
                    gearUserId: user?.id || 'none',
                }}
            >
                <Popover
                    open={isOpen && newItemName.length > 0}
                    onOpenChange={(open) => {
                        console.log('open', open);
                        setIsOpen(open);
                    }}
                >
                    <form onSubmit={handleAddItem}>
                        <div className='flex'>
                            <PopoverTrigger disabled={isOpen}>
                                <Input
                                    className='rounded-r-none'
                                    value={newItemName}
                                    onChange={(e) =>
                                        setNewItemName(e.target.value)
                                    }
                                    // onBlur={() => setHasFocus(false)}
                                />
                            </PopoverTrigger>
                            <Button
                                type='submit'
                                className='rounded-l-none mr-2 px-3'
                                disabled={isReadOnly}
                                disabledTitle='You do not have access to add items to this pack'
                            >
                                <Plus className='h-4 w-4' />
                            </Button>
                            <ItemSuggestionMenu
                                variant='outline'
                                className='px-3'
                            />
                        </div>
                    </form>

                    <PopoverContent
                        className='p-0'
                        align='start'
                        autoFocus={false}
                        onOpenAutoFocus={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('open autofocus');
                        }}
                        onCloseAutoFocus={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('close autofocus');
                        }}
                    >
                        <Command autoFocus={false}>
                            <CommandInput
                                className='hidden'
                                value={newItemName}
                                autoFocus={false}
                            />
                            <CommandList className='max-h-64' autoFocus={false}>
                                <GearList
                                    gearFilter={(g) =>
                                        !kit.items.some(
                                            (i) => i.gearId === g.id
                                        )
                                    }
                                >
                                    <ComboBoxGearItem
                                        onGearSelect={onGearSelect}
                                    />
                                </GearList>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </GearSearchProvider>
        );
};

function ComboBoxGearItem({
    onGearSelect,
}: {
    onGearSelect: (g: Gear) => void;
}) {
    const { gear } = useGearContext();
    if (!gear) return null;
    return (
        <CommandItem
            key={gear.id}
            onSelect={() => onGearSelect && onGearSelect(gear)}
            value={gear.id}
            keywords={[gear.name, gear.brand, gear.type]}
            className='border-b rounded-none'
        >
            <div className='flex gap-4 w-full'>
                <ImageWithFallback
                    src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt='test'
                    className='rounded object-contain'
                    width={32}
                    height={48}
                />
                <div className='flex-1'>
                    <div className='text-muted-foreground line-clamp-1'>
                        {gear.type}
                    </div>
                    <div className='font-bold mr-2 line-clamp-1'>
                        {gear.name}
                    </div>
                </div>
            </div>
        </CommandItem>
    );
}
