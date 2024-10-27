import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

export type ComboboxOptionType = {
    value: string;
    label?: string;
};

type ComboboxProps = {
    options?: (ComboboxOptionType | string)[];
    children?: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    emptyText?: React.ReactNode;
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

// Create a context to pass the handleSelect function down
const SelectContext = React.createContext<
    ((value: string) => void) | undefined
>(undefined);

export function OpinonatedCombobox({
    options: rawOptions = [],
    children,
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

    const options: ComboboxOptionType[] = rawOptions.map((option) =>
        typeof option === 'string' ? { value: option } : option
    );

    const handleSelect = (selectedValue: string) => {
        onValueChange?.(selectedValue);
        setOpen(false);
        setSearch('');
    };

    const currentOption = options.find((opt) => opt.value === value);
    const displayValue = currentOption?.label || value;

    return (
        <SelectContext.Provider value={handleSelect}>
            <div className={cn('relative', className)}>
                <Popover
                    open={open}
                    onOpenChange={disabled ? undefined : setOpen}
                >
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
                                    {children}
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
        </SelectContext.Provider>
    );
}

export function Combobox({
    children,
    value,
    placeholder = 'Select',
    className,
    contentAlign = 'start',
    contentSide = 'bottom',
    contentClassName,
    ...buttonProps
}: {
    placeholder?: string;
    contentAlign?: 'start' | 'center' | 'end';
    contentSide?: 'top' | 'right' | 'bottom' | 'left';
    contentClassName?: string;
} & React.ComponentProps<typeof Button>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                        'w-full justify-between pr-2',
                        !value && 'text-muted-foreground',
                        className
                    )}
                    {...buttonProps}
                >
                    {value || placeholder}
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
                <Command>{children}</Command>
            </PopoverContent>
        </Popover>
    );
}

export const ComboboxDialog = CommandDialog;
export const ComboboxInput = CommandInput;
export const ComboboxList = CommandList;
export const ComboboxEmpty = CommandEmpty;
export const ComboboxGroup = CommandGroup;
export const ComboboxShortcut = CommandItem;
export const ComboboxSeparator = CommandSeparator;
export const ComboboxItem = CommandItem;
