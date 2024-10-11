import { Gear } from '@/features/gear/useGear';

// This represents a backpack and it's contents for a single trip, it may be cloned for a new trip
export interface Pack {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
    kits: Kit[];
}

// This represents a kit of items in the backpack. For example, "Clothing Kit" or "Toiletries Kit"
export interface Kit {
    id: string;
    packId: string;
    name: string;
    description: string;
    items: Item[];
}

// This represents a single item in this pack. For example, "T-shirt" or "Toothbrush"
export interface Item {
    id: string;
    kitId: string;
    name: string;
    quantity: number;
    isPacked: boolean;
    notes: string;
    gearId?: string;
    gear?: Gear;
}
export type PackSummary = Omit<Pack, 'kits'>;
