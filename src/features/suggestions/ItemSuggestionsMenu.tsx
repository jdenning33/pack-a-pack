'use client';

import * as React from 'react';
import { PlusIcon, SparklesIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { useAppMutations } from '../app-mutations/useAppMutations';
import { Item } from '@/lib/appTypes';
import { suggestedKits } from './suggestedKits';
import { useKitContext } from '../kit/useKitContext';

export function ItemSuggestionMenu({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const { kit } = useKitContext();
    const { addItem } = useAppMutations();

    if (!kit) return null;

    const relatedSuggestedKit = suggestedKits.find(
        (sk) => sk.name === kit.name
    );
    const suggestedItems = relatedSuggestedKit?.items || [];
    const addItemToPack = (itemName: string) => {
        console.log('Adding item:', itemName);
        const newItem: Omit<Item, 'id'> = {
            kitId: kit.id,
            packId: kit.packId,
            name: itemName,
            notes: '',
            quantity: 1,
            isPacked: false,
            isDeleted: false,
        };
        addItem(newItem);
    };

    const items = suggestedItems.filter(
        (itemName) => !kit.items.some((item) => item.name === itemName)
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    role='combobox'
                    {...buttonProps}
                    className={cn(buttonProps.className, 'group')}
                    disabled={items.length === 0}
                    disabledTitle='Uh oh! No more items to suggest for this kit.'
                >
                    <SparklesIcon className='h-4 w-4 shrink-0 opacity-70 group-hover:opacity-90' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='end'>
                <Command>
                    <CommandInput placeholder='Search popular items...' />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((itemName) => (
                                <CommandItem
                                    key={itemName}
                                    value={itemName}
                                    onSelect={addItemToPack}
                                >
                                    <PlusIcon
                                        className={cn(
                                            'mr-2 h-4 w-4 cursor-pointer'
                                        )}
                                    />
                                    {itemName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
