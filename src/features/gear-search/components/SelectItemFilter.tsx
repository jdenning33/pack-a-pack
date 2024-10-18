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
import { useGearSearch } from '../useGearSearch';

const items = [
    'Stove',
    'Utensils',
    'Cookware',
    'Dishes',
    'Food',
    'Water',
    'Shelter',
    'Sleeping',
    'Clothing',
    'First Aid',
    'Hygiene',
    'Electronics',
    'Miscellaneous',
];

export function SelectItemFilter() {
    const [open, setOpen] = React.useState(false);
    const { searchParams, setSearchParams } = useGearSearch();

    const itemFilter = searchParams.itemFilter;
    const setItemFilter = (filter: string) =>
        setSearchParams((prev) => ({ ...prev, itemFilter: filter }));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='justify-between'
                >
                    {itemFilter ? itemFilter : 'Any Item'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
                <Command>
                    <CommandInput placeholder='Search items...' />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(currentValue) => {
                                        setItemFilter(
                                            currentValue === itemFilter
                                                ? ''
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            itemFilter === item
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {item}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
