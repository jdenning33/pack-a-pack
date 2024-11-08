import React from 'react';
import { CommandItem } from '@/ui/command';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Gear } from '@/lib/appTypes';
import { useGearContext } from '@/features/gear/useGearContext';

export function ComboBoxGearItem({
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
