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
import { usePack } from '../pack/usePack';
import { useAppMutations } from '../app-mutations/useAppMutations';
import { Kit } from '@/lib/appTypes';
import { suggestedKits } from './suggestedKits';

export function KitSuggestionMenu({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const { pack, isReadOnly } = usePack();
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

    const useCompact = false;

    if (isReadOnly) return null;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    role='combobox'
                    title='Quick Add Kit Suggestions'
                    {...buttonProps}
                    className={cn(buttonProps.className, 'group')}
                >
                    <SparklesIcon className='h-[.85rem] w-[.85rem] group-hover:opacity-90' />
                    {!useCompact && (
                        <span className='ml-2'>Suggested Kits</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
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
