import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { cn } from '@/lib/utils';
import { usePack } from '../../usePack';
import { EarthIcon } from 'lucide-react';

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
                <CardHeader className='pb-3'>
                    <CardTitle className=''>{pack.name}</CardTitle>
                    <CardDescription>
                        {pack.isPublic && (
                            <span title='This is a publicly shared pack'>
                                <EarthIcon className='h-3 w-3 mr-1 inline-block align-center -translate-y-[1px]' />
                            </span>
                        )}
                        {pack.userName}
                    </CardDescription>
                </CardHeader>
                <CardContent className='pt-0'>
                    <p className='text-sm'>
                        {pack.description}
                        {!pack.description && (
                            <span className='text-muted-foreground'>
                                No description
                            </span>
                        )}
                    </p>
                </CardContent>
            </Card>
        </>
    );
}
