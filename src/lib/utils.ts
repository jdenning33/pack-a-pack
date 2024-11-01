import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PreferredWeightFormat } from './appTypes';
import { useAuth } from '@/features/auth/useAuth';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function useFormatWeight() {
    const { profile } = useAuth();
    return (grams: number) => {
        if (!profile) return `${grams} g`;
        switch (profile.preferredWeightFormat) {
            case 'kg': {
                const kgs = grams / 1000;
                if (kgs < 1) return `${grams} g`;
                return `${(grams / 1000).toFixed(2)} kg`;
            }
            case 'lbs':
                return `${(grams / 453.59237).toFixed(1)} lbs`;
            case 'lbs+oz': {
                const lbs = Math.floor(grams / 453.59237);
                const oz = Math.round((grams % 453.59237) / 28.3495);
                if (lbs === 0) return `${oz} oz`;
                return `${lbs} lbs ${oz} oz`;
            }
            default:
                return `${grams} g`;
        }
    };
}

export function formatWeight(
    grams: number,
    preferredUnit: PreferredWeightFormat
): string {
    switch (preferredUnit) {
        case 'kg':
            return `${(grams / 1000).toFixed(1)} kg`;
        case 'lbs':
            return `${(grams / 453.59237).toFixed(1)} lbs`;
        case 'lbs+oz': {
            const lbs = Math.floor(grams / 453.59237);
            const oz = Math.round((grams % 453.59237) / 28.3495);
            return `${lbs} lbs ${oz} oz`;
        }
    }
}
