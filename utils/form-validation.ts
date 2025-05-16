import type { AgentFormData } from "@/types/agent-types";

export function validateAgentForm(data: AgentFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 3) {
    errors.name = "O nome do agente deve ter pelo menos 3 caracteres.";
  }
  if (!data.model) {
    errors.model = "Selecione um modelo válido.";
  }
  if (!data.prompt || data.prompt.trim().length < 10) {
    errors.prompt = "O prompt deve ter pelo menos 10 caracteres.";
  }
  // Adicione outras validações conforme necessário
  return { valid: Object.keys(errors).length === 0, errors };
}
