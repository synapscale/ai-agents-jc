import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, handling Tailwind CSS conflicts
 * @param inputs Class names to combine
 * @returns Combined class name string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a localized string
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
) {
  const dateObj = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat("pt-BR", options).format(dateObj)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str String to truncate
 * @param length Maximum length
 * @returns Truncated string
 */
export function truncateString(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

/**
 * Generates a random ID
 * @returns Random ID string
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}
