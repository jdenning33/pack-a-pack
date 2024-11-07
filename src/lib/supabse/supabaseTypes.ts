// File: src/utils/supabaseConverters.ts
import {
    Pack,
    Kit,
    Item,
    Gear,
    PackSummary,
    UserGearBin,
    Profile,
    PreferredWeightFormat,
    WeightType,
} from '@/lib/appTypes';
import { Optional } from '../utils';

export type Upsert<
    T extends { id: string; created_at: string; updated_at: string }
> = Optional<T, 'id' | 'created_at' | 'updated_at'>;

// Types for Supabase database models
export interface SupabasePack {
    id: string;
    user_id: string;
    user?: { username: string };
    name: string;
    description: string;
    is_public: boolean;
    is_gear_locker: boolean;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    is_trip_completed: boolean;
    attributes: Record<string, string | number>;
}

interface SupabaseKit {
    id: string;
    pack_id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}

interface SupabaseItem {
    id: string;
    is_deleted: boolean;
    kit_id: string;
    pack_id: string;
    name: string;
    quantity: number;
    is_packed: boolean;
    notes: string;
    weight: number | null;
    weight_type: string | null;
    user_gear_id?: string | null;
    created_at: string;
    updated_at: string;
    user_gear?: SupabaseUserGear;
}

interface SupabaseUserGear {
    id: string;
    user_id: string;
    gear_id: string;
    gear: SupabaseGear;
    created_at: string;
    updated_at: string;
}

interface SupabaseGear {
    id: string;
    type: string;
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    weight_type: string;
    price: number;
    is_public: boolean;
    purchase_links: string[];
    created_by_id: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    user?: { username: string };
    user_gear?: {
        id: string;
        user_id: string;
        is_retired: boolean;
        user_gear_bin_id: string;
        order: number;
    }[];
}

interface SupabaseUserGearBin {
    id: string;
    name: string;
    description: string;
    order: number;
    user_id: string;
    user_gear?: SupabaseUserGear[];
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}

interface SupabaseProfile {
    id: string;
    avatar_url: string;
    full_name: string;
    bio: string;
    username: string;
    preferred_weight_format: string;
    location: string;
    created_at: string;
    updated_at: string;
}

// Convert Supabase Pack to application Pack
export function supabaseToAppPack(
    supabasePack: SupabasePack,
    kits?: Kit[]
): Pack {
    return {
        id: supabasePack.id,
        userId: supabasePack.user_id,
        userName: supabasePack.user?.username || 'unknown',
        name: supabasePack.name,
        description: supabasePack.description,
        isPublic: supabasePack.is_public,
        isGearLocker: supabasePack.is_gear_locker,
        kits: kits || [],
        isDeleted: supabasePack.is_deleted,
        isTripCompleted: supabasePack.is_trip_completed,
        attributes: supabasePack.attributes || {},
    };
}

// Convert application Pack to Supabase Pack
export function appToSupabasePack(
    appPack: Optional<Pack | PackSummary, 'id'>
): Upsert<SupabasePack> {
    return {
        id: appPack.id,
        user_id: appPack.userId,
        name: appPack.name,
        description: appPack.description,
        is_public: appPack.isPublic,
        is_gear_locker: appPack.isGearLocker,
        is_deleted: appPack.isDeleted,
        attributes: appPack.attributes,
        is_trip_completed: appPack.isTripCompleted,
    };
}

// Convert Supabase Kit to application Kit
export function supabaseToAppKit(
    supabaseKit: SupabaseKit,
    items?: Item[]
): Kit {
    return {
        id: supabaseKit.id,
        packId: supabaseKit.pack_id,
        name: supabaseKit.name,
        description: supabaseKit.description,
        items: items || [],
        isDeleted: supabaseKit.is_deleted,
    };
}

// Convert application Kit to Supabase Kit
export function appToSupabaseKit(
    appKit: Kit | Optional<Kit, 'id'>
): Upsert<SupabaseKit> {
    return {
        id: appKit.id,
        pack_id: appKit.packId,
        name: appKit.name,
        description: appKit.description,
        is_deleted: appKit.isDeleted,
    };
}

function getWeightType(weightType: string | null): WeightType | null {
    if (!weightType) return null;
    switch (weightType) {
        case 'wearable':
            return 'wearable';
        case 'consumable':
            return 'consumable';
        default:
            return 'base';
    }
}

// Convert Supabase Item to application Item
export function supabaseToAppItem(
    supabaseItem: SupabaseItem,
    userId: string
): Item {
    return {
        id: supabaseItem.id,
        isDeleted: supabaseItem.is_deleted,
        kitId: supabaseItem.kit_id,
        packId: supabaseItem.pack_id,
        name: supabaseItem.name,
        quantity: supabaseItem.quantity,
        isPacked: supabaseItem.is_packed,
        notes: supabaseItem.notes,
        weight: supabaseItem.weight,
        weightType: getWeightType(supabaseItem.weight_type),
        gearId: supabaseItem.user_gear?.gear_id,
        gear: supabaseItem.user_gear?.gear
            ? supabaseToAppGear(supabaseItem.user_gear.gear, userId)
            : undefined,
    };
}

// Convert application Item to Supabase Item
export function appToSupabaseItem(
    appItem: Item | Optional<Item, 'id'>,
    userGearId?: string
): Upsert<SupabaseItem> {
    return {
        id: appItem.id,
        kit_id: appItem.kitId,
        pack_id: appItem.packId,
        name: appItem.name,
        quantity: appItem.quantity,
        is_packed: appItem.isPacked,
        notes: appItem.notes,
        weight: appItem.weight,
        weight_type: appItem.weightType,
        user_gear_id: userGearId || null,
        is_deleted: appItem.isDeleted,
    };
}

// Helper function to convert a nested Supabase Pack structure to an application Pack
export function convertNestedSupabasePack(
    supabasePack: SupabasePack & {
        kits: (SupabaseKit & { items: SupabaseItem[] })[];
    },
    userId: string
): Pack {
    const kits = supabasePack.kits.map((supabaseKit) => {
        const items = supabaseKit.items.map((i) =>
            supabaseToAppItem(i, userId)
        );
        return supabaseToAppKit(supabaseKit, items);
    });
    return supabaseToAppPack(supabasePack, kits);
}

export function appToSupabaseGear(
    appGear: Optional<Gear, 'id'>
): Upsert<SupabaseGear> {
    return {
        id: appGear.id,
        name: appGear.name,
        description: appGear.description,
        brand: appGear.brand,
        image: appGear.image,
        weight: appGear.weight,
        weight_type: appGear.weightType,
        price: appGear.price,
        type: appGear.type,
        is_public: appGear.isPublic,
        purchase_links: appGear.purchaseLinks,
        created_by_id: appGear.createdById,
        is_deleted: appGear.isDeleted,
    };
}

const hashCode = function (s: string) {
    return s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
};

export function supabaseToAppGear(
    supabaseGear: SupabaseGear,
    userId: string
): Gear {
    const userGear = supabaseGear.user_gear?.find(
        (ug) => ug.user_id === userId
    );
    return {
        id: supabaseGear.id,
        type: supabaseGear.type,
        weightType:
            supabaseGear.weight_type === 'wearable'
                ? 'wearable'
                : supabaseGear.weight_type === 'consumable'
                ? 'consumable'
                : 'base',
        name: supabaseGear.name,
        description: supabaseGear.description,
        brand: supabaseGear.brand,
        image: supabaseGear.image,
        weight: supabaseGear.weight,
        price: supabaseGear.price,
        isPublic: supabaseGear.is_public,
        purchaseLinks: supabaseGear.purchase_links,
        createdById: supabaseGear.created_by_id,
        createdByUserName: supabaseGear.user?.username || 'unknown',
        isDeleted: supabaseGear.is_deleted,
        isOwnedByUser: !userGear?.is_retired || false,
        isRetiredByUser: userGear?.is_retired || false,
        userGearBinId: userGear?.user_gear_bin_id,
        order: userGear?.order || hashCode(supabaseGear.id),
    };
}

export function appToSupabaseUserGearBin(
    appGear: Optional<UserGearBin, 'id'>
): Upsert<SupabaseUserGearBin> {
    return {
        id: appGear.id,
        name: appGear.name,
        description: appGear.description,
        order: appGear.order,
        user_id: appGear.userId,
        is_deleted: appGear.isDeleted,
    };
}

export function supabaseToAppUserGearBin(
    supabaseGearBin: SupabaseUserGearBin
): UserGearBin {
    return {
        id: supabaseGearBin.id,
        name: supabaseGearBin.name,
        description: supabaseGearBin.description,
        order: supabaseGearBin.order,
        userId: supabaseGearBin.user_id,
        isDeleted: supabaseGearBin.is_deleted,
        gear: [],
    };
}

export function getPreferredWeightFormat(
    supabaseProfile: SupabaseProfile
): PreferredWeightFormat {
    switch (supabaseProfile.preferred_weight_format) {
        case 'kg':
            return 'kg';
        case 'lbs':
            return 'lbs';
        case 'lbs+oz':
            return 'lbs+oz';
        default:
            return 'kg';
    }
}
export function supabaseToAppProfile(
    supabaseProfile: SupabaseProfile
): Profile {
    return {
        id: supabaseProfile.id,
        avatarUrl: supabaseProfile.avatar_url,
        fullname: supabaseProfile.full_name,
        bio: supabaseProfile.bio,
        username: supabaseProfile.username,
        preferredWeightFormat: getPreferredWeightFormat(supabaseProfile),
        location: supabaseProfile.location,
    };
}

export function appToSupabaseProfile(
    appProfile: Optional<Profile, 'id'>
): Upsert<SupabaseProfile> {
    return {
        id: appProfile.id,
        avatar_url: appProfile.avatarUrl,
        full_name: appProfile.fullname,
        bio: appProfile.bio,
        username: appProfile.username,
        preferred_weight_format: appProfile.preferredWeightFormat,
        location: appProfile.location,
    };
}
