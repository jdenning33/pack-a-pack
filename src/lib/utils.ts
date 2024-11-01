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
        return formatWeight(grams, profile?.preferredWeightFormat || 'kg');
    };
}

export function formatWeight(
    grams: number,
    preferredUnit: PreferredWeightFormat
): string {
    switch (preferredUnit) {
        case 'kg': {
            const kgs = grams / 1000;
            if (kgs < 0.3) return `${maxPrecision(grams, 2)} g`;
            return `${maxPrecision(grams / 1000, 2)} kg`;
        }
        case 'lbs':
            return `${maxPrecision(grams / 453.59237, 2)} lbs`;
        case 'lbs+oz': {
            const lbs = Math.floor(grams / 453.59237);
            const oz = Math.round((grams % 453.59237) / 28.3495);
            return `${lbs} lbs ${maxPrecision(oz, 2)} oz`;
        }
    }
}

function maxPrecision(value: number, maxPrecision: number) {
    return Number.parseFloat(value.toFixed(maxPrecision));
}
