import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { cn } from '@/lib/utils';
import { usePack } from '../../usePack';

export function PackCard({
    className,
    children,
    ...cardProps
}: {
    className?: string;
} & React.ComponentProps<typeof Card>) {
    const { pack } = usePack();
    if (!pack) return null;
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
