import React, { createContext, useContext, useState } from 'react';
import { Card } from '@/ui/card';
import { useGearContext } from '../../useGearContext';
import { cn } from '@/lib/utils';
import { GearDetailCardContent } from './GearDetailCardContent';
import { EditGearDetailCardContent } from './EditGearDetailCardContent';

// Define the context type
type GearDetailCardContextType = {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
};

// Create the context
const GearDetailCardContext = createContext<
    GearDetailCardContextType | undefined
>(undefined);

// Create the hook for consuming the context
export const useGearDetailCard = () => {
    const context = useContext(GearDetailCardContext);
    if (context === undefined) {
        throw new Error(
            'useGearDetailCard must be used within a GearDetailCardProvider'
        );
    }
    return context;
};

// GearDetailCard component with context provider
export const GearDetailCard = ({ className }: { className?: string }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { gear } = useGearContext();

    if (!gear && !isEditing) return null;

    // Context value
    const contextValue: GearDetailCardContextType = {
        isEditing,
        setIsEditing,
    };

    return (
        <GearDetailCardContext.Provider value={contextValue}>
            <Card className={cn('p-4 relative', className)}>
                {isEditing ? (
                    <EditGearDetailCardContent />
                ) : (
                    <GearDetailCardContent />
                )}
            </Card>
        </GearDetailCardContext.Provider>
    );
};
