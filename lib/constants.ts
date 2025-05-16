export interface AIModel {
  id: string
  name: string
  provider: string
  description?: string
  category?: string
  capabilities?: {
    imageAnalysis?: boolean
    toolCalling?: boolean
    longContext?: boolean
    maxContextLength?: number
  }
  isNew?: boolean
  isInfinite?: boolean
  isBeta?: boolean
  isUpdated?: boolean
  iconUrl?: string
  costPerInputToken?: number
  costPerOutputToken?: number
  metadata?: Record<string, any>
}

export type Model = AIModel

export const defaultModels: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Modelo mais avançado da OpenAI com capacidades multimodais",
    category: "multimodal",
    capabilities: {
      imageAnalysis: true,
      toolCalling: true,
      longContext: true,
      maxContextLength: 128000,
    },
    isInfinite: true,
    isNew: true,
  },
]

