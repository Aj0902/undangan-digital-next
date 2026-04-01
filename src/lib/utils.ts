import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to smartly merge tailwind classes
 * It resolves conflicts like 'px-2 px-4' -> 'px-4' dynamically
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
