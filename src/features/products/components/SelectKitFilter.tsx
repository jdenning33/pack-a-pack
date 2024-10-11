'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

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
import { useProducts } from '../useProducts';

const kits = ['Sleep', 'Cook', 'Food', 'Shelter'];

export function SelectKitFilter() {
    const { searchTag: value, setSearchTag: setValue } = useProducts();
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='justify-between'
                >
                    {value ? value : 'Any Kit'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
                <Command>
                    <CommandInput placeholder='Search kits...' />
                    <CommandList>
                        <CommandEmpty>No kits found.</CommandEmpty>
                        <CommandGroup>
                            {kits.map((kit) => (
                                <CommandItem
                                    key={kit}
                                    value={kit}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === kit
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {kit}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
