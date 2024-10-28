'use client';
import React from 'react';
import { LayoutGrid, Plus, Table } from 'lucide-react';
import { Button } from '@/ui/button';
import { AddGearBinButton } from '@/features/gear-bin/components/AddGearBinButton';
import { UserGearBinSearchProvider } from '@/features/gear-bin-search/GearBinSearchProvider';
import { useAuth } from '@/features/auth/useAuth';
import { GearBinList } from '@/features/gear-bin/components/page/GearBinList';

export default function UserGearPage() {
    const { user } = useAuth();

    if (!user)
        return (
            <div>
                <h1>You must be logged in to view this page</h1>
            </div>
        );

    return (
        <main className='container flex flex-col gap-8 sm:p-4 m-auto'>
            <div className='flex justify-between items-center border shadow rounded-md p-4 -mx-4'>
                <h1 className='text-2xl font-bold'>My Gear</h1>
                <div className='flex'>
                    <AddGearBinButton>
                        <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 mr-2'
                        >
                            <Plus size={14} />
                            Add Gear Bin
                        </Button>
                    </AddGearBinButton>

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

            <UserGearBinSearchProvider>
                <GearBinList />
            </UserGearBinSearchProvider>
        </main>
    );
}
