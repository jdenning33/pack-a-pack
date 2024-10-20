'use client';

import * as React from 'react';
import { ChevronsUpDown, PlusIcon } from 'lucide-react';

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
import { usePack } from '../pack/usePack';
import { useAppMutations } from '../app-mutations/useAppMutations';
import { Kit } from '@/lib/appTypes';
import { suggestedKits } from './suggestedKits';

export function KitSuggestionMenu({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const { pack } = usePack();
    const { addKit } = useAppMutations();

    if (!pack) return null;

    const addKitToPack = (kitName: string) => {
        console.log('Adding kit:', kitName);
        const kit = suggestedKits.find((sk) => sk.name === kitName);
        if (!kit) return;
        const newKit: Omit<Kit, 'id'> = {
            items: [],
            name: kit.name,
            packId: pack.id,
            description: kit.description,
            isDeleted: false,
        };
        addKit(newKit);
    };

    const kits = suggestedKits.filter(
        (sk) => !pack.kits.some((kit) => kit.name === sk.name)
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button role='combobox' {...buttonProps}>
                    <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='end'>
                <Command>
                    <CommandInput placeholder='Search popular kits...' />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {kits.map((kit) => (
                                <CommandItem
                                    key={kit.name}
                                    value={kit.name}
                                    onSelect={addKitToPack}
                                    title={kit.description}
                                >
                                    <PlusIcon
                                        className={cn(
                                            'mr-2 h-4 w-4 cursor-pointer'
                                        )}
                                    />
                                    {kit.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
