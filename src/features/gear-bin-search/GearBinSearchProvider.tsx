import { useGearBinQuery } from '@/lib/supabse/gear-bin/useGearBinQuery';
import React, { ReactNode, useMemo } from 'react';
import {
    UserGearBinsContext,
    UserGearBinsContextType,
    useUserGearBins,
} from './useGearBinSearch';
import { useAuth } from '../auth/useAuth';
import { useGearQuery } from '@/lib/supabse/gear/useGearQuery';
import { Input } from '@/ui/input';

export const UserGearBinSearchProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const { user } = useAuth();
    const [filterText, setFilterText] = React.useState<string>('');

    const userGearBinQuery = useGearBinQuery({
        userId: user?.id || '',
    });
    const userGearQuery = useGearQuery({
        gearType: 'user',
        gearUserId: user?.id,
    });

    const userGearBins = useMemo(
        () => userGearBinQuery.data || [],
        [userGearBinQuery.data]
    );
    const userGear = useMemo(
        () =>
            userGearQuery.data?.filter((d) => {
                return (
                    d.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    d.description
                        .toLowerCase()
                        .includes(filterText.toLowerCase())
                );
            }) || [],
        [userGearQuery.data, filterText]
    );

    const gearBinsWithGear = useMemo(
        () =>
            userGearBins.map((bin) => ({
                ...bin,
                gear: userGear.filter((gear) => gear.userGearBinId === bin.id),
            })),
        [userGearBins, userGear]
    );

    const binlessGear = useMemo(() => {
        if (!userGear || !userGearBins) return [];
        return userGear.filter(
            (gear) => !userGearBins.some((bin) => bin.id === gear.userGearBinId)
        );
    }, [userGear, userGearBins]);

    const value: UserGearBinsContextType = {
        gearBins: gearBinsWithGear,
        binlessGear: binlessGear,
        filterText: filterText,
        setFilterText: setFilterText,
    };

    return (
        <UserGearBinsContext.Provider value={value}>
            {children}
        </UserGearBinsContext.Provider>
    );
};

export function UserGearFilterBar(
    inputProps: React.ComponentProps<typeof Input>
) {
    const { filterText, setFilterText } = useUserGearBins();
    const [text, setText] = React.useState(filterText);
    return (
        <Input
            {...inputProps}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
                setFilterText(text);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setFilterText(text);
                }
            }}
        />
    );
}
