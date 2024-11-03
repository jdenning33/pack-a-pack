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
import { AttributeBadge } from '@/features/attributes/AttributeBadge';

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
                className={cn('relative xmax-h-40 overflow-hidden', className)}
                {...cardProps}
            >
                {children}
                <CardHeader className='pb-0'>
                    <div className='flex flex-wrap items-baseline gap-x-3'>
                        <CardTitle className='w-full'>
                            <div className='w-full truncate' title={pack.name}>
                                {pack.name}
                            </div>
                            <div className='font-normal text-muted-foreground text-xs mt-1'>
                                {pack.isPublic && (
                                    <span title='This is a publicly shared pack'>
                                        <EarthIcon className='h-3 w-3 mr-1 inline-block align-center -translate-y-[1px]' />
                                    </span>
                                )}
                                by {pack.userName}
                            </div>
                        </CardTitle>
                    </div>
                </CardHeader>
                <div className='flex flex-wrap gap-1 mx-1 px-3 py-3'>
                    {Object.entries(pack.attributes).map((attr) => (
                        <AttributeBadge
                            key={attr[0]}
                            attribute={{
                                type: attr[0],
                                value: attr[1],
                            }}
                        />
                    ))}
                </div>
                <CardContent className='pt-0'>
                    <CardDescription className='text-sm line-clamp-2'>
                        {pack.description}
                        {!pack.description && (
                            <span className='text-muted-foreground'>
                                No description
                            </span>
                        )}
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
