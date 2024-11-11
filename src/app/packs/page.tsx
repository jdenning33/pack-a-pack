'use client';
import { PackSearchBar } from '@/features/pack/search/PacksSearchBar';
import { PackSearchProvider } from '@/features/pack/search/PackSearchProvider';
import { StandardAddPackButton } from '@/features/pack/new/StandardAddPackButton';
import { useAuth } from '@/features/auth/useAuth';
import { usePacks } from '@/features/pack/search/usePackSearch';
import { LoadedPackProvider } from '@/features/pack/LoadedPackProvider';
import { PackCard } from '@/features/pack/card/PackCard';
import { PackModal } from '@/features/pack/modal/PackModal';
import { PackModalTrigger } from '@/features/pack/modal/PackModalTrigger';
import { PackDeleteOption } from '@/features/pack/quick-options/PackDeleteOption';
import { PackEditInModalOption } from '@/features/pack/quick-options/PackEditInModalOption';
import { PackGoToDetailsPageOption } from '@/features/pack/quick-options/PackGoToDetailsPageOption';
import { PackQuickOptionsMenu } from '@/features/pack/quick-options/PackQuickOptionsMenuButton';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Accordion, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';

export default function PacksPage() {
    const { user } = useAuth();
    if (!user) return null;
    return (
        <main className='container flex flex-col gap-8 m-auto'>
            <PackSearchProvider
                searchDefaults={{
                    packUserId: user.id,
                }}
            >
                <div className='mx-auto p-4 w-full flex flex-col'>
                    <div className='flex justify-between items-center border rounded-md p-4 shadow mb-6 -mx-2'>
                        <h1 className='text-2xl font-bold'>My Packs</h1>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <PackSearchBar className='flex-1' />{' '}
                        <StandardAddPackButton variant='outline' />
                    </div>

                    <div className='p-2 xborder xborder-opacity-50 bg-muted/50 rounded-md'>
                        <FilteredPackList past={false} />
                    </div>

                    <Accordion type='multiple' defaultValue={['past']}>
                        <AccordionItem value='past'>
                            <AccordionTrigger className='justify-start'>
                                <h2 className='text-lg font-bold'>
                                    Past Packs
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='bg-muted rounded-md border p-2 min-h-32'>
                                    <FilteredPackList past={true} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </PackSearchProvider>
        </main>
    );
}

const FilteredPackList = ({ past }: { past?: boolean }) => {
    const { packs } = usePacks();
    return (
        <div className='grid gap-2 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]'>
            {packs
                .filter((pack) => past === pack.isTripCompleted)
                .map((pack) => (
                    <LoadedPackProvider
                        key={pack.id}
                        pack={{ ...pack, kits: [] }}
                    >
                        <PackModal>
                            <PackModalTrigger>
                                <PackCard className='h-full rounded'>
                                    <PackQuickOptionsMenu>
                                        <PackGoToDetailsPageOption />
                                        <PackEditInModalOption />
                                        <DropdownMenuSeparator />
                                        <PackDeleteOption />
                                    </PackQuickOptionsMenu>
                                </PackCard>
                            </PackModalTrigger>
                        </PackModal>
                    </LoadedPackProvider>
                ))}
        </div>
    );
};
