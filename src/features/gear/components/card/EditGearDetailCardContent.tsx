import React from 'react';
import { useGearContext } from '../../useGearContext';
import { StandardEditGearForm } from '../edit/StandardEditGearForm';
import { useGearDetailCard } from './GearDetailCard';

export const EditGearDetailCardContent: React.FC = () => {
    const { gear, afterGearUpdated } = useGearContext();
    const { setIsEditing } = useGearDetailCard();

    return (
        <StandardEditGearForm
            gear={gear}
            afterSave={(gear) => {
                setIsEditing(false);
                afterGearUpdated(gear);
            }}
            onCancel={() => setIsEditing(false)}
        />
    );
};
