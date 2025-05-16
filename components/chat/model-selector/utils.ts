/**
 * Utility functions for the model selector component
 */

import type { AIModel } from "@/types/chat"
import type { ReactNode } from "react"

/**
 * Group models by their provider
 * @param models List of models to group
 * @returns Object with provider names as keys and arrays of models as values
 */
export function groupModelsByProvider(models: AIModel[]): Record<string, AIModel[]> {
  return models.reduce((groups, model) => {
    const provider = model.provider
    if (!groups[provider]) {
      groups[provider] = []
    }
    groups[provider].push(model)
    return groups
  }, {} as Record<string, AIModel[]>)
}

/**
 * Get the provider icon as a React node
 * @param provider Provider name
 * @returns React node with the provider icon
 */
export function getProviderIcon(provider: string): ReactNode {
  switch (provider.toLowerCase()) {
    case "openai":
      return "i"
    case "deepseek":
      return <img src="/deepseek-logo-inspired.png" alt="DeepSeek" className="w-4 h-4" />
    case "qwen":
      return <img src="/placeholder-ct6n6.png" alt="Qwen" className="w-4 h-4" />
    case "google":
      return <img src="/google-g-logo.png" alt="Google" className="w-4 h-4" />
    case "anthropic":
      return <img src="/anthropic-logo.png" alt="Anthropic" className="w-4 h-4" />
    case "xai":
      return <img src="/placeholder-akjv1.png" alt="xAI" className="w-4 h-4" />
    case "meta":
      return <img src="/abstract-infinity-logo.png" alt="Meta" className="w-4 h-4" />
    default:
      return "i"
  }
}

/**
 * Display names for providers
 */
export const providerNames: Record<string, string> = {
  openai: "OpenAI",
  deepseek: "DeepSeek",
  qwen: "Qwen",
  google: "Google",
  anthropic: "Anthropic",
  xai: "xAI",
  meta: "Meta",
}
