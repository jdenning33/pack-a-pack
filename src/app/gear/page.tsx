'use client';
import { AddProductButton } from '@/features/products/components/AddProductButton';
import { ProductsSearchBar } from '@/features/products/components/ProductsSearchBar';
import { ProductsList } from '@/features/products/components/ProductsList';
import { ZustandProductsProvider } from '@/features/products/ZustandProductsProvider';

export default function PacksPage() {
    return (
        <main className='flex flex-col gap-8'>
            <div className='mx-auto p-4 w-full flex flex-col'>
                <ZustandProductsProvider>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold'>Your Gear</h1>
                        <AddProductButton />
                    </div>
                    <div>
                        <ProductsSearchBar className='mb-6' />
                        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
                            <ProductsList productClassName='break-inside-avoid' />
                        </div>
                    </div>
                </ZustandProductsProvider>
            </div>
        </main>
    );
}
