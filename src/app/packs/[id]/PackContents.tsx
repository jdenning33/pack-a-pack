'use client';
import { KitSuggestionMenu } from '@/features/suggestions/KitSuggestionMenu';
import { StandardAddKitButton } from '@/features/kit/components/StandardAddKitButton';
import { PackKitsGrid } from '@/features/pack/components/PackKitsGrid';
import { ClonePackModal } from '@/features/pack/components/clone-modal/ClonePackModal';
import { PackModal } from '@/features/pack/components/modal/PackModal';
import { PackCloneOption } from '@/features/pack/components/quick-options/PackCloneOption';
import { PackDeleteOption } from '@/features/pack/components/quick-options/PackDeleteOption';
import { PackEditInModalOption } from '@/features/pack/components/quick-options/PackEditInModalOption';
import { PackQuickOptionsMenu } from '@/features/pack/components/quick-options/PackQuickOptionsMenuButton';
import { usePack } from '@/features/pack/usePack';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

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
            <div className='flex justify-between items-end'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-2xl font-bold'>{pack.name}</h1>
                    <PackModal>
                        <ClonePackModal>
                            <PackQuickOptionsMenu useStaticPosition={true}>
                                <PackEditInModalOption />
                                <PackCloneOption />
                                <DropdownMenuSeparator />
                                <PackDeleteOption />
                            </PackQuickOptionsMenu>
                        </ClonePackModal>
                    </PackModal>
                </div>
                <div className='flex gap-1'>
                    <StandardAddKitButton
                        variant='secondary'
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
            <PackNoKitsMessage />
            <PackKitsGrid />
        </div>
    );
}
export function PackNoKitsMessage({ className }: { className?: string }) {
    const { pack, isReadOnly } = usePack();
    if (pack?.kits.length) return null;
    return (
        <div className={className}>
            Looks like this pack is empty.
            {!isReadOnly && ' Add a kit to get started!'}
        </div>
    );
}
