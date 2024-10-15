import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
