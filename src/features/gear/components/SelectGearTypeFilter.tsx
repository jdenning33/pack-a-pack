'use client';

import * as React from 'react';

import { useGear } from '../useGear';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';

export function SelectGearTypeFilter() {
    const { searchParams, setSearchParams } = useGear();

    const gearType = searchParams.gearType || 'public';

    const setGearType = (gearType: 'user' | 'public') =>
        setSearchParams((prev) => ({
            ...prev,
            gearType,
        }));

    return (
        <Select
            defaultValue={gearType}
            onValueChange={(v) => setGearType(v as 'user' | 'public')}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='user'>My Gear</SelectItem>
                <SelectItem value='public'>Public Gear</SelectItem>
            </SelectContent>
        </Select>
    );
}
