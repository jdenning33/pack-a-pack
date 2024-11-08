import { DialogHeader, DialogTitle } from '@/ui/dialog';
import { useAuth } from '../../auth/useAuth';
import { useProfileModal } from './ProfileModal';
import { EditProfileForm } from '../edit/EditProfileForm';
import { ProfileEditFormContents } from '../edit/ProfileEditFormContents';

export function ProfileModalEditContents() {
    const { isEditing, setIsEditing } = useProfileModal();
    const { profile } = useAuth();

    if (!profile) return null;
    if (!isEditing) return null;
    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <EditProfileForm
                onFinished={() => setIsEditing(false)}
                className='space-y-6 -mt-2'
            >
                <ProfileEditFormContents />
            </EditProfileForm>
        </>
    );
}
