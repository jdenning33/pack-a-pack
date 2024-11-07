import { GearProvider } from '@/features/gear/GearProvider';
import { useGearBin } from '@/features/gear-bin/useGearBin';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Gear } from '@/lib/appTypes';

export function GearBinGearGrid({
    children,
    filter,
}: {
    children?: React.ReactNode;
    filter?: (gear: Gear) => boolean;
}) {
    const [animate] = useAutoAnimate();

    const { gearBin } = useGearBin();
    const gear = gearBin?.gear || [];
    const filteredGear = filter ? gear.filter(filter) : gear;

    if (gear.length === 0)
        return (
            <div className='px-4 py-2 flex flex-col items-center justify-center h-48'>
                No gear in this bin
            </div>
        );
    return (
        <div
            ref={animate}
            className='gap-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]'
        >
            {filteredGear
                .sort((a, b) => a.order - b.order)
                .map((gear) => (
                    <GearProvider key={gear.id} gear={gear}>
                        {children}
                    </GearProvider>
                ))}
        </div>
    );
}
