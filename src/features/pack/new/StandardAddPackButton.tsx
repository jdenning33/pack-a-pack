import { useState } from 'react';
import { LoadedPackProvider } from '../LoadedPackProvider';
import { PackModal } from '../modal/PackModal';
import { Button } from '@/ui/button';
import { useAuth } from '@/features/auth/useAuth';
import { Plus } from 'lucide-react';
import { usePacks } from '@/features/pack/search/usePackSearch';
import { useRouter } from 'next/navigation';

export function StandardAddPackButton({
    ...buttonProps
}: React.ComponentProps<typeof Button>) {
    const { user } = useAuth();
    const { packs } = usePacks();
    const [editPackId, setEditPackId] = useState<string | null>(null);
    const pack = packs.find((pack) => pack.id === editPackId);
    const router = useRouter();

    return (
        <>
            {editPackId && (
                <LoadedPackProvider
                    pack={{ ...pack!, kits: [] }}
                    afterPackUpdated={(p) => {
                        setEditPackId(p.id);
                        router.push(`/packs/${p.id}`);
                    }}
                >
                    <PackModal
                        isOpen={true}
                        isEditing={true}
                        onIsEditingChange={(editing) =>
                            !editing && setEditPackId(null)
                        }
                        onIsOpenChange={(open) => !open && setEditPackId(null)}
                    />
                </LoadedPackProvider>
            )}
            <Button
                onClick={() => setEditPackId('new')}
                variant='outline'
                size='sm'
                {...buttonProps}
                disabled={!user}
                disabledTitle='You must be logged in to add a pack'
            >
                <Plus className='mr-2 h-4 w-4' /> New Pack
            </Button>
        </>
    );
}
