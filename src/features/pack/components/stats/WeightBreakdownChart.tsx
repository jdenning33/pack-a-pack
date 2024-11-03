'use client';
import {
    ChartContainer,
    ChartLegend,
    ChartTooltip,
    ChartTooltipContent,
} from '@/ui/chart';
import { useFormatWeight } from '@/lib/utils';
import { PieChart, Pie, Cell } from 'recharts';

export function WeightBreakdownChart({
    weightBreakdown: weightByKit,
}: {
    weightBreakdown: { name: string; weight: number }[];
}) {
    const formatWeight = useFormatWeight();

    const MyChartLegendContent = ({
        payload,
    }: {
        payload?: {
            color: string;
            payload: { name: string; weight: number };
        }[];
    }) => {
        return (
            <table className='list-none p-0'>
                <tbody>
                    {payload?.map((entry, index: number) => (
                        <tr
                            key={`legend-item-${index}`}
                            className='items-center gap-2 mb-2 [&>td:not(:first-child)]:px-1'
                        >
                            <td
                                className='inline-block w-3 h-3 rounded-sm align-bottom'
                                style={{ backgroundColor: entry.color }}
                            />
                            <td className='text-sm'>{entry.payload.name}</td>
                            <td className='ml-2 text-muted-foreground '>
                                {formatWeight(entry.payload.weight)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <ChartContainer
            config={{
                weight: {
                    label: 'Weight',
                    color: 'hsl(var(--chart-1))',
                },
            }}
            className='mx-auto xaspect-square h-[15rem] flex-1'
        >
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                    data={weightByKit}
                    dataKey='weight'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    strokeWidth={5}
                    outerRadius={100}
                    fill='var(--color-weight)'
                >
                    {weightByKit.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`hsl(var(--chart-${(index % 12) + 1}))`}
                        />
                    ))}
                </Pie>
                <ChartLegend
                    align='left'
                    verticalAlign='middle'
                    layout='vertical'
                    content={<MyChartLegendContent />}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            labelKey='formattedWeight'
                            valueFormatter={(value) => (
                                <span className='ml-2'>
                                    {formatWeight(value as number)}
                                </span>
                            )}
                        />
                    }
                />
            </PieChart>
        </ChartContainer>
    );
}
