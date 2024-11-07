export function getNewOrderValue<T extends { id: string; order: number }>(
    droppedOnId: string,
    items: T[]
) {
    const sortedItems = items.sort((a, b) => a.order - b.order);
    const droppedOnItemIndex = sortedItems.findIndex(
        (s) => s.id === droppedOnId
    );
    if (droppedOnItemIndex == -1) return;

    const droppedOnItem = sortedItems[droppedOnItemIndex];

    const nextOrder = sortedItems[droppedOnItemIndex - 1];
    const increment = nextOrder
        ? (nextOrder.order - droppedOnItem.order) / 2
        : -1;
    return droppedOnItem.order + increment;
}
