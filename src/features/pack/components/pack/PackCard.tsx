import { Button } from '@/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { PackSummary } from '../../hooks/usePacks';
import Link from 'next/link';

export function PackCard({
    pack,
    className,
}: {
    pack: PackSummary;
    className?: string;
}) {
    return (
        <Card key={pack.id} className={className}>
            <CardHeader>
                <CardTitle className=''>{pack.name}</CardTitle>
                <CardDescription>{'jdenning'}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm'>{pack.description}</p>
            </CardContent>
            <CardFooter className='p-2 px-4 m-auto'>
                <Link key={pack.id} href={`/packs/${pack.id}`}>
                    <Button>View Pack</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
