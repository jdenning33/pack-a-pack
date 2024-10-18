'use client';

import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';
import { useGearSearch } from '../useGearSearch';

export function SelectGearTypeFilter() {
    const { searchParams, setSearchParams } = useGearSearch();

    const gearType = searchParams.gearType || 'public';
    const setGearType = (gearType: 'user' | 'public') =>
        setSearchParams((prev) => ({
            ...prev,
            gearType,
        }));

    return (
        <Select
            value={gearType}
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
