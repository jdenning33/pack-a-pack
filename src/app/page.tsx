'use client';
import { Button } from '@/ui/button';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { ScrollArea } from '@/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { useEffect, useState } from 'react';
import { AuthSignInButton } from '@/features/auth/components/AuthSignInButton';
import { GearSearchProvider } from '@/features/gear-search/GearSearchProvider';
import { GearCarousel } from '@/features/gear-search/components/GearCarousel';
import { PackSearchProvider } from '@/features/pack-search/PackSearchProvider';
import { PackList } from '@/features/pack-search/components/PackList';
import { StandardAddPackButton } from '@/features/pack/components/StandardAddPackButton';

export default function Home() {
    return (
        <main className='flex-1'>
            <PackSearchProvider>
                <div className='container mx-auto py-4 flex flex-col gap-8'>
                    <div className='flex gap-8'>
                        <div className=' flex-auto'>
                            <HomePagePackTabs />
                        </div>
                        <div className='relative w-72 shrink-0 hidden sm:flex'>
                            <Link
                                href='https://rei.com'
                                target='_blank'
                                className='absolute inset-0'
                            >
                                <ImageWithFallback
                                    src='https://i.pinimg.com/736x/07/d1/59/07d1599c005aa33987cfba860bafc8de.jpg'
                                    alt={''}
                                    className='object-fill'
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
            </PackSearchProvider>
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
                    <GearSearchProvider
                        defaultSearchParams={{
                            gearType: 'user',
                            gearUserId: user?.id,
                        }}
                    >
                        <GearCarousel />
                    </GearSearchProvider>
                </AuthGuard>
            </TabsContent>
            <TabsContent value='community'>
                <GearSearchProvider
                    defaultSearchParams={{
                        gearType: 'public',
                    }}
                >
                    <GearCarousel />
                </GearSearchProvider>
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
                        <StandardAddPackButton
                            variant='ghost'
                            size='sm'
                            className='ml-auto'
                        />
                    </AuthGuard>
                </div>
                <div className='border bg-muted rounded-lg p-2 mt-2 flex-1'>
                    <ScrollArea className='overflow-auto h-[20rem]'>
                        <TabsContent value='user' className='mt-0'>
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
                                    <PackSearchProvider
                                        searchDefaults={{
                                            packUserId: user?.id || '',
                                        }}
                                    >
                                        <PackList packClassName='h-full' />
                                    </PackSearchProvider>
                                </AuthGuard>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value='community'
                            className='mt-0 flex flex-col'
                        >
                            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
                                <PackSearchProvider
                                    searchDefaults={{
                                        excludePrivatePacks: true,
                                    }}
                                >
                                    <PackList packClassName='h-full' />
                                </PackSearchProvider>
                            </div>
                        </TabsContent>
                    </ScrollArea>
                    <TabsContent
                        value='user'
                        className='mt-0 w-full flex justify-center'
                    >
                        <Button
                            className='-mb-2 mt-1 p-0 mx-auto'
                            variant='link'
                        >
                            My Packs
                        </Button>
                    </TabsContent>
                    <TabsContent
                        value='community'
                        className='mt-0 w-full flex justify-center'
                    >
                        <Button
                            className='-mb-2 mt-1 p-0 mx-auto'
                            variant='link'
                        >
                            Explore Packs
                        </Button>
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    );
}
