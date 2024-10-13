import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Pack } from '@/lib/appTypes';
import { appToSupabasePack, supabaseToAppPack } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertPack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (pack: Optional<Pack, 'id'>) => {
            const supabasePack = appToSupabasePack(pack);
            const { data, error } = await supabase
                .from('packs')
                .upsert(supabasePack)
                .select()
                .single();

            if (error) throw error;
            return supabaseToAppPack(data);
        },
        onMutate: async (pack) => {
            // Optimistically update the cache with the new or updated pack
            const rollbackData = await optimisticUpdateHandler(
                queryClient,
                { queryKey: ['packs'], exact: false },
                pack
            );
            return { rollbackData };
        },
        onError: (err, _pack, context) => {
            console.error('Failed to save pack:', err);
            // Rollback all affected queries
            context?.rollbackData.forEach(({ queryKey, previousData }) => {
                queryClient.setQueryData(queryKey, previousData);
            });
            toast.error('Failed to save pack.', {
                description:
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packs'] });
            toast.success('Pack saved.');
        },
    });
}
