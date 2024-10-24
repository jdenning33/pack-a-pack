import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
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

export type ComboboxOption = {
    value: string;
    label?: string;
};

type ComboboxProps = {
    options: (ComboboxOption | string)[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    emptyText?: string;
    searchTextPlaceholder?: string;
    className?: string;
    allowCustom?: boolean;
    triggerClassName?: string;
    contentClassName?: string;
    contentAlign?: 'start' | 'center' | 'end';
    contentSide?: 'top' | 'right' | 'bottom' | 'left';
    disabled?: boolean;
    defaultOpen?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'value' | 'onChange'>;

export function Combobox({
    options: rawOptions,
    value,
    onValueChange,
    placeholder = 'Select',
    emptyText = 'No results found.',
    searchTextPlaceholder = 'Search...',
    className,
    triggerClassName,
    contentClassName,
    contentAlign = 'start',
    contentSide = 'bottom',
    allowCustom = false,
    disabled = false,
    defaultOpen = false,
    ...buttonProps
}: ComboboxProps) {
    const [open, setOpen] = React.useState(defaultOpen);
    const [search, setSearch] = React.useState('');

    // Normalize options to ComboboxOption[]
    const options: ComboboxOption[] = rawOptions.map((option) =>
        typeof option === 'string' ? { value: option } : option
    );

    const handleSelect = (selectedValue: string) => {
        onValueChange?.(selectedValue);
        setOpen(false);
        setSearch('');
    };

    // Find the current option to display its label if available
    const currentOption = options.find((opt) => opt.value === value);
    const displayValue = currentOption?.label || value;

    return (
        <div className={cn('relative', className)}>
            <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn(
                            'w-full justify-between pr-2',
                            !value && 'text-muted-foreground',
                            open && 'outline-none ring-1 ring-ring',
                            triggerClassName
                        )}
                        {...buttonProps}
                    >
                        {displayValue || placeholder}
                        <span className='ml-2 h-4 w-4 shrink-0 opacity-50 flex items-center justify-center'>
                            <ChevronDown size={14} />
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align={contentAlign}
                    side={contentSide}
                    className={cn('p-0', contentClassName)}
                >
                    <Command>
                        <CommandInput
                            placeholder={searchTextPlaceholder}
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandList>
                            <CommandEmpty>{emptyText}</CommandEmpty>
                            <CommandGroup>
                                {allowCustom &&
                                    search &&
                                    !options.some(
                                        (opt) =>
                                            opt.value.toLowerCase() ===
                                            search.toLowerCase()
                                    ) && (
                                        <CommandItem
                                            key='custom'
                                            value={search}
                                            onSelect={handleSelect}
                                        >
                                            &quot;{search}&quot;
                                        </CommandItem>
                                    )}
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={handleSelect}
                                    >
                                        {option.label || option.value}
                                        {value === option.value && (
                                            <Check className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
