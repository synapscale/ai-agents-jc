/**
 * @fileoverview
 * Constantes relacionadas à integração com IA.
 * Estas constantes são projetadas para serem explícitas e bem documentadas,
 * facilitando a compreensão e uso por ferramentas de IA.
 */

/**
 * Modelos de IA suportados pela aplicação
 */
export const AI_MODELS = {
  /** OpenAI GPT-4 */
  GPT_4: "gpt-4",

  /** OpenAI GPT-4o */
  GPT_4O: "gpt-4o",

  /** OpenAI GPT-3.5 Turbo */
  GPT_3_5_TURBO: "gpt-3.5-turbo",

  /** Anthropic Claude 3 Opus */
  CLAUDE_3_OPUS: "claude-3-opus",

  /** Anthropic Claude 3 Sonnet */
  CLAUDE_3_SONNET: "claude-3-sonnet",

  /** Anthropic Claude 3 Haiku */
  CLAUDE_3_HAIKU: "claude-3-haiku",

  /** Google Gemini Pro */
  GEMINI_PRO: "gemini-pro",

  /** Mistral Large */
  MISTRAL_LARGE: "mistral-large",

  /** Llama 3 */
  LLAMA_3: "llama-3",
} as const

/**
 * Tipos de mensagens suportados
 */
export const MESSAGE_TYPES = {
  /** Mensagem do usuário */
  USER: "user",

  /** Mensagem do assistente */
  ASSISTANT: "assistant",

  /** Mensagem do sistema */
  SYSTEM: "system",

  /** Mensagem de erro */
  ERROR: "error",
} as const

/**
 * Capacidades dos modelos de IA
 */
export const AI_CAPABILITIES = {
  /** Geração de texto */
  TEXT: "text",

  /** Geração de código */
  CODE: "code",

  /** Raciocínio lógico */
  REASONING: "reasoning",

  /** Processamento de imagens */
  VISION: "vision",

  /** Geração de imagens */
  IMAGE_GENERATION: "image-generation",

  /** Processamento de áudio */
  AUDIO: "audio",

  /** Análise de dados */
  DATA_ANALYSIS: "data-analysis",
} as const

/**
 * Personalidades disponíveis para o assistente
 */
export const AI_PERSONALITIES = {
  /** Assistente padrão */
  DEFAULT: "default",

  /** Assistente criativo */
  CREATIVE: "creative",

  /** Assistente técnico */
  TECHNICAL: "technical",

  /** Assistente conciso */
  CONCISE: "concise",

  /** Assistente detalhado */
  DETAILED: "detailed",
} as const

/**
 * Ferramentas disponíveis para o assistente
 */
export const AI_TOOLS = {
  /** Pesquisa na web */
  WEB_SEARCH: "web-search",

  /** Interpretador de código */
  CODE_INTERPRETER: "code-interpreter",

  /** Recuperação de documentos */
  RETRIEVAL: "retrieval",

  /** Geração de imagens */
  IMAGE_GENERATION: "image-generation",

  /** Análise de dados */
  DATA_ANALYSIS: "data-analysis",
} as const

/**
 * Limites de tokens para diferentes modelos
 */
export const TOKEN_LIMITS = {
  /** Limite para GPT-3.5 Turbo */
  [AI_MODELS.GPT_3_5_TURBO]: 4096,

  /** Limite para GPT-4 */
  [AI_MODELS.GPT_4]: 8192,

  /** Limite para GPT-4o */
  [AI_MODELS.GPT_4O]: 128000,

  /** Limite para Claude 3 Opus */
  [AI_MODELS.CLAUDE_3_OPUS]: 200000,

  /** Limite para Claude 3 Sonnet */
  [AI_MODELS.CLAUDE_3_SONNET]: 180000,

  /** Limite para Claude 3 Haiku */
  [AI_MODELS.CLAUDE_3_HAIKU]: 150000,

  /** Limite para Gemini Pro */
  [AI_MODELS.GEMINI_PRO]: 32768,

  /** Limite para Mistral Large */
  [AI_MODELS.MISTRAL_LARGE]: 32768,

  /** Limite para Llama 3 */
  [AI_MODELS.LLAMA_3]: 8192,
} as const

/**
 * Prompts de sistema para diferentes personalidades
 */
export const SYSTEM_PROMPTS = {
  /** Prompt para personalidade padrão */
  [AI_PERSONALITIES.DEFAULT]: `Você é um assistente útil, inofensivo e honesto.`,

  /** Prompt para personalidade criativa */
  [AI_PERSONALITIES.CREATIVE]: `Você é um assistente criativo que gera ideias originais e inspiradoras.`,

  /** Prompt para personalidade técnica */
  [AI_PERSONALITIES.TECHNICAL]: `Você é um assistente técnico especializado em programação e desenvolvimento de software.`,

  /** Prompt para personalidade concisa */
  [AI_PERSONALITIES.CONCISE]: `Você é um assistente que fornece respostas diretas e concisas.`,

  /** Prompt para personalidade detalhada */
  [AI_PERSONALITIES.DETAILED]: `Você é um assistente que fornece explicações detalhadas e abrangentes.`,
} as const

/**
 * Atributos de dados para detecção de componentes
 */
export const COMPONENT_DETECTION_ATTRIBUTES = {
  /** Atributo para nome do componente */
  NAME: "data-component-name",

  /** Atributo para caminho do componente */
  PATH: "data-component-path",

  /** Atributo para ID do componente */
  ID: "data-component-id",

  /** Atributo para tipo do componente */
  TYPE: "data-component-type",

  /** Atributo para indicar que o componente é selecionável */
  SELECTABLE: "data-component-selectable",

  /** Atributo para indicar que o componente é modificável */
  MODIFIABLE: "data-component-modifiable",
} as const

/**
 * Atalhos de teclado para a aplicação
 */
export const KEYBOARD_SHORTCUTS = {
  /** Atalho para ativar/desativar o seletor de componentes */
  TOGGLE_COMPONENT_SELECTOR: "ctrl+shift+c",

  /** Atalho para ativar/desativar o modo de foco */
  TOGGLE_FOCUS_MODE: "ctrl+shift+f",

  /** Atalho para criar nova conversa */
  NEW_CONVERSATION: "ctrl+n",

  /** Atalho para enviar mensagem */
  SEND_MESSAGE: "ctrl+enter",

  /** Atalho para cancelar geração */
  CANCEL_GENERATION: "escape",
} as const
