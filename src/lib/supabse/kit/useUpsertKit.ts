import { useMutation, useQueryClient } from 'react-query';
import { createClient } from '@/lib/supabse/supabaseClient';
import { Kit } from '@/lib/appTypes';
import { appToSupabaseKit } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertKit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (kit: Optional<Kit, 'id'>): Promise<string> => {
            const supabase = createClient();
            const supabaseKit = appToSupabaseKit(kit);
            console.log('supabaseKit', supabaseKit);
            const { data, error } = await supabase
                .from('kits')
                .upsert(supabaseKit)
                .select()
                .single();
            if (error) throw error;
            return data?.id;
        },
        onMutate: async (kit) => {
            // Optimistically update the cache with the new or updated kit
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['kits'] },
                kit
            );
            return { rollbackData };
        },
        onError: (err, _kit, context) => {
            console.error('Failed to save kit:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save kit.', {
                description: JSON.stringify(err, null, 2),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kits'] });
            toast.success('Kit saved.');
        },
    });
}
