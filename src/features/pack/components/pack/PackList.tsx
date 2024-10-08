import { Button } from '@/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import { Trash2 } from 'lucide-react';
import { AddPackButton } from './AddPackButton';
import Link from 'next/link';
import { usePacks } from '../../hooks/usePacks';

// PackList Component
export const PackList = () => {
    const { packs, deletePack } = usePacks();

    return (
        <div className='mx-auto p-4 w-full flex flex-col'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Your Packs</h1>
                <AddPackButton />
            </div>
            <div className='columns-[300px]'>
                {packs.map((pack) => (
                    <Link key={pack.id} href={`/packs/${pack.id}`}>
                        <Card
                            key={pack.id}
                            className='flex flex-col h-full break-inside-avoid'
                        >
                            <CardHeader>
                                <CardTitle className='text-xl'>
                                    {pack.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='flex-grow'>
                                <p className='text-sm text-muted-foreground'>
                                    {pack.description}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant='destructive'
                                    onClick={() => deletePack(pack.id)}
                                >
                                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
