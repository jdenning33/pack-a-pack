'use client';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/ui/accordion';
import { Card, CardContent } from '@/ui/card';
import { ChevronDown, LayoutGrid, PlusIcon, Table } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { Button } from '@/ui/button';

// Mock data for kits and gear items
const kits = [
    {
        name: 'Sleep Kit',
        items: [
            {
                name: 'Tent',
                brand: 'Big Agnes',
                weight: '2 lbs 14 oz',
                price: 399,
                image: '/placeholder.svg',
            },
            {
                name: 'Sleeping Bag',
                brand: 'REI',
                weight: '1 lb 13 oz',
                price: 299,
                image: '/placeholder.svg',
            },
            {
                name: 'Sleeping Pad',
                brand: 'Therm-a-Rest',
                weight: '12 oz',
                price: 149,
                image: '/placeholder.svg',
            },
        ],
    },
    {
        name: 'Cook Kit',
        items: [
            {
                name: 'Stove',
                brand: 'MSR',
                weight: '10.9 oz',
                price: 149,
                image: '/placeholder.svg',
            },
            {
                name: 'Pot',
                brand: 'Snow Peak',
                weight: '4.9 oz',
                price: 59,
                image: '/placeholder.svg',
            },
            {
                name: 'Spork',
                brand: 'Light My Fire',
                weight: '0.3 oz',
                price: 3,
                image: '/placeholder.svg',
            },
            {
                name: 'Fuel',
                brand: 'MSR',
                weight: '7 oz',
                price: 9,
                image: '/placeholder.svg',
            },
            {
                name: 'Lighter',
                brand: 'Bic',
                weight: '0.4 oz',
                price: 1,
                image: '/placeholder.svg',
            },
        ],
    },
    {
        name: 'Clothes',
        items: [
            {
                name: 'Hiking Shirt',
                brand: 'Patagonia',
                weight: '6 oz',
                price: 59,
                image: '/placeholder.svg',
            },
            {
                name: 'Hiking Pants',
                brand: 'prAna',
                weight: '12 oz',
                price: 79,
                image: '/placeholder.svg',
            },
            {
                name: 'Hiking Boots',
                brand: 'Salomon',
                weight: '2 lbs 2 oz',
                price: 230,
                image: '/placeholder.svg',
            },
        ],
    },
];

function parseWeight(weight: string): number {
    const lbsMatch = weight.match(/(\d+)\s*lbs?/);
    const ozMatch = weight.match(/(\d+(?:\.\d+)?)\s*oz/);

    let totalOz = 0;
    if (lbsMatch) totalOz += parseInt(lbsMatch[1]) * 16;
    if (ozMatch) totalOz += parseFloat(ozMatch[1]);

    return totalOz;
}

function formatWeight(oz: number): string {
    const lbs = Math.floor(oz / 16);
    const remainingOz = oz % 16;
    if (lbs === 0) return `${remainingOz.toFixed(1)} oz`;
    if (remainingOz === 0) return `${lbs} lbs`;
    return `${lbs} lbs ${remainingOz.toFixed(1)} oz`;
}

function calculateKitStats(items: (typeof kits)[0]['items']) {
    const weight = items.reduce(
        (sum, item) => sum + parseWeight(item.weight),
        0
    );
    const cost = items.reduce((sum, item) => sum + item.price, 0);
    return { weight, cost, count: items.length };
}

export default function GearPage() {
    const kitStats = kits.map((kit) => ({
        name: kit.name,
        ...calculateKitStats(kit.items),
    }));

    return (
        <main className='container flex flex-col gap-8 p-4 m-auto'>
            <div className='flex justify-between items-center border shadow rounded-md p-4 -mx-4'>
                <h1 className='text-2xl font-bold'>My Gear</h1>
                <div>
                    <Button
                        size='sm'
                        variant='outline'
                        className='px-2 rounded-r-none'
                    >
                        <Table className='h-4 w-4' />
                    </Button>
                    <Button
                        size='sm'
                        variant='outline'
                        className='px-2 rounded-l-none'
                    >
                        <LayoutGrid className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            <Accordion
                type='multiple'
                defaultValue={kits.map((_, index) => `item-${index}`)}
                className='w-full space-y-4'
            >
                {kits.map((kit, index) => {
                    const stats = kitStats[index];
                    return (
                        <AccordionItem
                            value={`item-${index}`}
                            key={kit.name}
                            className='rounded-lg [&[data-state=closed]>div]:rounded-b-md group'
                        >
                            <div className='flex items-center rounded-t-md '>
                                <AccordionTrigger className='px-4 py-2 hover:underline rounded-t-lg w-48'>
                                    <div className='flex items-center justify-between w-full'>
                                        <span className='text-lg'>
                                            {kit.name}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <div className='flex-grow px-4 text-sm'>
                                    <span className='mr-4'>
                                        {formatWeight(stats.weight)}
                                    </span>
                                    <span className='mr-4'>
                                        ${stats.cost.toFixed(2)}
                                    </span>
                                    <span>{stats.count} items</span>
                                </div>
                                <div className='flex items-center group-data-[state=closed]:hidden'>
                                    <Button
                                        className='mr-2'
                                        variant='outline'
                                        size='sm'
                                    >
                                        <PlusIcon className='h-3 w-3 mr-2' />
                                        Add Item
                                    </Button>

                                    <Button
                                        className='rounded-r-none'
                                        variant='outline'
                                        size='sm'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='rounded-none'
                                        variant='outline'
                                        size='sm'
                                    >
                                        Delete
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size='sm'
                                                variant='outline'
                                                className='rounded-l-none p-2'
                                            >
                                                <ChevronDown className='h-4 w-4' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuItem>
                                                Edit Kit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Delete Kit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Add Item
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <AccordionContent className='bg-muted border rounded-md p-4'>
                                {/* <ScrollArea className='w-full whitespace-nowrap rounded-md'> */}
                                <div className='flex flex-wrap  gap-4'>
                                    {kit.items.map((item) => (
                                        <Card
                                            key={item.name}
                                            className='w-[200px]'
                                        >
                                            <CardContent className='p-3'>
                                                <ImageWithFallback
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={180}
                                                    height={120}
                                                    className='rounded-md object-cover mb-2'
                                                />
                                                <h3 className='font-semibold text-sm'>
                                                    {item.name}
                                                </h3>
                                                <p className='text-xs text-muted-foreground'>
                                                    {item.brand}
                                                </p>
                                                <div className='mt-1 flex justify-between text-xs'>
                                                    <span>{item.weight}</span>
                                                    <span>${item.price}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                {/* <ScrollBar orientation='horizontal' />
                                </ScrollArea> */}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </main>
    );
}
