import { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { usePacks } from '../../pack-search/usePackSearch';
import { useAuth } from '@/features/auth/useAuth';
import { toast } from 'sonner';
import { PackSummary } from '@/lib/appTypes';

export function EditPackForm({
    pack,
    onFinished,
}: {
    pack?: PackSummary;
    onFinished: (packId?: string) => void;
}) {
    interface PackFormData {
        name: string;
        description: string;
        isPublic: boolean;
        isGearLocker: boolean;
    }
    const [formData, setFormData] = useState<PackFormData>({
        name: pack?.name || '',
        description: pack?.description || '',
        isPublic: pack?.isPublic || false,
        isGearLocker: pack?.isGearLocker || false,
    });
    const { upsertPack } = usePacks();
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error('You must be signed in to create or edit a pack.');
            return;
        }

        const packData = {
            ...formData,
            userId: user.id,
            isDeleted: false,
        };
        const upsertId = await upsertPack({ ...pack, ...packData });
        onFinished(upsertId);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
                placeholder='Pack Name'
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                required
            />
            <Textarea
                placeholder='Pack Description'
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
                required
            />
            <Button type='submit'>{pack ? 'Update' : 'Create'} Pack</Button>
        </form>
    );
}
