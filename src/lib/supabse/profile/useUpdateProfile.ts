import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Profile } from '@/lib/appTypes';
import { appToSupabaseProfile } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            profile: Optional<Profile, 'id'>
        ): Promise<string> => {
            const supabaseProfile = appToSupabaseProfile(profile);
            console.log('supabaseProfile', supabaseProfile);
            const { data, error } = await supabase
                .from('profiles')
                .upsert(supabaseProfile)
                .select()
                .single();
            if (error) throw error;
            return data?.id;
        },
        onMutate: async (profile) => {
            // Optimistically update the cache with the new or updated profile
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['profiles'] },
                profile
            );
            return { rollbackData };
        },
        onError: (err, _profile, context) => {
            console.error('Failed to save profile:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save profile.', {
                description: JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            toast.success('Profile saved.');
        },
    });
}
