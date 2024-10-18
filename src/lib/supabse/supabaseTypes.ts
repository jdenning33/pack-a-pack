// File: src/utils/supabaseConverters.ts
import { Pack, Kit, Item, Gear, PackSummary } from '@/lib/appTypes';
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
    name: string;
    description: string;
    brand: string;
    image: string;
    weight: number;
    price: number;
    is_public: boolean;
    purchase_links: string[];
    created_by_id: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    user?: { username: string };
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

// Convert Supabase Item to application Item
export function supabaseToAppItem(supabaseItem: SupabaseItem): Item {
    return {
        id: supabaseItem.id,
        isDeleted: supabaseItem.is_deleted,
        kitId: supabaseItem.kit_id,
        packId: supabaseItem.pack_id,
        name: supabaseItem.name,
        quantity: supabaseItem.quantity,
        isPacked: supabaseItem.is_packed,
        notes: supabaseItem.notes,
        gearId: supabaseItem.user_gear?.gear_id,
        gear: supabaseItem.user_gear?.gear
            ? supabaseToAppGear(supabaseItem.user_gear.gear)
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
        user_gear_id: userGearId || null,
        is_deleted: appItem.isDeleted,
    };
}

// Helper function to convert a nested Supabase Pack structure to an application Pack
export function convertNestedSupabasePack(
    supabasePack: SupabasePack & {
        kits: (SupabaseKit & { items: SupabaseItem[] })[];
    }
): Pack {
    const kits = supabasePack.kits.map((supabaseKit) => {
        const items = supabaseKit.items.map(supabaseToAppItem);
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
        price: appGear.price,
        is_public: appGear.isPublic,
        purchase_links: appGear.purchaseLinks,
        created_by_id: appGear.createdById,
        is_deleted: appGear.isDeleted,
    };
}

export function supabaseToAppGear(supabaseGear: SupabaseGear): Gear {
    return {
        id: supabaseGear.id,
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
    };
}
