import React from 'react';
import { Gear } from '@/lib/appTypes';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { NoGearSelectedHolder } from '@/features/item/components/NoGearSelectedHolder';
import { GearDetailCard } from '@/features/gear/components/card/GearDetailCard';
import { GearEditInModalOption } from '@/features/gear/components/quick-options/GearEditOption';
import { GearRemoveFromItemOption } from '@/features/gear/components/quick-options/GearRemoveFromItemOption';
import { GearQuickOptionsMenu } from '@/features/gear/components/quick-options/GearQuickOptionsMenu';
import { QuickEditItemName } from './QuickEditItemName';
import { GearProvider } from '@/features/gear/GearProvider';
import { useAppMutations } from '../../app-mutations/useAppMutations';
import { useConfirmedItemContext, useItemContext } from '../useItem';
import { GearModal } from '@/features/gear/components/GearModal';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';
import { InfoIcon, PlusIcon } from 'lucide-react';
import {
    ComboboxItem,
    Combobox,
    ComboboxInput,
    ComboboxList,
} from '@/ui/combobox';
import {
    GearSearchProvider,
    useGearSearch,
} from '@/features/gear-search/GearSearchProvider';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { useAuth } from '@/features/auth/useAuth';
import { Textarea } from '@/ui/textarea';
import Link from 'next/link';
import { ScrollArea } from '@/ui/scroll-area';
import { useGearContext } from '@/features/gear/useGearContext';

export const ItemPanel: React.FC = () => {
    const { updateItem } = useAppMutations();
    const { user } = useAuth();
    const { item, isReadOnly, setIsEditingGearDetails } = useItemContext();
    const [itemNotes, setItemNotes] = React.useState(item?.notes || '');

    if (!item)
        return (
            <div>
                <h1>Item not found</h1>
            </div>
        );

    function afterGearUpdated(gear: Gear) {
        updateItem({
            ...item!,
            gear: gear,
            gearId: gear?.id,
        });
        setIsEditingGearDetails(false);
    }

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1 flex flex-col gap-2 overflow-hidden'>
                <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-2 space-y-4 sm:space-y-0'>
                    <QuickEditItemName />
                    <div className='flex items-center gap-4'></div>
                </div>
                <ScrollArea className='flex-1 overflow-auto '>
                    <div className=' flex flex-col gap-2'>
                        <QuickEditItemIsPacked />
                        <QuickEditItemQuantity />
                        <div className='relative flex'>
                            <Label className='w-20 text-right p-2'>Notes</Label>
                            <Textarea
                                value={itemNotes}
                                onChange={(e) => setItemNotes(e.target.value)}
                                onBlur={(_e) =>
                                    updateItem({ ...item, notes: itemNotes })
                                }
                                className='flex-1 h-12 bg-background'
                            />
                        </div>
                        <div className='flex items-start'>
                            <Label className='w-20 text-right p-2 flex items-center justify-end'>
                                Gear
                                <GearTooltip />
                            </Label>
                            <GearProvider
                                gear={item.gear}
                                useModal={true}
                                className='flex-1'
                                onIsEditingChanged={setIsEditingGearDetails}
                                afterGearUpdated={afterGearUpdated}
                            >
                                {!isReadOnly && (
                                    <GearQuickOptionsMenu>
                                        <GearRemoveFromItemOption item={item} />
                                        <GearEditInModalOption />
                                    </GearQuickOptionsMenu>
                                )}
                                <GearDetailCard className='shadow-sm'></GearDetailCard>
                                <NoGearSelectedHolder className='text-sm text-muted-foreground flex flex-col items-start'>
                                    <div className='flex gap-1 mt-1'>
                                        <GearSearchProvider
                                            defaultSearchParams={{
                                                gearType: 'user',
                                                gearUserId: user?.id,
                                            }}
                                        >
                                            <GearSearchBox
                                                onGearSelect={(g) => {
                                                    console.log(g);
                                                    afterGearUpdated(g);
                                                }}
                                            />
                                        </GearSearchProvider>
                                        <Link href='/gear' target='_blank'>
                                            <Button variant='link'>
                                                Find Gear
                                            </Button>
                                        </Link>
                                    </div>
                                </NoGearSelectedHolder>
                                <GearModal />
                            </GearProvider>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

function GearTooltip() {
    return (
        <Tooltip>
            <TooltipTrigger>
                <InfoIcon className='h-4 w-4 ml-1' />
            </TooltipTrigger>
            <TooltipContent side='bottom' className='max-w-48'>
                <ul>
                    <li>
                        - An item is a thing you need to pack, i.e.
                        &quot;Stove&quot;.
                    </li>
                    <li>
                        - Gear is the actual item you own, i.e. &quot;MSR Pocket
                        Rocket&quot;.
                    </li>
                </ul>
                <br />
                Items belong to a pack and are only used once. Gear, however,
                can be used across multiple packs so that you don&apos;t have to
                re-enter tedious details like weight and price.
            </TooltipContent>
        </Tooltip>
    );
}

function GearSearchBox({
    onGearSelect,
}: {
    onGearSelect?: (gear: Gear) => void;
}) {
    const { gear } = useGearSearch();
    const { setIsModalOpen, setIsEditing } = useGearContext();
    return (
        <Combobox placeholder='My Gear'>
            <ComboboxInput />
            <ComboboxList className='max-h-64'>
                {gear.map((g) => (
                    <ComboboxItem
                        key={g.id}
                        onSelect={() => onGearSelect && onGearSelect(g)}
                        keywords={[g.name, g.description, g.brand]}
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
                                <div className='font-bold mr-2 line-clamp-1'>
                                    {g.name}
                                </div>
                                <div className='text-muted-foreground line-clamp-1'>
                                    {g.description}
                                </div>
                                <div className='flex justify-between'>
                                    <div>${g.price}</div>
                                    <div>{g.weight} oz</div>
                                </div>
                            </div>
                        </div>
                    </ComboboxItem>
                ))}
            </ComboboxList>
            <ComboboxItem
                value='new'
                forceMount={true}
                className='border-t rounded-none min-h-10'
                onSelect={() => {
                    console.log('new');
                    setIsModalOpen(true);
                    setIsEditing(true);
                }}
            >
                <PlusIcon className='h-4 w-4 mr-2' />
                Add New Gear
            </ComboboxItem>
        </Combobox>
    );
}

function QuickEditItemQuantity() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();

    function setQuantity(quantity: number) {
        updateItem({ ...item, quantity });
    }
    return (
        <div className='flex items-center'>
            <Label htmlFor='quantity' className='w-20 text-right p-2'>
                Quantity
            </Label>
            {isReadOnly ? (
                <span>{item.quantity}</span>
            ) : (
                <Input
                    id='quantity'
                    type='number'
                    value={item.quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className='w-16 h-8 bg-background'
                    min={1}
                />
            )}
        </div>
    );
}

function QuickEditItemIsPacked() {
    const { item, isReadOnly } = useConfirmedItemContext();
    const { updateItem } = useAppMutations();
    function setIsPacked(isPacked: boolean) {
        updateItem({ ...item, isPacked });
    }
    return (
        <div className='flex items-center'>
            <Label htmlFor='packed' className='w-20 text-right p-2'>
                Is Packed
            </Label>
            {isReadOnly ? (
                <span>{item.isPacked ? 'Yes' : 'No'}</span>
            ) : (
                <div id='packed-group' className='flex rounded-md items-center'>
                    <Button
                        variant={!item.isPacked ? 'default' : 'outline'}
                        size='sm'
                        className='rounded-r-none'
                        onClick={() => setIsPacked(false)}
                    >
                        No
                    </Button>
                    <Button
                        variant={item.isPacked ? 'default' : 'outline'}
                        size='sm'
                        className='rounded-l-none'
                        onClick={() => setIsPacked(true)}
                    >
                        Yes
                    </Button>
                </div>
            )}
        </div>
    );
}
