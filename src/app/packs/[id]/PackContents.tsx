'use client';
import { KitSuggestionMenu } from '@/features/suggestions/KitSuggestionMenu';
import {
    ClonePackModal,
    ClonePackModalTrigger,
} from '@/features/pack/clone-modal/ClonePackModal';
import { PackModal } from '@/features/pack/modal/PackModal';
import { PackCloneOption } from '@/features/pack/quick-options/PackCloneOption';
import { PackDeleteOption } from '@/features/pack/quick-options/PackDeleteOption';
import { PackEditInModalOption } from '@/features/pack/quick-options/PackEditInModalOption';
import { usePack } from '@/features/pack/usePack';
import { ChevronDown, EarthIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { PackModalTrigger } from '@/features/pack/modal/PackModalTrigger';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
    PackStatsModal,
    PackStatsModalTrigger,
} from '@/features/pack/stats/PackStatsModal';
import { KitProvider } from '@/features/kit/KitProvider';
import { KitCard } from '@/features/kit/card/KitCard';
import { KitModal, KitModalTrigger } from '@/features/kit/modal/KitModal';
import { DeleteKitOption } from '@/features/kit/quick-options/DeleteKitOption';
import {
    KitOpenModalOption,
    KitOpenEditModalOption,
} from '@/features/kit/quick-options/KitOpenModalOption';
import { KitQuickOptionsMenuButton } from '@/features/kit/quick-options/KitQuickOptionsMenuButton';
import { StandardAddKitButton } from '@/features/kit/new/StandardAddKitButton';

// For some reason next did not like this being in the same file as the PackPage...
export function PackContents() {
    const { pack } = usePack();

    if (!pack) return <div>Pack not found!</div>;
    if (pack.isDeleted)
        return (
            <div>
                <h1 className='text-2xl font-bold'>{pack.name}</h1>
                <div>This pack has been deleted.</div>
            </div>
        );
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center border rounded-md p-4 shadow -mx-2'>
                <div>
                    <h1 className='text-2xl font-bold'>{pack.name}</h1>
                    <div className='text-muted-foreground'>
                        {pack.isPublic && (
                            <span title='This is a publicly shared pack'>
                                <EarthIcon className='h-3 w-3 mr-1 inline-block align-center -translate-y-[1px]' />
                            </span>
                        )}
                        by {pack.userName || 'unknown'}
                    </div>
                </div>
                <PackModal>
                    <ClonePackModal>
                        <div className='flex'>
                            <PackStatsModal>
                                <PackStatsModalTrigger asChild>
                                    <Button
                                        className='mr-2'
                                        variant='outline'
                                        size='sm'
                                    >
                                        Pack Stats
                                    </Button>
                                </PackStatsModalTrigger>
                            </PackStatsModal>
                            <ClonePackModalTrigger asChild>
                                <Button
                                    className='rounded-r-none'
                                    variant='outline'
                                    size='sm'
                                >
                                    Clone
                                </Button>
                            </ClonePackModalTrigger>
                            <PackModalTrigger defaultEditing={true} asChild>
                                <Button
                                    className='rounded-none'
                                    variant='outline'
                                    size='sm'
                                >
                                    Edit
                                </Button>
                            </PackModalTrigger>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className='rounded-l-none'
                                        variant='outline'
                                        size='sm'
                                    >
                                        <ChevronDown size={14} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <PackEditInModalOption />
                                    <PackCloneOption />
                                    <DropdownMenuSeparator />
                                    <PackDeleteOption />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </ClonePackModal>
                </PackModal>
            </div>
            <div className='flex justify-between items-start'>
                <div className='flex gap-1'>
                    <StandardAddKitButton
                        variant='outline'
                        size='sm'
                        className=''
                    />
                    <KitSuggestionMenu
                        variant='outline'
                        size='sm'
                        className='px-2'
                    />
                </div>
            </div>
            <div className='p-2 bg-muted rounded border min-h-[50svh]'>
                <PackNoKitsMessage />
                <PackKitsGrid />
            </div>
        </div>
    );
}
function PackNoKitsMessage({ className }: { className?: string }) {
    const { pack, isReadOnly } = usePack();
    if (pack?.kits.length) return null;
    return (
        <div className={cn('text-muted-foreground', className)}>
            Looks like this pack is empty.
            {!isReadOnly && ' Add a kit to get started!'}
        </div>
    );
}
function PackKitsGrid({ className }: { className?: string }) {
    const { pack, isReadOnly } = usePack();

    if (!pack) return null;
    return (
        <div
            className={cn(
                'grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]',
                className
            )}
        >
            {pack.kits.map((kit) => (
                <KitProvider
                    key={kit.id}
                    packId={kit.packId}
                    isReadOnly={isReadOnly}
                    kit={kit}
                    className='h-full'
                    style={{
                        gridRow: `span ${
                            kit.items.length + (kit.description.length ? 6 : 4)
                        }`,
                    }}
                >
                    <KitModal>
                        <KitModalTrigger className='h-full'>
                            <KitCard className='h-full'>
                                <KitQuickOptionsMenuButton>
                                    <KitOpenModalOption />
                                    <KitOpenEditModalOption />
                                    <DropdownMenuSeparator />
                                    <DeleteKitOption />
                                </KitQuickOptionsMenuButton>
                            </KitCard>
                        </KitModalTrigger>
                    </KitModal>
                </KitProvider>
            ))}
        </div>
    );
}
