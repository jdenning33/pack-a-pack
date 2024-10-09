'use client';
import { AddPackButton } from '@/features/pack/components/pack/AddPackButton';
import { PackList } from '@/features/pack/components/pack/PackList';
import SimpleProductsProvider from '@/features/products/SimpleProductsProvider';
import { AddProductButton } from '@/features/products/components/AddProductButton';
import { ProductsCarousel } from '@/features/products/components/ProductsCarousel';
import { ProductsList } from '@/features/products/components/ProductsList';
import { Button } from '@/ui/button';
import { ScrollArea } from '@/ui/scroll-area';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <SimpleProductsProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Your Gear</h1>
                        <AddProductButton />
                    </div>
                    <div className='flex h-[70svh] border'>
                        <div className='w-60 flex flex-col h-full border-r p-2'>
                            <h3 className='text-lg font-bold'>Kits</h3>
                            <div className='flex-1'>
                                <ul>
                                    <li>All</li>
                                    <li>Kit 1</li>
                                    <li>Kit 2</li>
                                    <li>Kit 3</li>
                                </ul>
                            </div>{' '}
                            <Button variant='default'>Add Kit</Button>
                        </div>
                        <div className='w-60 flex flex-col h-full border-r p-2'>
                            <h3 className='text-lg font-bold'>Items</h3>
                            <div className='flex-1'>
                                <ul>
                                    <li>All</li>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                            <Button variant='default'>Add Item</Button>
                        </div>
                        <div className='h-full flex flex-col'>
                            Search
                            <ScrollArea className='flex-1'>
                                <div>
                                    <div className='p-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
                                        <ProductsList productClassName='break-inside-avoid' />
                                    </div>{' '}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </SimpleProductsProvider>
            </div>
        </main>
    );
}
