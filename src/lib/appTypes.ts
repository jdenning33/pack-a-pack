export type PreferredWeightFormat = 'kg' | 'lbs' | 'lbs+oz';
export interface Profile {
    id: string;
    avatarUrl: string;
    fullname: string;
    bio: string;
    username: string;
    preferredWeightFormat: PreferredWeightFormat;
    location: string;
}

// This represents a backpack and it's contents for a single trip, it may be cloned for a new trip
export interface Pack {
    id: string;
    userId: string;
    name: string;
    userName?: string;
    description: string;
    isPublic: boolean;
    isGearLocker: boolean;
    kits: Kit[];
    attributes: Record<string, string | number>;
    isDeleted: boolean;
    isTripCompleted: boolean;
}
export type PackSummary = Omit<Pack, 'kits'>; // This represents a gear that can be purchased to satisfy the Item it is attributed to

// This represents a kit of items in the backpack. For example, "Clothing Kit" or "Toiletries Kit"
export interface Kit {
    id: string;
    packId: string;
    name: string;
    description: string;
    items: Item[];
    isDeleted: boolean;
}

// This represents a single item in this pack. For example, "T-shirt" or "Toothbrush"
export interface Item {
    id: string;
    kitId: string;
    packId: string;
    name: string;
    quantity: number;
    isPacked: boolean;
    notes: string;
    weight: number | null;
    weightType: WeightType | null;
    gearId?: string;
    gear?: Gear;
    isDeleted: boolean;
}

export type WeightType = 'base' | 'wearable' | 'consumable';
export interface Gear {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    price: number;
    isPublic: boolean;
    purchaseLinks: string[];
    attributes: Record<string, string | number>;
    createdById: string;
    createdByUserName: string;
    isDeleted: boolean;
    type: string;
    weightType: WeightType;
    order: number;
    isOwnedByUser: boolean;
    isRetiredByUser: boolean;
    userGearBinId?: string | null;
}

export interface UserGearBin {
    id: string;
    name: string;
    description: string;
    order: number;
    userId: string;
    gear: Gear[];
    isDeleted: boolean;
}
