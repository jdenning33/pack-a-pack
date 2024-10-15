'use client';
import { AddPackButton } from '@/features/pack/components/pack/AddPackButton';
import { PackList } from '@/features/pack/components/pack/PackList';
import { Button } from '@/ui/button';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { ScrollArea } from '@/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import Link from 'next/link';
import { GearCarousel } from '@/features/gear/components/GearCarousel';
import { SupabasePacksProvider } from '@/features/pack/hooks/SupabasePacksProvider';
import { SupabaseGearProvider } from '@/features/gear/SupabaseGearProvider';
import { useAuth } from '@/features/auth/useAuth';
import { AuthGuard } from '@/features/auth/AuthGuard';
import { useEffect, useState } from 'react';
import { AuthSignInButton } from '@/features/auth/AuthSignInButton';

export default function Home() {
    return (
        <main className='flex-1'>
            <SupabaseGearProvider>
                <SupabasePacksProvider>
                    <div className='container mx-auto py-4 flex flex-col gap-8'>
                        <div className='flex gap-8'>
                            <div className=' flex-auto'>
                                <HomePagePackTabs />
                            </div>
                            <div className='relative w-72 hidden sm:flex'>
                                <Link href='#' className='absolute inset-0'>
                                    <ImageWithFallback
                                        src='https://www.rei.com/dam/19792690_sahara-clothing-sct_web_med.jpeg'
                                        alt={''}
                                        className='rounded-lg object-fill'
                                        priority={true}
                                        fill={true}
                                        sizes='100% 100%'
                                    />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <HomePageGearTabs />
                        </div>
                    </div>
                </SupabasePacksProvider>
            </SupabaseGearProvider>
        </main>
    );
}

function HomePageGearTabs() {
    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = useState('community');
    const hasUser = !!user;
    useEffect(() => {
        if (hasUser) setSelectedTab('user');
    }, [hasUser]);

    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
                <TabsTrigger value='user'>My Gear</TabsTrigger>
                <TabsTrigger value='community'>Community Gear</TabsTrigger>
            </TabsList>
            <TabsContent value='user'>
                <AuthGuard
                    fallback={
                        <div>
                            Sign in or sign up to view your gear.
                            <AuthSignInButton />
                        </div>
                    }
                >
                    <SupabaseGearProvider
                        defaultSearchParams={{
                            gearType: 'user',
                            gearUserId: user?.id,
                        }}
                    >
                        <GearCarousel />
                    </SupabaseGearProvider>
                </AuthGuard>
            </TabsContent>
            <TabsContent value='community'>
                <SupabaseGearProvider
                    defaultSearchParams={{
                        gearType: 'public',
                    }}
                >
                    <GearCarousel />
                </SupabaseGearProvider>
            </TabsContent>
        </Tabs>
    );
}

function HomePagePackTabs() {
    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = useState('community');
    const hasUser = !!user;
    useEffect(() => {
        if (hasUser) setSelectedTab('user');
    }, [hasUser]);
    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className='flex flex-col h-full'>
                <div className='flex w-full items-end'>
                    <TabsList>
                        <TabsTrigger value='user'>My Packs</TabsTrigger>
                        <TabsTrigger value='community'>
                            Community Packs
                        </TabsTrigger>
                    </TabsList>
                    <AuthGuard fallback={<div className='ml-auto' />}>
                        <AddPackButton
                            variant='ghost'
                            size='sm'
                            className='ml-auto'
                        />
                    </AuthGuard>
                </div>
                <div className='border bg-muted rounded-lg p-2 mt-2 flex-1'>
                    <TabsContent value='user' className='mt-0 flex flex-col'>
                        <ScrollArea className='overflow-auto h-[20rem]'>
                            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                                <AuthGuard
                                    fallback={
                                        <div>
                                            Sign in or sign up to view your
                                            packs.
                                            <AuthSignInButton />
                                        </div>
                                    }
                                >
                                    <SupabasePacksProvider
                                        searchDefaults={{
                                            packUserId: user?.id || '',
                                        }}
                                    >
                                        <PackList />
                                    </SupabasePacksProvider>
                                </AuthGuard>
                            </div>
                        </ScrollArea>
                        <Button className='-mb-2 p-0 mx-auto' variant='link'>
                            View All Packs
                        </Button>
                    </TabsContent>
                    <TabsContent
                        value='community'
                        className='mt-0 flex flex-col'
                    >
                        <ScrollArea className='overflow-auto h-[20rem]'>
                            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                                <SupabasePacksProvider
                                    searchDefaults={{
                                        excludePrivatePacks: true,
                                    }}
                                >
                                    <PackList />
                                </SupabasePacksProvider>
                            </div>
                        </ScrollArea>
                        <Button className='-mb-2 p-0 mx-auto' variant='link'>
                            View All Packs
                        </Button>
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    );
}
