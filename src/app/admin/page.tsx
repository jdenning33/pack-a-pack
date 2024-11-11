'use client';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { fetchFromCorsUrl } from './load-from-url-action';
import { Gear } from '@/lib/appTypes';
import { useAppMutations } from '@/features/app-mutations/useAppMutations';
import { useAuth } from '@/features/auth/useAuth';
import { Label } from '@/ui/label';

export default function AdminPage() {
    const { user } = useAuth();
    const { addGear, uploadGearImageFromUrl } = useAppMutations();

    if (!user) return;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!user) return;

        const url = (event.currentTarget.elements[1] as HTMLInputElement).value;
        const gearType = (event.currentTarget.elements[0] as HTMLInputElement)
            .value;
        console.log(gearType, url);

        const reiGearJson = await fetchFromCorsUrl(url);
        console.log(reiGearJson);

        const gear = transformREIDataToGear(reiGearJson, gearType, user.id);

        console.log(gear);

        gear.forEach(async (g) => {
            const newUrl = await uploadGearImageFromUrl(g.image);
            g.image = newUrl;
            addGear(g);
        });
    }

    return (
        <main className='flex flex-col gap-8 container m-auto'>
            <form onSubmit={handleSubmit} className='space-y-2'>
                <Label htmlFor='gear-type'>Gear Type</Label>
                <Input id='gear-type' className='w-48' />
                <br />
                <Label htmlFor='url'>URL</Label>
                <Input id='url' className='w-96' />
                <Button type='submit'>Submit</Button>
            </form>
        </main>
    );
}

interface REIProduct {
    brand: string;
    title: string;
    description: string;
    displayPrice: {
        min: number;
        max: number;
        priceDisplay: {
            price: string;
        };
    };
    thumbnailImageLink: string;
    tileAttributes: Array<{
        title: string;
        values: string[];
    }>;
}

function transformREIDataToGear(
    reiData: any,
    gearType: string,
    userId: string
): Omit<Gear, 'id'>[] {
    const products = reiData.searchResults.results;

    return products.map((product: REIProduct) => {
        // Extract weight from tileAttributes
        const weightAttribute = product.tileAttributes.find(
            (attr) => attr.title === 'Weight'
        );
        const weight = weightAttribute
            ? parseWeight(weightAttribute.values[0])
            : 0;

        const price = product.displayPrice.min + product.displayPrice.max / 2;

        return {
            type: gearType,
            name: product.title,
            price: price,
            description: product.description,
            brand: product.brand,
            image: product.thumbnailImageLink,
            weight: weight,
            weightType: 'base',
            isPublic: true,
            purchaseLinks: [],
            createdById: userId,
            createdByUserName: '',
            attributes: extractAttributes(product.tileAttributes),
            isDeleted: false,
            isOwnedByUser: false,
            isRetiredByUser: false,
        };
    });
}

function parseWeight(weightStr: string): number {
    if (!weightStr) return 0;

    console.log('weightStr:', weightStr);

    // Standardize the string format
    weightStr = weightStr
        .toLowerCase()
        .replace(/\./g, '') // remove periods
        .trim();

    // Handle compound measurements (e.g., "1 lb 3 oz")
    if (weightStr.includes('lb') && weightStr.includes('oz')) {
        const pounds = weightStr.match(/(\d+\.?\d*)\s*lb/)?.[1] || '0';
        const ounces = weightStr.match(/(\d+\.?\d*)\s*oz/)?.[1] || '0';

        return parseFloat(pounds) * 453.592 + parseFloat(ounces) * 28.3495;
    }

    // Handle ranges (e.g., "4.5 to 4.85 lbs")
    if (weightStr.includes('to')) {
        const numbers = weightStr.match(/(\d+\.?\d*)/g);
        if (!numbers || numbers.length < 2) return 0;

        const min = parseFloat(numbers[0]);
        const max = parseFloat(numbers[1]);
        const average = (min + max) / 2;

        // Detect unit at the end of the range
        const uom =
            weightStr.match(/(lbs|lb|oz|g|kg)/i)?.[0].toLowerCase() || 'g';
        return convertToGrams(average, uom);
    }

    // Handle single measurements
    const number = weightStr.match(/(\d+\.?\d*)/)?.[1];
    if (!number) return 0;

    const uom = weightStr.match(/(lbs|lb|oz|g|kg)/i)?.[0].toLowerCase() || 'g';
    return convertToGrams(parseFloat(number), uom);
}

function convertToGrams(weight: number, uom: string): number {
    switch (uom) {
        case 'lbs':
        case 'lb':
            return weight * 453.592; // 1 lb = 453.592 grams
        case 'oz':
            return weight * 28.3495; // 1 oz = 28.3495 grams
        case 'kg':
            return weight * 1000; // 1 kg = 1000 grams
        case 'g':
            return weight; // already in grams
        default:
            return weight; // default to assuming grams if uom not found
    }
}

function extractAttributes(
    tileAttributes: Array<{ title: string; values: string[] }>
): Record<string, string> {
    const attributes: Record<string, string> = {};

    tileAttributes.forEach((attr) => {
        if (attr.title !== 'Weight' && attr.title !== 'Best Use') {
            // Weight is handled separately
            attributes[attr.title] = attr.values.join(', ');
        }
    });

    return attributes;
}
