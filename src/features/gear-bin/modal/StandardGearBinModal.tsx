import React from 'react';
import { GearBinModal, GearBinModalContent } from './GearBinModal';
import { StandardGearBinModalViewContents } from './StandardGearBinModalViewContents';
import { StandardGearBinModalEditContents } from './StandardGearBinModalEditContents';

export function StandardGearBinModal({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GearBinModal>
            {children}
            <GearBinModalContent>
                <StandardGearBinModalEditContents />
                <StandardGearBinModalViewContents />
            </GearBinModalContent>
        </GearBinModal>
    );
}
