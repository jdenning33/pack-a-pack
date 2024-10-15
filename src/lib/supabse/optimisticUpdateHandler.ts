import { QueryClient, QueryKey } from 'react-query';
import { QueryFilters } from 'react-query/types/core/utils';

type RollbackData = {
    queryKey: QueryKey;
    previousData: unknown;
};
type EntityWithOptionalId = {
    id?: string;
};

export async function optimisticUpdateHandler<T extends EntityWithOptionalId>(
    queryClient: QueryClient,
    queryFilter: QueryFilters,
    updatedItem: T
): Promise<RollbackData[]> {
    const rollbackData: RollbackData[] = [];

    // Cancel queries before updating
    await queryClient.cancelQueries(queryFilter);

    // Get all queries matching the filter
    const queriesData = queryClient.getQueriesData(queryFilter);

    queriesData.forEach(([queryKey, _oldData]) => {
        queryClient.setQueryData<T | T[] | undefined>(
            queryKey,
            (currentData) => {
                // Ensure we're working with the most current data
                const dataToUpdate = currentData;

                // Store the previous data for potential rollback
                rollbackData.push({ queryKey, previousData: dataToUpdate });

                if (!dataToUpdate) return dataToUpdate;

                if (Array.isArray(dataToUpdate)) {
                    return dataToUpdate.map((item) =>
                        (item as EntityWithOptionalId).id === updatedItem.id
                            ? { ...item, ...updatedItem }
                            : item
                    );
                }

                if (
                    typeof dataToUpdate === 'object' &&
                    'id' in dataToUpdate &&
                    dataToUpdate.id === updatedItem.id
                ) {
                    return { ...dataToUpdate, ...updatedItem };
                }

                return dataToUpdate;
            }
        );
    });

    return rollbackData;
}
