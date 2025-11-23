/**
 * Utility Functions
 * 
 * Common utility functions used throughout the application
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes intelligently
 * Combines clsx for conditional classes and tailwind-merge for handling conflicts
 * 
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * cn('px-4 py-2', condition && 'bg-blue-500', { 'text-white': isActive })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
