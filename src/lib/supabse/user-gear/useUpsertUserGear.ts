import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

export function useUpsertUserGear(userId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            gearId,
            isRetired = false,
        }: {
            gearId: string;
            isRetired: boolean;
        }): Promise<string> => {
            if (!userId) {
                throw new Error('You must be signed in to save items.');
            }

            const { data: userGear, error: userGearError } = await supabase
                .from('user_gear')
                .upsert({
                    gear_id: gearId,
                    user_id: userId,
                    is_retired: isRetired,
                })
                .select()
                .single();
            if (userGearError) throw userGearError;
            return userGear?.id;
        },
        onError: (err, _item, _context) => {
            console.error('Failed to save user gear:', err);
            toast.error('Failed to update user gear.', {
                description:
                    (err as { message: string }).message ||
                    JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });
            toast.success('User gear saved.');
        },
    });
}
