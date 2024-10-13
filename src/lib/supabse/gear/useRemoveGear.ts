import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
// Remove gear

export function useRemoveGear() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (gearId: string) => {
            const { error } = await supabase
                .from('gear')
                .delete()
                .eq('id', gearId)
                .select()
                .single();
            if (error) throw error;
        },
        onError: (e, gearId) => {
            toast.error('Failed to remove gear"' + gearId + '"', {
                description: JSON.stringify(e, null, 2) || 'An error occurred',
            });
        },
        onSuccess: (_data, gearId, _context) => {
            queryClient.invalidateQueries({ queryKey: ['gear'] });
            toast.success('Gear deleted successfully "' + gearId + '"');
        },
    });
}
