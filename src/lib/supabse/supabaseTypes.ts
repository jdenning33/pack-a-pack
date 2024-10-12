// File: src/utils/supabaseConverters.ts
import { Pack, Kit, Item, Gear } from '@/lib/appTypes';
import { Optional } from '../utils';

type Upsert<T extends { id: string; created_at: string; updated_at: string }> =
    Optional<T, 'id' | 'created_at' | 'updated_at'>;

// Types for Supabase database models
interface SupabasePack {
    id: string;
    name: string;
    description: string;
    is_public: boolean;
    is_gear_locker: boolean;
    created_at: string;
    updated_at: string;
}

interface SupabaseKit {
    id: string;
    pack_id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface SupabaseItem {
    id: string;
    kit_id: string;
    pack_id: string;
    name: string;
    quantity: number;
    is_packed: boolean;
    notes: string;
    user_gear_id?: string;
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
        name: supabasePack.name,
        description: supabasePack.description,
        isPublic: supabasePack.is_public,
        isGearLocker: supabasePack.is_gear_locker,
        kits: kits || [],
    };
}

// Convert application Pack to Supabase Pack
export function appToSupabasePack(appPack: Pack): Upsert<SupabasePack> {
    return {
        id: appPack.id,
        name: appPack.name,
        description: appPack.description,
        is_public: appPack.isPublic,
        is_gear_locker: appPack.isGearLocker,
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
    };
}

// Convert application Kit to Supabase Kit
export function appToSupabaseKit(
    appKit: Kit | Optional<Kit, 'id'>,
    packId: string
): Upsert<SupabaseKit> {
    return {
        id: appKit.id,
        pack_id: packId,
        name: appKit.name,
        description: appKit.description,
    };
}

// Convert Supabase Item to application Item
export function supabaseToAppItem(supabaseItem: SupabaseItem): Item {
    return {
        id: supabaseItem.id,
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
        user_gear_id: userGearId,
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
    };
}
