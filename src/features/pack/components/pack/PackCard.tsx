import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { PackSummary } from '@/lib/appTypes';
import { cn } from '@/lib/utils';
import { PackQuickOptionsMenuButton } from './PackQuickOptionsMenuButton';

export function PackCard({
    pack,
    className,
}: {
    pack: PackSummary;
    className?: string;
}) {
    return (
        <Card key={pack.id} className={cn('relative', className)}>
            <PackQuickOptionsMenuButton
                pack={pack}
                className='absolute top-1 right-1'
            />
            <CardHeader>
                <CardTitle className=''>{pack.name}</CardTitle>
                <CardDescription>{'jdenning'}</CardDescription>
            </CardHeader>
            <CardContent className=''>
                <p className='text-sm'>{pack.description}</p>
            </CardContent>
            {/* <CardFooter className='p-2 px-4 m-auto'>
                <Link key={pack.id} href={`/packs/${pack.id}`}>
                    <Button>View Pack</Button>
                </Link>
            </CardFooter> */}
        </Card>
    );
}
