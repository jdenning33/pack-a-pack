import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { PackSummary } from '@/lib/appTypes';
import { cn } from '@/lib/utils';

export function PackCard({
    pack,
    className,
    children,
    ...cardProps
}: {
    pack: PackSummary;
    className?: string;
} & React.ComponentProps<typeof Card>) {
    return (
        <>
            <Card
                key={pack.id}
                className={cn('relative', className)}
                {...cardProps}
            >
                {children}
                <CardHeader>
                    <CardTitle className=''>{pack.name}</CardTitle>
                    <CardDescription>{pack.userName}</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <p className='text-sm'>{pack.description}</p>
                </CardContent>
            </Card>
        </>
    );
}
