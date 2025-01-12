import { useMutation, useQueryClient } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { UserGearBin } from '@/lib/appTypes';
import { appToSupabaseUserGearBin } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertUserGearBin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            bin: Optional<UserGearBin, 'id'>
        ): Promise<string> => {
            const supabase = createClient();
            const supabaseBin = appToSupabaseUserGearBin(bin);
            console.log('supabaseBin', supabaseBin);
            const { data, error } = await supabase
                .from('user_gear_bins')
                .upsert(supabaseBin)
                .select()
                .single();
            if (error) throw error;
            return data?.id;
        },
        onMutate: async (bin) => {
            // Optimistically update the cache with the new or updated bin
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['user_gear_bins'] },
                bin
            );
            return { rollbackData };
        },
        onError: (err, _bin, context) => {
            console.error('Failed to save bin:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save bin.', {
                description: JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_gear_bins'] });
            toast.success('Bin saved.');
        },
    });
}
