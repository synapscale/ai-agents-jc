import type { AgentFormData, AgentFormErrors } from "@/types/agent-types" // Ensure agent-types is integrated

/**
 * Validates the agent form data
 * @param values The form values to validate
 * @returns An object containing validation errors, if any
 */
export const validateAgentForm = (values: AgentFormData): AgentFormErrors => {
  const errors: AgentFormErrors = {}

  // Name validation
  if (!values.name.trim()) {
    errors.name = "O nome do agente é obrigatório"
  } else if (values.name.length < 3) {
    errors.name = "O nome deve ter pelo menos 3 caracteres"
  } else if (values.name.length > 50) {
    errors.name = "O nome deve ter no máximo 50 caracteres"
  }

  // Prompt validation
  if (!values.prompt.trim()) {
    errors.prompt = "O prompt do agente é obrigatório"
  } else if (values.prompt.length < 50) {
    errors.prompt = "O prompt deve ser mais detalhado (mínimo 50 caracteres)"
  }

  // Max tokens validation
  if (values.maxTokens !== undefined && values.maxTokens !== null && String(values.maxTokens).trim() !== "") {
    const maxTokensNum = Number(values.maxTokens)
    if (isNaN(maxTokensNum) || maxTokensNum < 1) {
      errors.maxTokens = "O valor deve ser um número positivo"
    } else if (maxTokensNum > 32000) {
      errors.maxTokens = "O valor máximo é 32000"
    }
  }

  // Temperature validation
  if (values.temperature !== undefined && values.temperature !== null && String(values.temperature).trim() !== "") {
    const temperatureNum = Number(values.temperature)
    if (isNaN(temperatureNum) || temperatureNum < 0) {
      errors.temperature = "O valor deve ser um número positivo"
    } else if (temperatureNum > 2) {
      errors.temperature = "O valor máximo é 2"
    }
  }

  // Top P validation
  if (values.topP !== undefined && values.topP !== null && String(values.topP).trim() !== "") {
    const topPNum = Number(values.topP)
    if (isNaN(topPNum) || topPNum < 0 || topPNum > 1) {
      errors.topP = "O valor deve estar entre 0 e 1"
    }
  }

  // Frequency penalty validation
  if (values.frequencyPenalty !== undefined && values.frequencyPenalty !== null && String(values.frequencyPenalty).trim() !== "") {
    const frequencyPenaltyNum = Number(values.frequencyPenalty)
    if (isNaN(frequencyPenaltyNum) || frequencyPenaltyNum < -2 || frequencyPenaltyNum > 2) {
      errors.frequencyPenalty = "O valor deve estar entre -2 e 2"
    }
  }

  // Presence penalty validation
  if (values.presencePenalty !== undefined && values.presencePenalty !== null && String(values.presencePenalty).trim() !== "") {
    const presencePenaltyNum = Number(values.presencePenalty)
    if (isNaN(presencePenaltyNum) || presencePenaltyNum < -2 || presencePenaltyNum > 2) {
      errors.presencePenalty = "O valor deve estar entre -2 e 2"
    }
  }

  return errors
}

