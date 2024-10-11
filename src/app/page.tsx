'use client';
import { AddPackButton } from '@/features/pack/components/pack/AddPackButton';
import { PackCard } from '@/features/pack/components/pack/PackCard';
import { PackList } from '@/features/pack/components/pack/PackList';
import { ZustandGearProvider } from '@/features/gear/ZustandGearProvider';
import { Button } from '@/ui/button';
import { ImageWithFallback } from '@/ui/image-with-fallback';
import { ScrollArea } from '@/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import Link from 'next/link';
import { GearCarousel } from '@/features/gear/components/GearCarousel';
import { SupabasePacksProvider } from '@/features/pack/hooks/SupabasePacksProvider';

export default function Home() {
    return (
        <main className='flex-1'>
            <ZustandGearProvider>
                <div className='container mx-auto py-4 flex flex-col gap-8'>
                    <div className='flex gap-8'>
                        <div className='max-w-2xl  flex-auto'>
                            <SupabasePacksProvider>
                                <HomePagePackTabs />
                            </SupabasePacksProvider>
                        </div>
                        <div className='relative flex-1'>
                            <Link href='#'>
                                <ImageWithFallback
                                    src='https://www.rei.com/dam/19792690_sahara-clothing-sct_web_med.jpeg'
                                    alt={''}
                                    className='rounded-lg'
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Tabs defaultValue='community'>
                            <TabsList>
                                <TabsTrigger value='user'>My Gear</TabsTrigger>
                                <TabsTrigger value='community'>
                                    Popular Gear
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value='user'>
                                <ZustandGearProvider>
                                    <GearCarousel />
                                </ZustandGearProvider>
                            </TabsContent>
                            <TabsContent value='community'>
                                <ZustandGearProvider>
                                    <GearCarousel />
                                </ZustandGearProvider>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </ZustandGearProvider>
        </main>
    );
}
function HomePagePackTabs() {
    return (
        <Tabs defaultValue='my-packs'>
            <div className='flex flex-col h-full'>
                <div className='flex w-full items-end'>
                    <TabsList>
                        <TabsTrigger value='my-packs'>My Packs</TabsTrigger>
                        <TabsTrigger value='community'>
                            Community Packs
                        </TabsTrigger>
                    </TabsList>
                    <AddPackButton
                        variant='ghost'
                        size='sm'
                        className='ml-auto'
                    />
                </div>
                <div className='border bg-muted rounded-lg p-2 mt-2 flex-1'>
                    <TabsContent
                        value='my-packs'
                        className='mt-0 flex flex-col'
                    >
                        <ScrollArea className='overflow-auto h-[20rem]'>
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                                <PackList />
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
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                                {[
                                    {
                                        id: '1',
                                        isPublic: true,
                                        isGearLocker: false,

                                        name: 'Appalachian Trail Essentials',
                                        createdByName: 'TrailMaster99',
                                        description:
                                            'This pack contains all the essentials for a successful Appalachian Trail hike.',
                                    },
                                    {
                                        id: '2',
                                        isPublic: true,
                                        isGearLocker: false,

                                        name: 'Pacific Crest Trail Gear',
                                        createdByName: 'WestCoastHiker',
                                        description:
                                            'This pack contains all the essentials for a successful Pacific Crest Trail hike.',
                                    },
                                    {
                                        id: '3',
                                        isPublic: true,
                                        isGearLocker: false,

                                        name: 'Ultralight European Trek',
                                        createdByName: 'AlpineAdventurer',
                                        description:
                                            'This pack contains all the essentials for a successful European trek.',
                                    },
                                    {
                                        id: '4',
                                        isPublic: true,
                                        isGearLocker: false,

                                        name: 'South American Adventure',
                                        createdByName: 'JungleExplorer',
                                        description:
                                            'This pack contains all the essentials for a successful South American adventure.',
                                    },
                                    {
                                        id: '5',
                                        isPublic: true,
                                        isGearLocker: false,
                                        name: 'Winter Wonderland',
                                        createdByName: 'SnowQueen',
                                        description:
                                            'This pack contains all the essentials for a successful winter hike.',
                                    },
                                ].map((pack) => (
                                    <PackCard key={pack.id} pack={pack} />
                                ))}
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
