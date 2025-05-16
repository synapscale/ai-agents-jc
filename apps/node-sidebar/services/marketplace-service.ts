// This is a mock implementation - replace with your actual implementation
import type {
  MarketplaceItem,
  MarketplaceRating,
  ImportHistory,
  PublishRequest,
  MarketplaceItemVersion,
  SkillCategory,
  SkillCollection,
} from "@/types/marketplace-types"
import type { Skill, CustomNode } from "@/types/skill-types"
import { useSkillsStore } from "@/stores/use-skills-store"

// Simulação de API para o marketplace
// Em um ambiente real, isso seria substituído por chamadas de API para um backend

// Dados de exemplo para o marketplace
const DEMO_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "mkt-skill-1",
    type: "skill",
    originalId: "skill-1",
    name: "Transformação de Texto",
    description: "Transforma texto com várias operações como capitalização, remoção de espaços, etc.",
    version: "1.0.0",
    author: {
      id: "user-1",
      username: "johndoe",
      displayName: "John Doe",
      createdAt: new Date().toISOString(),
      isVerified: true,
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 1250,
    rating: 4.7,
    ratingsCount: 48,
    tags: ["text", "transformation", "string"],
    category: "data-transformation",
    isPublic: true,
    isVerified: true,
    isDeprecated: false,
    license: "MIT",
    pricing: {
      type: "free",
    },
    stats: {
      views: 3500,
      downloads: 1250,
      favorites: 87,
      usageCount: 2300,
    },
    metadata: {},
  },
  {
    id: "mkt-skill-2",
    type: "skill",
    originalId: "skill-2",
    name: "Integração com OpenAI",
    description: "Conecta-se à API da OpenAI para gerar texto usando modelos como GPT-4.",
    version: "1.2.0",
    author: {
      id: "user-2",
      username: "aisha",
      displayName: "Aisha Johnson",
      createdAt: new Date().toISOString(),
      isVerified: true,
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 3800,
    rating: 4.9,
    ratingsCount: 125,
    tags: ["ai", "openai", "gpt", "text-generation"],
    category: "ai",
    isPublic: true,
    isVerified: true,
    isDeprecated: false,
    license: "Apache-2.0",
    pricing: {
      type: "free",
    },
    stats: {
      views: 8200,
      downloads: 3800,
      favorites: 320,
      usageCount: 12500,
    },
    metadata: {},
  },
  {
    id: "mkt-node-1",
    type: "node",
    originalId: "node-1",
    name: "Processador de Dados CSV",
    description: "Node completo para importar, processar e exportar dados CSV com várias transformações.",
    version: "2.1.0",
    author: {
      id: "user-3",
      username: "maria",
      displayName: "Maria Silva",
      createdAt: new Date().toISOString(),
      isVerified: false,
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 950,
    rating: 4.5,
    ratingsCount: 32,
    tags: ["csv", "data-processing", "import", "export"],
    category: "data-transformation",
    isPublic: true,
    isVerified: false,
    isDeprecated: false,
    license: "MIT",
    pricing: {
      type: "free",
    },
    stats: {
      views: 2100,
      downloads: 950,
      favorites: 45,
      usageCount: 1800,
    },
    metadata: {},
  },
  {
    id: "mkt-skill-3",
    type: "skill",
    originalId: "skill-3",
    name: "Validação de Dados Avançada",
    description: "Skill para validação de dados com suporte a schemas complexos e regras personalizadas.",
    version: "1.5.0",
    author: {
      id: "user-4",
      username: "alex",
      displayName: "Alex Chen",
      createdAt: new Date().toISOString(),
      isVerified: true,
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 2100,
    rating: 4.8,
    ratingsCount: 67,
    tags: ["validation", "data", "schema", "zod"],
    category: "data-transformation",
    isPublic: true,
    isVerified: true,
    isDeprecated: false,
    license: "MIT",
    thumbnailUrl: "/placeholder-ok5z5.png",
    pricing: {
      type: "paid",
      price: 4.99,
      currency: "USD",
    },
    stats: {
      views: 4500,
      downloads: 2100,
      favorites: 130,
      usageCount: 5600,
    },
    metadata: {},
  },
  {
    id: "mkt-node-2",
    type: "node",
    originalId: "node-2",
    name: "Dashboard Interativo",
    description: "Node para criar dashboards interativos com gráficos e filtros dinâmicos.",
    version: "3.0.0",
    author: {
      id: "user-5",
      username: "sarah",
      displayName: "Sarah Williams",
      createdAt: new Date().toISOString(),
      isVerified: true,
    },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 1750,
    rating: 4.6,
    ratingsCount: 53,
    tags: ["dashboard", "visualization", "charts", "interactive"],
    category: "ui-interaction",
    isPublic: true,
    isVerified: true,
    isDeprecated: false,
    license: "MIT",
    thumbnailUrl: "/interactive-dashboard.png",
    pricing: {
      type: "free",
    },
    stats: {
      views: 3800,
      downloads: 1750,
      favorites: 95,
      usageCount: 3200,
    },
    metadata: {},
  },
]

// Sample categories for demonstration
const DEMO_CATEGORIES: SkillCategory[] = [
  {
    id: "cat-1",
    name: "Data Processing",
    slug: "data-processing",
    description: "Skills for processing and transforming data",
    icon: "database",
    color: "#3b82f6",
    order: 1,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "AI & Machine Learning",
    slug: "ai-ml",
    description: "Skills for artificial intelligence and machine learning",
    icon: "brain",
    color: "#8b5cf6",
    order: 2,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Integrations",
    slug: "integrations",
    description: "Skills for integrating with external services and APIs",
    icon: "link",
    color: "#10b981",
    order: 3,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "UI Components",
    slug: "ui-components",
    description: "Skills for building user interfaces",
    icon: "layout",
    color: "#f59e0b",
    order: 4,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Utilities",
    slug: "utilities",
    description: "Utility skills for common tasks",
    icon: "tool",
    color: "#6b7280",
    order: 5,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Sample collections for demonstration
const DEMO_COLLECTIONS: SkillCollection[] = [
  {
    id: "col-1",
    name: "Data Science Essentials",
    description: "Essential skills for data science workflows",
    slug: "data-science-essentials",
    userId: "user-1",
    isPublic: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: "mkt-skill-1", type: "skill", addedAt: new Date().toISOString() },
      { id: "mkt-skill-3", type: "skill", addedAt: new Date().toISOString() },
      { id: "mkt-node-1", type: "node", addedAt: new Date().toISOString() },
    ],
    thumbnailUrl: "/data-science-collection.png",
    featured: true,
    color: "#3b82f6",
    icon: "chart-bar",
    tags: ["data", "analysis", "visualization"],
    categoryId: "cat-1",
    stats: {
      views: 1250,
      downloads: 450,
      favorites: 85,
    },
  },
  {
    id: "col-2",
    name: "AI Assistant Builder",
    description: "Collection of skills for building AI assistants",
    slug: "ai-assistant-builder",
    userId: "user-2",
    isPublic: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: "mkt-skill-2", type: "skill", addedAt: new Date().toISOString() },
      { id: "mkt-node-2", type: "node", addedAt: new Date().toISOString() },
    ],
    thumbnailUrl: "/ai-assistant-collection.png",
    featured: true,
    color: "#8b5cf6",
    icon: "message-circle",
    tags: ["ai", "chatbot", "assistant"],
    categoryId: "cat-2",
    stats: {
      views: 2800,
      downloads: 980,
      favorites: 210,
    },
  },
  {
    id: "col-3",
    name: "API Integration Kit",
    description: "Skills for integrating with popular APIs",
    slug: "api-integration-kit",
    userId: "user-3",
    isPublic: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    items: [{ id: "mkt-skill-2", type: "skill", addedAt: new Date().toISOString() }],
    thumbnailUrl: "/api-integration-collection.png",
    featured: false,
    color: "#10b981",
    icon: "link",
    tags: ["api", "integration", "connector"],
    categoryId: "cat-3",
    stats: {
      views: 950,
      downloads: 320,
      favorites: 65,
    },
  },
]

// Classe de serviço para o marketplace
export const MarketplaceService = {
  searchItems: async (filters: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Return mock data
    return {
      items: Array.from({ length: 6 }).map((_, i) => ({
        id: `item-${i}`,
        name: `Marketplace Item ${i + 1}`,
        description: "This is a sample marketplace item description that would typically describe what the item does.",
        type: i % 2 === 0 ? "skill" : "node",
        category: "General",
        version: "1.0.0",
        author: {
          id: "user-1",
          displayName: "Sample User",
          isVerified: true,
        },
        tags: ["tag1", "tag2", "tag3"],
        rating: 4.5,
        downloads: 120 + i * 10,
        publishedAt: new Date().toISOString(),
        license: "MIT",
      })) as MarketplaceItem[],
      totalCount: 20,
      hasMore: true,
    }
  },
  
  getFeaturedCollections: async (limit: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Return mock data
    return Array.from({ length: limit }).map((_, i) => ({
      id: `collection-${i}`,
      name: `Featured Collection ${i + 1}`,
      description: "This is a sample collection that contains various marketplace items.",
      userId: "user-1",
      isPublic: true,
      items: [],
      tags: ["featured", "collection", "sample"],
      stats: {
        favorites: 45 + i * 5,
        downloads: 120 + i * 15,
      },
    })) as SkillCollection[]
  },
  
  getUserItems: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    
    // Return mock data
    return {
      items: Array.from({ length: 3 }).map((_, i) => ({
        id: `user-item-${i}`,
        name: `My Item ${i + 1}`,
        description: "This is one of your marketplace items.",
        type: i % 2 === 0 ? "skill" : "node",
        category: "Personal",
        version: "1.0.0",
        author: {
          id: "current-user",
          displayName: "You",
          isVerified: false,
        },
        tags: ["personal", "custom"],
        rating: 0,
        downloads: 0,
        publishedAt: new Date().toISOString(),
        license: "Personal",
      })) as MarketplaceItem[],
      totalCount: 3,
      hasMore: false,
    }
  },
  
  getUserCollections: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Return mock data
    return Array.from({ length: 2 }).map((_, i) => ({
      id: `user-collection-${i}`,
      name: `My Collection ${i + 1}`,
      description: "This is one of your personal collections.",
      userId: "current-user",
      isPublic: i === 0,
      items: [],
      tags: ["personal", "collection"],
      stats: {
        favorites: 0,
        downloads: 0,
      },
    })) as SkillCollection[]
  },
  
  getCategories: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Return mock data
    return [
      { id: "general", name: "General" },
      { id: "data-processing", name: "Data Processing" },
      { id: "ai", name: "AI & Machine Learning" },
      { id: "integration", name: "Integrations" },
    ]
  },
  // Obter detalhes de um item
  async getItemDetails(itemId: string): Promise<MarketplaceItem | null> {
    // Simulação de uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 300))

    const item = DEMO_MARKETPLACE_ITEMS.find((item) => item.id === itemId)
    return item || null
  }
\
  static async getItemVersions(itemId: string): Promise<MarketplaceItemVersion[]>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Dados de exemplo para versões
  const versions: MarketplaceItemVersion[] = [
    {
      id: `${itemId}-v1.0.0`,
      itemId,
      version: "1.0.0",
      publishedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 dias atrás
      changelog: "Versão inicial",
      isDeprecated: false,
    },
    {
      id: `${itemId}-v1.1.0`,
      itemId,
      version: "1.1.0",
      publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 dias atrás
      changelog: "Correção de bugs e melhorias de desempenho",
      isDeprecated: false,
    },
    {
      id: `${itemId}-v1.2.0`,
      itemId,
      version: "1.2.0",
      publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias atrás
      changelog: "Adição de novos recursos e melhorias na interface",
      isDeprecated: false,
    },
  ]

  return versions
}

// Obter avaliações de um item
static
async
getItemRatings(itemId: string)
: Promise<MarketplaceRating[]>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Dados de exemplo para avaliações
  const ratings: MarketplaceRating[] = [
    {
      id: `rating-1-${itemId}`,
      itemId,
      userId: "user-101",
      rating: 5,
      comment: "Excelente skill, muito útil e fácil de usar!",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: true,
      likes: 12,
      dislikes: 1,
    },
    {
      id: `rating-2-${itemId}`,
      itemId,
      userId: "user-102",
      rating: 4,
      comment: "Muito bom, mas poderia ter mais opções de configuração.",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: true,
      likes: 5,
      dislikes: 0,
    },
    {
      id: `rating-3-${itemId}`,
      itemId,
      userId: "user-103",
      rating: 5,
      comment: "Perfeito para o que eu precisava!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: false,
      likes: 3,
      dislikes: 0,
    },
  ]

  return ratings
}

// Importar um item do marketplace
static
async
importItem(itemId: string, version?: string)
: Promise<ImportHistory>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const item = DEMO_MARKETPLACE_ITEMS.find((item) => item.id === itemId)
  if (!item) {
    throw new Error("Item não encontrado")
  }

  // Em um ambiente real, aqui buscaríamos os detalhes completos do item
  // e o converteríamos para o formato interno

  // Adicionar o item importado ao store local
  const { addSkill, addCustomNode } = useSkillsStore.getState()

  let localItemId = ""

  if (item.type === "skill") {
    // Criar uma skill local baseada no item do marketplace
    const skillData: Omit<Skill, "id" | "createdAt" | "updatedAt" | "version"> = {
      name: item.name,
      description: item.description,
      type: item.category as any,
      author: item.author.displayName,
      inputs: [],
      outputs: [],
      implementation: {
        language: "javascript",
        code: "// Código importado do marketplace\nreturn { result: inputs.value };",
      },
      metadata: {
        tags: item.tags,
        category: item.category,
        icon: "",
        color: "",
        documentation: "",
        isImported: true,
        originalMarketplaceId: item.id,
        importedAt: new Date().toISOString(),
        importedVersion: version || item.version,
      },
    }

    localItemId = addSkill(skillData)
  } else {
    // Criar um node local baseado no item do marketplace
    const nodeData: Omit<CustomNode, "id" | "createdAt" | "updatedAt" | "version"> = {
      name: item.name,
      description: item.description,
      category: item.category,
      author: item.author.displayName,
      skills: [],
      connections: [],
      inputs: [],
      outputs: [],
      inputMappings: [],
      outputMappings: [],
      metadata: {
        tags: item.tags,
        icon: "",
        color: "",
        documentation: "",
        isImported: true,
        originalMarketplaceId: item.id,
        importedAt: new Date().toISOString(),
        importedVersion: version || item.version,
      },
    }

    localItemId = addCustomNode(nodeData)
  }

  // Registrar o histórico de importação
  const importHistory: ImportHistory = {
    id: `import-${Date.now()}`,
    userId: "current-user", // Em um ambiente real, seria o ID do usuário atual
    itemId,
    itemType: item.type,
    importedAt: new Date().toISOString(),
    version: version || item.version,
    status: "success",
    localItemId,
  }

  // Em um ambiente real, salvaríamos este histórico em um banco de dados
  return importHistory
}

// Publicar um item no marketplace
static
async
publishItem(
    itemType: "skill" | "node",
    itemId: string,
    publishData: {
      isPublic: boolean
      license: string
      tags?: string[]
      pricing?: {
        type: "free" | "paid" | "subscription"
        price?: number
        currency?: string
        subscriptionPeriod?: "monthly" | "yearly"
      }
      changelog?: string
},
  ): Promise<PublishRequest>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Em um ambiente real, aqui enviaríamos os dados para o backend
  // e criaríamos uma solicitação de publicação

  const publishRequest: PublishRequest = {
    id: `pub-req-${Date.now()}`,
    userId: "current-user", // Em um ambiente real, seria o ID do usuário atual
    itemType,
    itemId,
    version: "1.0.0", // Em um ambiente real, seria a versão atual do item
    status: "pending",
    submittedAt: new Date().toISOString(),
    isUpdate: false,
    changelog: publishData.changelog,
  }

  return publishRequest
}

// Obter histórico de importações do usuário
static
async
getUserImportHistory()
: Promise<ImportHistory[]>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Em um ambiente real, buscaríamos do banco de dados
  // Aqui retornamos dados de exemplo
  const importHistory: ImportHistory[] = [
    {
      id: "import-1",
      userId: "current-user",
      itemId: "mkt-skill-1",
      itemType: "skill",
      importedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      version: "1.0.0",
      status: "success",
      localItemId: "local-skill-1",
    },
    {
      id: "import-2",
      userId: "current-user",
      itemId: "mkt-node-1",
      itemType: "node",
      importedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      version: "2.1.0",
      status: "success",
      localItemId: "local-node-1",
    },
    {
      id: "import-3",
      userId: "current-user",
      itemId: "mkt-skill-3",
      itemType: "skill",
      importedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      version: "1.5.0",
      status: "failed",
      errorMessage: "Erro ao importar: conflito de dependências",
    },
  ]

  return importHistory
}

// Obter histórico de publicações do usuário
static
async
getUserPublishHistory()
: Promise<PublishRequest[]>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Em um ambiente real, buscaríamos do banco de dados
  // Aqui retornamos dados de exemplo
  const publishHistory: PublishRequest[] = [
    {
      id: "pub-req-1",
      userId: "current-user",
      itemType: "skill",
      itemId: "local-skill-2",
      version: "1.0.0",
      status: "published",
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      reviewerId: "admin-1",
      isUpdate: false,
    },
    {
      id: "pub-req-2",
      userId: "current-user",
      itemType: "node",
      itemId: "local-node-2",
      version: "1.0.0",
      status: "pending",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isUpdate: false,
    },
    {
      id: "pub-req-3",
      userId: "current-user",
      itemType: "skill",
      itemId: "local-skill-2",
      version: "1.1.0",
      status: "rejected",
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      reviewerId: "admin-2",
      reviewNotes: "Violação dos termos de uso: código potencialmente malicioso",
      isUpdate: true,
      changelog: "Adição de novos recursos e correção de bugs",
    },
  ]

  return publishHistory
}

// Exportar um item para compartilhamento
static
async
exportItem(itemType: "skill" | "node", itemId: string)
: Promise<string>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Em um ambiente real, buscaríamos os detalhes completos do item
  // e o converteríamos para um formato exportável (JSON)

  // Aqui simulamos a geração de um arquivo JSON
  const { skills, customNodes } = useSkillsStore.getState()

  let itemData: any = null

  if (itemType === "skill") {
    const skill = skills.find((s) => s.id === itemId)
    if (!skill) throw new Error("Skill não encontrada")
    itemData = skill
  } else {
    const node = customNodes.find((n) => n.id === itemId)
    if (!node) throw new Error("Node não encontrado")
    itemData = node
  }

  // Criar um objeto de exportação com metadados
  const exportData = {
    type: itemType,
    version: "1.0",
    exportedAt: new Date().toISOString(),
    data: itemData,
  }

  // Converter para JSON
  const jsonData = JSON.stringify(exportData, null, 2)

  // Em um ambiente real, retornaríamos um URL para download ou o próprio blob
  // Aqui retornamos apenas o JSON como string para simulação
  return jsonData
}

// Importar um item a partir de um arquivo
static
async
importFromFile(fileContent: string)
: Promise<string>
{
  // Simulação de uma chamada de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    // Parsear o conteúdo do arquivo
    const importData = JSON.parse(fileContent)

    // Validar o formato
    if (!importData.type || !importData.data) {
      throw new Error("Formato de arquivo inválido")
    }

    // Adicionar o item importado ao store local
    const { addSkill, addCustomNode } = useSkillsStore.getState()

    let localItemId = ""

    if (importData.type === "skill") {
      // Extrair os dados da skill
      const skillData = importData.data

      // Remover o ID original e adicionar metadados de importação
      const { id, ...skillWithoutId } = skillData

      // Adicionar metadados de importação
      skillWithoutId.metadata = {
        ...(skillWithoutId.metadata || {}),
        isImported: true,
        importedFrom: "file",
        importedAt: new Date().toISOString(),
      }

      // Adicionar a skill ao store local
      localItemId = addSkill(skillWithoutId)
    } else if (importData.type === "node") {
      // Extrair os dados do node
      const nodeData = importData.data

      // Remover o ID original e adicionar metadados de importação
      const { id, ...nodeWithoutId } = nodeData

      // Adicionar metadados de importação
      nodeWithoutId.metadata = {
        ...(nodeWithoutId.metadata || {}),
        isImported: true,
        importedFrom: "file",
        importedAt: new Date().toISOString(),
      }

      // Adicionar o node ao store local
      localItemId = addCustomNode(nodeWithoutId)
    } else {
      throw new Error("Tipo de item não suportado")
    }

    return localItemId
  } catch (error) {
    console.error("Erro ao importar arquivo:", error)
    throw new Error(`Erro ao importar arquivo: ${error.message}`)
  }
}

// Get all categories
static
async
getCategories()
: Promise<SkillCategory[]>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  return DEMO_CATEGORIES
}

// Get category by ID
static
async
getCategoryById(categoryId: string)
: Promise<SkillCategory | null>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 200))
  return DEMO_CATEGORIES.find((cat) => cat.id === categoryId) || null
}

// Search collections
static
async
searchCollections(filters: CollectionFilters = {})
: Promise<CollectionSearchResponse>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredCollections = [...DEMO_COLLECTIONS]

  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase()
    filteredCollections = filteredCollections.filter(
      (collection) =>
        collection.name.toLowerCase().includes(query) ||
        collection.description.toLowerCase().includes(query) ||
        collection.tags?.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  if (filters.userId) {
    filteredCollections = filteredCollections.filter((collection) => collection.userId === filters.userId)
  }

  if (filters.isPublic !== undefined) {
    filteredCollections = filteredCollections.filter((collection) => collection.isPublic === filters.isPublic)
  }

  if (filters.featured !== undefined) {
    filteredCollections = filteredCollections.filter((collection) => collection.featured === filters.featured)
  }

  if (filters.categoryId) {
    filteredCollections = filteredCollections.filter((collection) => collection.categoryId === filters.categoryId)
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredCollections = filteredCollections.filter((collection) =>
      filters.tags!.some((tag) => collection.tags?.includes(tag)),
    )
  }

  // Sort collections
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "name":
        filteredCollections.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "created":
        filteredCollections.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "updated":
        filteredCollections.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        break
      case "popularity":
        filteredCollections.sort((a, b) => b.stats.downloads - a.stats.downloads)
        break
    }
  }

  // Pagination
  const page = filters.page || 1
  const pageSize = filters.pageSize || 10
  const startIndex = (page - 1) * pageSize
  const paginatedCollections = filteredCollections.slice(startIndex, startIndex + pageSize)

  return {
      collections: paginatedCollections,
      totalCount: filteredCollections.length,
      page,
      pageSize,
      hasMore: startIndex + pageSize < filteredCollections.length,
    }
}

// Get collection by ID
static
async
getCollectionById(collectionId: string)
: Promise<SkillCollection | null>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  return DEMO_COLLECTIONS.find((collection) => collection.id === collectionId) || null
}

// Create a new collection
static
async
createCollection(data: {
    name: string
    description: string
    isPublic: boolean
    tags?: string[]
    categoryId?: string
}): Promise<SkillCollection>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newCollection: SkillCollection = {
    id: `col-${Date.now()}`,
    name: data.name,
    description: data.description,
    slug: data.name.toLowerCase().replace(/\s+/g, "-"),
    userId: "current-user", // In a real app, this would be the current user's ID
    isPublic: data.isPublic,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [],
    featured: false,
    tags: data.tags || [],
    categoryId: data.categoryId,
    stats: {
      views: 0,
      downloads: 0,
      favorites: 0,
    },
  }

  // In a real app, this would be saved to a database
  DEMO_COLLECTIONS.push(newCollection)

  return newCollection
}

// Update a collection
static
async
updateCollection(
    collectionId: string,
    data: {
      name?: string
      description?: string
      isPublic?: boolean
      tags?: string[]
      categoryId?: string
},
  ): Promise<SkillCollection | null>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const collectionIndex = DEMO_COLLECTIONS.findIndex((collection) => collection.id === collectionId)
  if (collectionIndex === -1) return null

  const updatedCollection = {
    ...DEMO_COLLECTIONS[collectionIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  // In a real app, this would update the database
  DEMO_COLLECTIONS[collectionIndex] = updatedCollection

  return updatedCollection
}

// Delete a collection
static
async
deleteCollection(collectionId: string)
: Promise<boolean>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const collectionIndex = DEMO_COLLECTIONS.findIndex((collection) => collection.id === collectionId)
  if (collectionIndex === -1) return false

  // In a real app, this would delete from the database
  DEMO_COLLECTIONS.splice(collectionIndex, 1)

  return true
}

// Add item to collection
static
async
addItemToCollection(
    collectionId: string,
    itemId: string,
    itemType: "skill" | "node",
  )
: Promise<CollectionItem | null>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const collection = DEMO_COLLECTIONS.find((collection) => collection.id === collectionId)
  if (!collection) return null

  // Check if item already exists in collection
  const existingItem = collection.items.find((item) => item.id === itemId && item.type === itemType)
  if (existingItem) return null

  // Add item to collection
  const newItem = {
    id: itemId,
    type: itemType,
    addedAt: new Date().toISOString(),
  }

  collection.items.push(newItem)
  collection.updatedAt = new Date().toISOString()

  // In a real app, this would update the database
  return {
      collectionId,
      itemId,
      itemType,
      addedAt: newItem.addedAt,
      addedBy: "current-user", // In a real app, this would be the current user's ID
    }
}

// Remove item from collection
static
async
removeItemFromCollection(collectionId: string, itemId: string)
: Promise<boolean>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const collection = DEMO_COLLECTIONS.find((collection) => collection.id === collectionId)
  if (!collection) return false

  // Find and remove the item
  const itemIndex = collection.items.findIndex((item) => item.id === itemId)
  if (itemIndex === -1) return false

  collection.items.splice(itemIndex, 1)
  collection.updatedAt = new Date().toISOString()

  // In a real app, this would update the database
  return true
}

// Get user's collections
static
async
getUserCollections()
: Promise<SkillCollection[]>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  // In a real app, this would filter by the current user's ID
  return DEMO_COLLECTIONS.filter((collection) => collection.userId === "current-user")
}

// Get featured collections
static
async
getFeaturedCollections((limit = 5))
: Promise<SkillCollection[]>
{
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return DEMO_COLLECTIONS.filter((collection) => collection.featured)
      .sort((a, b) => b.stats.views - a.stats.views)
      .slice(0, limit)
}
}
