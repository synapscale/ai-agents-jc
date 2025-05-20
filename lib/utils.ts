/**
 * Utility functions for the application
 *
 * @ai-pattern utility-functions
 * Common utility functions used throughout the application
 */

/**
 * Combines multiple class names into a single string
 * @param inputs - Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ")
}

/**
 * Generates a unique ID with timestamp and random string
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttles a function call
 * @param func - Function to throttle
 * @param limit - Limit time in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastResult: ReturnType<T>

  return (...args: Parameters<T>): ReturnType<T> => {
    if (!inThrottle) {
      lastResult = func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
    return lastResult
  }
}

/**
 * Safely parses JSON with error handling
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return fallback
  }
}

/**
 * Creates a deep clone of an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    console.error("Error cloning object:", error)
    return obj
  }
}

/**
 * Formats a date to a localized string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
): string {
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date

  try {
    return new Intl.DateTimeFormat("pt-BR", options).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return String(dateObj)
  }
}

/**
 * Formats a date relative to now (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()

  // Convert to seconds
  const diffSec = Math.floor(diffMs / 1000)

  // Less than a minute
  if (diffSec < 60) {
    return "just now"
  }

  // Minutes
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`
  }

  // Hours
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
  }

  // Days
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
  }

  // Weeks
  const diffWeek = Math.floor(diffDay / 7)
  if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`
  }

  // Months
  const diffMonth = Math.floor(diffDay / 30)
  if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`
  }

  // Years
  const diffYear = Math.floor(diffDay / 365)
  return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`
}

/**
 * Truncates a string to a maximum length
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add if truncated
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number, suffix = "..."): string {
  if (!str || str.length <= maxLength) return str
  return `${str.substring(0, maxLength)}${suffix}`
}

/**
 * Converts a string to kebab case
 * @param str - String to convert
 * @returns Kebab case string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

/**
 * Converts a string to camel case
 * @param str - String to convert
 * @returns Camel case string
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, "")
    .replace(/[-_]+/g, "")
}

/**
 * Converts a string to pascal case
 * @param str - String to convert
 * @returns Pascal case string
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, "")
    .replace(/[-_]+/g, "")
}

/**
 * Checks if the current environment is a browser
 * @returns Whether the current environment is a browser
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

/**
 * Safely accesses a nested property in an object
 * @param obj - Object to access
 * @param path - Path to the property
 * @param defaultValue - Default value if property doesn't exist
 * @returns Property value or default value
 */
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
  const keys = path.split(".")
  let current = obj

  for (const key of keys) {
    if (current === undefined || current === null) {
      return defaultValue
    }
    current = current[key]
  }

  return current === undefined ? defaultValue : current
}

/**
 * Creates a memoized version of a function
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}
