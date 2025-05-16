/**
 * @fileoverview
 * Utilitários para facilitar a interação com modelos de IA.
 * Estas funções são projetadas para serem explícitas e bem documentadas,
 * facilitando a compreensão e uso por ferramentas de IA.
 */

import type { AIDetectableComponent, AIProcessableMessage, AIModelConfig } from "@/types/ai-helpers"

/**
 * Formata uma mensagem para ser processada por um modelo de IA.
 *
 * @param message - A mensagem a ser formatada
 * @returns A mensagem formatada para processamento por IA
 */
export function formatMessageForAI(message: Partial<AIProcessableMessage>): AIProcessableMessage {
  return {
    id: message.id || generateUniqueId(),
    role: message.role || "user",
    content: message.content || "",
    timestamp: message.timestamp || Date.now(),
    metadata: message.metadata || {},
    referencedComponents: message.referencedComponents || [],
    model: message.model,
  }
}

/**
 * Gera um ID único para uso em mensagens e componentes.
 *
 * @returns Um ID único baseado em timestamp e número aleatório
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Extrai componentes referenciados de uma mensagem de texto.
 *
 * @param text - O texto da mensagem
 * @returns Uma lista de componentes referenciados no texto
 */
export function extractReferencedComponents(text: string): AIDetectableComponent[] {
  // Implementação simplificada - em um caso real, isso analisaria o texto
  // para encontrar referências a componentes
  const components: AIDetectableComponent[] = []

  // Exemplo: detecta padrões como [ComponentName]
  const componentMatches = text.match(/\[([A-Z][a-zA-Z]+)\]/g)

  if (componentMatches) {
    componentMatches.forEach((match) => {
      const name = match.replace(/[[\]]/g, "")
      components.push({
        id: generateUniqueId(),
        name,
        path: `components/${name.toLowerCase()}`,
        modifiable: true,
      })
    })
  }

  return components
}

/**
 * Formata um componente para ser facilmente referenciado em prompts de IA.
 *
 * @param component - O componente a ser formatado
 * @returns Uma representação em string do componente para uso em prompts
 */
export function formatComponentForPrompt(component: AIDetectableComponent): string {
  return `<Component name="${component.name}" path="${component.path}" ${component.modifiable ? "modifiable" : "readonly"} />`
}

/**
 * Calcula uma estimativa aproximada de tokens para um texto.
 *
 * @param text - O texto para estimar tokens
 * @returns Número estimado de tokens
 */
export function estimateTokenCount(text: string): number {
  // Implementação simplificada - aproximadamente 4 caracteres por token
  return Math.ceil(text.length / 4)
}

/**
 * Verifica se um modelo tem uma capacidade específica.
 *
 * @param model - A configuração do modelo
 * @param capability - A capacidade a verificar
 * @returns Verdadeiro se o modelo tem a capacidade
 */
export function modelHasCapability(model: AIModelConfig, capability: string): boolean {
  return model.capabilities?.includes(capability) || false
}

/**
 * Extrai código de uma resposta de IA.
 *
 * @param text - O texto da resposta
 * @returns Blocos de código extraídos com linguagem e conteúdo
 */
export function extractCodeFromResponse(text: string): Array<{ language: string; code: string }> {
  const codeBlocks: Array<{ language: string; code: string }> = []

  // Regex para encontrar blocos de código markdown
  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g
  let match

  while ((match = codeBlockRegex.exec(text)) !== null) {
    codeBlocks.push({
      language: match[1] || "text",
      code: match[2].trim(),
    })
  }

  return codeBlocks
}
