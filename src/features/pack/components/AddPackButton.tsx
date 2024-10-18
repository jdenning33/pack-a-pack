import { Button } from '@/ui/button';
import { Plus } from 'lucide-react';
import { PackModal } from './PackModal';
import { useAuth } from '@/features/auth/useAuth';

// PackAddButton Component
export const AddPackButton = (props: React.ComponentProps<typeof Button>) => {
    const { user } = useAuth();
    return (
        <PackModal>
            <Button
                {...props}
                disabled={!user}
                disabledTitle='You must be logged in to add a pack'
            >
                <Plus className='mr-2 h-4 w-4' /> Add New Pack
            </Button>
        </PackModal>
    );
};
