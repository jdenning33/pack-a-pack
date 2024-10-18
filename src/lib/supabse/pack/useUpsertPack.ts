import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { Pack, PackSummary } from '@/lib/appTypes';
import { appToSupabasePack } from '../supabaseTypes';
import { optimisticUpdateHandler } from '../optimisticUpdateHandler';
import { toast } from 'sonner';
import { Optional } from '@/lib/utils';

export function useUpsertPack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            pack: Optional<Pack | PackSummary, 'id'>
        ): Promise<string> => {
            const supabasePack = appToSupabasePack(pack);
            console.log('supabasePack:', supabasePack);
            const { data, error } = await supabase
                .from('packs')
                .upsert(supabasePack)
                .select()
                .single();

            if (error) throw error;
            return data?.id;
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
                description: JSON.stringify(err),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pack'] });
            queryClient.invalidateQueries({ queryKey: ['packs'] });
            toast.success('Pack saved.');
        },
    });
}
