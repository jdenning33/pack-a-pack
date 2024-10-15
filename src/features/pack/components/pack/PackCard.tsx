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
import { PackModal } from './PackModal';
import { useState } from 'react';

export function PackCard({
    pack,
    className,
    ...cardProps
}: {
    pack: PackSummary;
    className?: string;
} & React.ComponentProps<typeof Card>) {
    const [showPackModal, setShowPackModal] = useState(false);

    return (
        <>
            <PackModal
                pack={pack}
                isOpen={showPackModal}
                onOpenChange={setShowPackModal}
                isEditing={true}
            >
                <span></span>
            </PackModal>
            <Card
                key={pack.id}
                className={cn('relative', className)}
                {...cardProps}
            >
                <PackQuickOptionsMenuButton
                    pack={pack}
                    className='absolute top-1 right-1'
                    onEditRequested={() => {
                        setShowPackModal(true);
                    }}
                />
                <CardHeader>
                    <CardTitle className=''>{pack.name}</CardTitle>
                    <CardDescription>{pack.userName}</CardDescription>
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
        </>
    );
}
