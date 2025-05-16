import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Skill, SkillVersion, CustomNode, CustomNodeVersion, CustomDataType } from "@/types/skill-types"

interface SkillsState {
  // Coleções principais
  skills: Skill[]
  skillVersions: SkillVersion[]
  customNodes: CustomNode[]
  customNodeVersions: CustomNodeVersion[]
  customDataTypes: CustomDataType[]

  // Gerenciamento de skills
  addSkill: (skill: Omit<Skill, "id" | "createdAt" | "updatedAt" | "version">) => string
  updateSkill: (skillId: string, updates: Partial<Omit<Skill, "id" | "createdAt" | "updatedAt">>) => void
  deleteSkill: (skillId: string) => void
  getSkill: (skillId: string) => Skill | undefined
  getSkillVersion: (skillId: string, version: string) => Skill | undefined
  createSkillVersion: (skillId: string) => string

  // Gerenciamento de nodes customizados
  addCustomNode: (node: Omit<CustomNode, "id" | "createdAt" | "updatedAt" | "version">) => string
  updateCustomNode: (nodeId: string, updates: Partial<Omit<CustomNode, "id" | "createdAt" | "updatedAt">>) => void
  deleteCustomNode: (nodeId: string) => void
  getCustomNode: (nodeId: string) => CustomNode | undefined
  getCustomNodeVersion: (nodeId: string, version: string) => Skill | undefined
  createCustomNodeVersion: (nodeId: string) => string

  // Gerenciamento de tipos de dados personalizados
  addCustomDataType: (dataType: Omit<CustomDataType, "id" | "createdAt" | "updatedAt" | "version">) => string
  updateCustomDataType: (
    dataTypeId: string,
    updates: Partial<Omit<CustomDataType, "id" | "createdAt" | "updatedAt">>,
  ) => void
  deleteCustomDataType: (dataTypeId: string) => void
  getCustomDataType: (dataTypeId: string) => CustomDataType | undefined

  // Funções de busca e filtragem
  searchSkills: (query: string, filters?: { type?: string; tags?: string[] }) => Skill[]
  searchCustomNodes: (query: string, filters?: { category?: string; tags?: string[] }) => CustomNode[]
  getSkillsByType: (type: string) => Skill[]
  getCustomNodesByCategory: (category: string) => CustomNode[]
  getSkillsByTag: (tag: string) => Skill[]
  getCustomNodesByTag: (tag: string) => CustomNode[]
}

/**
 * useSkillsStore hook
 *
 * Manages the state of skills, custom nodes, and custom data types.
 * Uses Zustand for state management and Zustand Persist for persistence.
 */
export const useSkillsStore = create<SkillsState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      skills: [],
      skillVersions: [],
      customNodes: [],
      customNodeVersions: [],
      customDataTypes: [],

      /**
       * Adds a new skill to the store.
       * @param skillData The skill data to add.
       * @returns The ID of the newly created skill.
       */
      addSkill: (skillData) => {
        const id = crypto.randomUUID()
        const now = new Date().toISOString()
        const version = "1.0.0"

        const skill: Skill = {
          ...skillData,
          id,
          createdAt: now,
          updatedAt: now,
          version,
        }

        set((state) => ({
          skills: [...state.skills, skill],
          skillVersions: [
            ...state.skillVersions,
            {
              skillId: id,
              version,
              createdAt: now,
              skill,
            },
          ],
        }))

        return id
      },

      /**
       * Updates an existing skill in the store.
       * @param skillId The ID of the skill to update.
       * @param updates The partial skill data to update.
       */
      updateSkill: (skillId, updates) => {
        const now = new Date().toISOString()

        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === skillId
              ? {
                  ...skill,
                  ...updates,
                  updatedAt: now,
                }
              : skill,
          ),
        }))
      },

      /**
       * Deletes a skill from the store.
       * @param skillId The ID of the skill to delete.
       */
      deleteSkill: (skillId) => {
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== skillId),
          skillVersions: state.skillVersions.filter((version) => version.skillId !== skillId),
        }))
      },

      /**
       * Gets a skill from the store by its ID.
       * @param skillId The ID of the skill to retrieve.
       * @returns The skill, or undefined if not found.
       */
      getSkill: (skillId) => {
        return get().skills.find((skill) => skill.id === skillId)
      },

      /**
       * Gets a specific version of a skill from the store.
       * @param skillId The ID of the skill.
       * @param version The version of the skill to retrieve.
       * @returns The skill, or undefined if not found.
       */
      getSkillVersion: (skillId, version) => {
        const skillVersion = get().skillVersions.find((v) => v.skillId === skillId && v.version === version)
        return skillVersion?.skill
      },

      /**
       * Creates a new version of a skill.
       * @param skillId The ID of the skill to create a new version for.
       * @returns The new version string.
       */
      createSkillVersion: (skillId) => {
        const skill = get().getSkill(skillId)
        if (!skill) return ""

        const now = new Date().toISOString()

        // Incrementar a versão (simplificado)
        const currentVersion = skill.version.split(".")
        const newVersion = `${currentVersion[0]}.${currentVersion[1]}.${Number.parseInt(currentVersion[2]) + 1}`

        const newSkillVersion: SkillVersion = {
          skillId,
          version: newVersion,
          createdAt: now,
          skill: {
            ...skill,
            version: newVersion,
            updatedAt: now,
          },
        }

        set((state) => ({
          skillVersions: [...state.skillVersions, newSkillVersion],
        }))

        return newVersion
      },

      // Implementação das funções de gerenciamento de nodes customizados
      /**
       * Adds a new custom node to the store.
       * @param nodeData The custom node data to add.
       * @returns The ID of the newly created custom node.
       */
      addCustomNode: (nodeData) => {
        const id = crypto.randomUUID()
        const now = new Date().toISOString()
        const version = "1.0.0"

        const node: CustomNode = {
          ...nodeData,
          id,
          createdAt: now,
          updatedAt: now,
          version,
        }

        set((state) => ({
          customNodes: [...state.customNodes, node],
          customNodeVersions: [
            ...state.customNodeVersions,
            {
              nodeId: id,
              version,
              createdAt: now,
              node,
            },
          ],
        }))

        return id
      },

      /**
       * Updates an existing custom node in the store.
       * @param nodeId The ID of the custom node to update.
       * @param updates The partial custom node data to update.
       */
      updateCustomNode: (nodeId, updates) => {
        const now = new Date().toISOString()

        set((state) => ({
          customNodes: state.customNodes.map((node) =>
            node.id === nodeId
              ? {
                  ...node,
                  ...updates,
                  updatedAt: now,
                }
              : node,
          ),
        }))
      },

      /**
       * Deletes a custom node from the store.
       * @param nodeId The ID of the custom node to delete.
       */
      deleteCustomNode: (nodeId) => {
        set((state) => ({
          customNodes: state.customNodes.filter((node) => node.id !== nodeId),
          customNodeVersions: state.customNodeVersions.filter((version) => version.nodeId !== nodeId),
        }))
      },

      /**
       * Gets a custom node from the store by its ID.
       * @param nodeId The ID of the custom node to retrieve.
       * @returns The custom node, or undefined if not found.
       */
      getCustomNode: (nodeId) => {
        return get().customNodes.find((node) => node.id === nodeId)
      },

      /**
       * Gets a specific version of a custom node from the store.
       * @param nodeId The ID of the custom node.
       * @param version The version of the custom node to retrieve.
       * @returns The custom node, or undefined if not found.
       */
      getCustomNodeVersion: (nodeId, version) => {
        const nodeVersion = get().customNodeVersions.find((v) => v.nodeId === nodeId && v.version === version)
        return nodeVersion?.node
      },

      /**
       * Creates a new version of a custom node.
       * @param nodeId The ID of the custom node to create a new version for.
       * @returns The new version string.
       */
      createCustomNodeVersion: (nodeId) => {
        const node = get().getCustomNode(nodeId)
        if (!node) return ""

        const now = new Date().toISOString()

        // Incrementar a versão (simplificado)
        const currentVersion = node.version.split(".")
        const newVersion = `${currentVersion[0]}.${currentVersion[1]}.${Number.parseInt(currentVersion[2]) + 1}`

        const newNodeVersion: CustomNodeVersion = {
          nodeId,
          version: newVersion,
          createdAt: now,
          node: {
            ...node,
            version: newVersion,
            updatedAt: now,
          },
        }

        set((state) => ({
          customNodeVersions: [...state.customNodeVersions, newNodeVersion],
        }))

        return newVersion
      },

      // Implementação das funções de gerenciamento de tipos de dados personalizados
      /**
       * Adds a new custom data type to the store.
       * @param dataTypeData The custom data type data to add.
       * @returns The ID of the newly created custom data type.
       */
      addCustomDataType: (dataTypeData) => {
        const id = crypto.randomUUID()
        const now = new Date().toISOString()
        const version = "1.0.0"

        const dataType: CustomDataType = {
          ...dataTypeData,
          id,
          createdAt: now,
          updatedAt: now,
          version,
        }

        set((state) => ({
          customDataTypes: [...state.customDataTypes, dataType],
        }))

        return id
      },

      /**
       * Updates an existing custom data type in the store.
       * @param dataTypeId The ID of the custom data type to update.
       * @param updates The partial custom data type data to update.
       */
      updateCustomDataType: (dataTypeId, updates) => {
        const now = new Date().toISOString()

        set((state) => ({
          customDataTypes: state.customDataTypes.map((dataType) =>
            dataType.id === dataTypeId
              ? {
                  ...dataType,
                  ...updates,
                  updatedAt: now,
                }
              : dataType,
          ),
        }))
      },

      /**
       * Deletes a custom data type from the store.
       * @param dataTypeId The ID of the custom data type to delete.
       */
      deleteCustomDataType: (dataTypeId) => {
        set((state) => ({
          customDataTypes: state.customDataTypes.filter((dataType) => dataType.id !== dataTypeId),
        }))
      },

      /**
       * Gets a custom data type from the store by its ID.
       * @param dataTypeId The ID of the custom data type to retrieve.
       * @returns The custom data type, or undefined if not found.
       */
      getCustomDataType: (dataTypeId) => {
        return get().customDataTypes.find((dataType) => dataType.id === dataTypeId)
      },

      // Implementação das funções de busca e filtragem
      /**
       * Searches for skills in the store based on a query and filters.
       * @param query The search query.
       * @param filters The filters to apply.
       * @returns An array of skills that match the query and filters.
       */
      searchSkills: (query, filters) => {
        let results = get().skills

        // Filtrar por query
        if (query) {
          const lowerQuery = query.toLowerCase()
          results = results.filter(
            (skill) =>
              skill.name.toLowerCase().includes(lowerQuery) ||
              skill.description.toLowerCase().includes(lowerQuery) ||
              skill.metadata?.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
          )
        }

        // Filtrar por tipo
        if (filters?.type) {
          results = results.filter((skill) => skill.type === filters.type)
        }

        // Filtrar por tags
        if (filters?.tags && filters.tags.length > 0) {
          results = results.filter((skill) => filters.tags!.every((tag) => skill.metadata?.tags?.includes(tag)))
        }

        return results
      },

      /**
       * Searches for custom nodes in the store based on a query and filters.
       * @param query The search query.
       * @param filters The filters to apply.
       * @returns An array of custom nodes that match the query and filters.
       */
      searchCustomNodes: (query, filters) => {
        let results = get().customNodes

        // Filtrar por query
        if (query) {
          const lowerQuery = query.toLowerCase()
          results = results.filter(
            (node) =>
              node.name.toLowerCase().includes(lowerQuery) ||
              node.description.toLowerCase().includes(lowerQuery) ||
              node.metadata?.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
          )
        }

        // Filtrar por categoria
        if (filters?.category) {
          results = results.filter((node) => node.category === filters.category)
        }

        // Filtrar por tags
        if (filters?.tags && filters.tags.length > 0) {
          results = results.filter((node) => filters.tags!.every((tag) => node.metadata?.tags?.includes(tag)))
        }

        return results
      },

      /**
       * Gets all skills of a specific type from the store.
       * @param type The type of skill to retrieve.
       * @returns An array of skills that match the specified type.
       */
      getSkillsByType: (type) => {
        return get().skills.filter((skill) => skill.type === type)
      },

      /**
       * Gets all custom nodes of a specific category from the store.
       * @param category The category of custom nodes to retrieve.
       * @returns An array of custom nodes that match the specified category.
       */
      getCustomNodesByCategory: (category) => {
        return get().customNodes.filter((node) => node.category === category)
      },

      /**
       * Gets all skills with a specific tag from the store.
       * @param tag The tag to search for.
       * @returns An array of skills that have the specified tag.
       */
      getSkillsByTag: (tag) => {
        return get().skills.filter((skill) => skill.metadata?.tags?.includes(tag))
      },

      /**
       * Gets all custom nodes with a specific tag from the store.
       * @param tag The tag to search for.
       * @returns An array of custom nodes that have the specified tag.
       */
      getCustomNodesByTag: (tag) => {
        return get().customNodes.filter((node) => node.metadata?.tags?.includes(tag))
      },
    }),
    {
      name: "skills-store",
      // Converter Date para string ao serializar e vice-versa ao deserializar
      serialize: (state) => JSON.stringify(state),
      deserialize: (str) => {
        const state = JSON.parse(str)
        return state
      },
    },
  ),
)
