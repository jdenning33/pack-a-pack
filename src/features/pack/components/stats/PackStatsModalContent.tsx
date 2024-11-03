'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { usePack } from '../../usePack';
import { useFormatWeight } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { WeightBreakdownChart } from './WeightBreakdownChart';

export function PackStatsModalContent() {
    const { pack } = usePack();
    const formatWeight = useFormatWeight();

    if (!pack) return <div>Pack not found!</div>;

    const allItems = pack.kits.flatMap((kit) => kit.items);
    const totalItems = allItems.length;
    const totalUnweightedItems = allItems.filter(
        (item) => !item.weight && !item.gear?.weight
    ).length;
    const totalWeight = allItems.reduce(
        (acc, item) => acc + (item.weight || item.gear?.weight || 0),
        0
    );

    const weightByKit = pack.kits.map((kit) => {
        const kitWeight = kit.items.reduce(
            (acc, item) => acc + (item.weight || item.gear?.weight || 0),
            0
        );
        return {
            name: kit.name,
            weight: kitWeight,
            formattedWeight: formatWeight(kitWeight),
        };
    });

    let wearableWeight = 0;
    let consumableWeight = 0;
    let baseWeight = 0;

    allItems.forEach((item) => {
        const weightType = item.weightType || item.gear?.weightType || 'base';
        const itemWeight = item.weight || item.gear?.weight || 0;
        if (weightType === 'wearable') wearableWeight += itemWeight;
        if (weightType === 'consumable') consumableWeight += itemWeight;
        if (weightType === 'base') baseWeight += itemWeight;
    });

    const weightByType = [
        { name: 'Base', weight: baseWeight },
        { name: 'Wearable', weight: wearableWeight },
        { name: 'Consumable', weight: consumableWeight },
    ];

    return (
        <div className='space-y-8'>
            <div className='flex flex-wrap gap-4'>
                <div className='flex-1'>
                    <p className='text-sm font-medium'>Total Items</p>
                    <p className='text-2xl font-bold'>{totalItems}</p>
                </div>
                <div className='flex-1'>
                    <p className='text-sm font-medium'>Total Weight</p>
                    <p className='text-2xl font-bold'>
                        {formatWeight(totalWeight)}
                    </p>
                    {totalUnweightedItems > 0 && (
                        <p className='text-sm text-muted-foreground'>
                            {totalUnweightedItems} items have no weight provided
                        </p>
                    )}
                </div>
            </div>
            <Tabs>
                <TabsList>
                    <TabsTrigger value='type'>Weight by Type</TabsTrigger>
                    <TabsTrigger value='kit'>Weight by Kit</TabsTrigger>
                </TabsList>
                <Card className=''>
                    <TabsContent value='type'>
                        <CardHeader>
                            <CardTitle>Weight Breakdown By Type</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-wrap'>
                            <WeightBreakdownChart
                                weightBreakdown={weightByType}
                            />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value='kit'>
                        <CardHeader>
                            <CardTitle>Weight Breakdown By Kit</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-wrap'>
                            <WeightBreakdownChart
                                weightBreakdown={weightByKit}
                            />
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    );
}
