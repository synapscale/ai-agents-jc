import type { Skill, SkillExecutionContext, SkillExecutionResult } from "@/types/skill-types"
import type { CustomNode } from "@/types/flow-types"

/**
 * SkillSandbox Class
 *
 * Provides a sandboxed environment for executing skill code safely.
 */
class SkillSandbox {
  private context: SkillExecutionContext
  private logs: string[] = []

  /**
   * Create a new SkillSandbox
   * @param context - Execution context for the skill
   */
  constructor(context: SkillExecutionContext) {
    this.context = context
  }

  /**
   * Execute JavaScript code in a controlled environment
   * @param code - JavaScript code to execute
   * @returns Result of the execution
   */
  async executeJavaScript(code: string): Promise<any> {
    // Create a safe execution context
    const sandbox = {
      inputs: this.context.inputs,
      properties: this.context.properties,
      environment: this.context.environment,
      services: {
        ...this.context.services,
        logger: {
          log: (message: string) => {
            this.logs.push(`[LOG] ${message}`)
            console.log(`[Skill ${this.context.environment.nodeId}] ${message}`)
          },
          warn: (message: string) => {
            this.logs.push(`[WARN] ${message}`)
            console.warn(`[Skill ${this.context.environment.nodeId}] ${message}`)
          },
          error: (message: string) => {
            this.logs.push(`[ERROR] ${message}`)
            console.error(`[Skill ${this.context.environment.nodeId}] ${message}`)
          },
        },
      },
      console: {
        log: (message: string) => {
          this.logs.push(`[LOG] ${message}`)
          console.log(`[Skill ${this.context.environment.nodeId}] ${message}`)
        },
        warn: (message: string) => {
          this.logs.push(`[WARN] ${message}`)
          console.warn(`[Skill ${this.context.environment.nodeId}] ${message}`)
        },
        error: (message: string) => {
          this.logs.push(`[ERROR] ${message}`)
          console.error(`[Skill ${this.context.environment.nodeId}] ${message}`)
        },
      },
    }

    try {
      // Create a function from the code and execute it with the context
      const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
      const fn = new AsyncFunction("inputs", "properties", "environment", "services", "console", code)

      return await fn(sandbox.inputs, sandbox.properties, sandbox.environment, sandbox.services, sandbox.console)
    } catch (error) {
      this.logs.push(`[ERROR] Execution error: ${error.message}`)
      throw error
    }
  }

  /**
   * Get the logs from the execution
   * @returns Array of log messages
   */
  getLogs(): string[] {
    return this.logs
  }
}

/**
 * SkillExecutionEngine Class
 *
 * Provides methods for executing skills and custom nodes.
 */
export class SkillExecutionEngine {
  /**
   * Execute a single skill
   * @param skill - The skill to execute
   * @param inputs - Input values for the skill
   * @param properties - Property values for the skill
   * @param environment - Execution environment
   * @returns Result of the execution
   */
  async executeSkill(
    skill: Skill,
    inputs: Record<string, any>,
    properties: Record<string, any>,
    environment: SkillExecutionContext["environment"],
  ): Promise<SkillExecutionResult> {
    const startTime = performance.now()

    // Validate inputs
    for (const input of skill.inputs) {
      if (input.required && (inputs[input.id] === undefined || inputs[input.id] === null)) {
        return {
          success: false,
          outputs: {},
          error: {
            message: `Required input '${input.name}' (${input.id}) is missing`,
          },
          executionTime: performance.now() - startTime,
        }
      }

      // Additional validation with Zod schema could be added here
    }

    // Create execution context
    const context: SkillExecutionContext = {
      inputs,
      properties,
      environment,
      services: this.createServices(skill.id),
    }

    // Create sandbox and execute the code
    const sandbox = new SkillSandbox(context)

    try {
      let result

      // Execute the code based on the language
      switch (skill.implementation.language) {
        case "javascript":
        case "typescript":
          result = await sandbox.executeJavaScript(skill.implementation.code)
          break
        default:
          throw new Error(`Unsupported language: ${skill.implementation.language}`)
      }

      // Process the result
      const outputs: Record<string, any> = {}

      if (typeof result === "object" && result !== null) {
        // If the result is an object, use its properties as outputs
        for (const output of skill.outputs) {
          if (result[output.id] !== undefined) {
            outputs[output.id] = result[output.id]
          }
        }
      } else if (skill.outputs.length === 1) {
        // If there's only one output, use the result directly
        outputs[skill.outputs[0].id] = result
      }

      return {
        success: true,
        outputs,
        logs: sandbox.getLogs(),
        executionTime: performance.now() - startTime,
      }
    } catch (error) {
      return {
        success: false,
        outputs: {},
        error: {
          message: error.message,
          details: error,
        },
        logs: sandbox.getLogs(),
        executionTime: performance.now() - startTime,
      }
    }
  }

  /**
   * Execute a custom node (composed of multiple skills)
   * @param node - The custom node to execute
   * @param inputs - Input values for the node
   * @param properties - Property values for the node
   * @param environment - Execution environment
   * @param skillsMap - Map of skills by ID and version
   * @returns Result of the execution
   */
  async executeCustomNode(
    node: CustomNode,
    inputs: Record<string, any>,
    properties: Record<string, any>,
    environment: SkillExecutionContext["environment"],
    skillsMap: Map<string, Skill>,
  ): Promise<SkillExecutionResult> {
    const startTime = performance.now()
    const allLogs: string[] = []

    // Map node inputs to skill inputs
    const skillInputs: Record<string, Record<string, any>> = {}

    // Initialize empty inputs for all skills
    for (const skillRef of node.skills) {
      skillInputs[skillRef.instanceId] = {}
    }

    // Map external inputs to skills
    for (const mapping of node.inputMappings) {
      if (inputs[mapping.nodeInputId] !== undefined) {
        if (!skillInputs[mapping.skillInstanceId]) {
          skillInputs[mapping.skillInstanceId] = {}
        }
        skillInputs[mapping.skillInstanceId][mapping.skillInputId] = inputs[mapping.nodeInputId]
      }
    }

    // Store results of each skill
    const skillResults: Record<string, SkillExecutionResult> = {}

    // Execute skills in order
    for (const skillRef of node.skills) {
      const skill = skillsMap.get(`${skillRef.skillId}@${skillRef.version}`)

      if (!skill) {
        return {
          success: false,
          outputs: {},
          error: {
            message: `Skill not found: ${skillRef.skillId}@${skillRef.version}`,
          },
          executionTime: performance.now() - startTime,
        }
      }

      // Execute the skill
      const result = await this.executeSkill(skill, skillInputs[skillRef.instanceId], skillRef.properties, environment)

      // Store the result
      skillResults[skillRef.instanceId] = result

      // Add logs
      if (result.logs) {
        allLogs.push(...result.logs.map((log) => `[${skill.name}] ${log}`))
      }

      // If the skill failed, stop execution
      if (!result.success) {
        return {
          success: false,
          outputs: {},
          error: {
            message: `Skill '${skill.name}' failed: ${result.error?.message}`,
            details: result.error?.details,
          },
          logs: allLogs,
          executionTime: performance.now() - startTime,
        }
      }

      // Propagate outputs to other skills through internal connections
      for (const connection of node.connections) {
        if (connection.sourceSkillInstanceId === skillRef.instanceId) {
          const sourceOutput = result.outputs[connection.sourcePortId]

          if (sourceOutput !== undefined) {
            if (!skillInputs[connection.targetSkillInstanceId]) {
              skillInputs[connection.targetSkillInstanceId] = {}
            }

            skillInputs[connection.targetSkillInstanceId][connection.targetPortId] = sourceOutput
          }
        }
      }
    }

    // Map skill outputs to node outputs
    const outputs: Record<string, any> = {}

    for (const mapping of node.outputMappings) {
      const skillResult = skillResults[mapping.skillInstanceId]

      if (skillResult && skillResult.outputs[mapping.skillOutputId] !== undefined) {
        outputs[mapping.nodeOutputId] = skillResult.outputs[mapping.skillOutputId]
      }
    }

    return {
      success: true,
      outputs,
      logs: allLogs,
      executionTime: performance.now() - startTime,
      metadata: {
        skillResults,
      },
    }
  }

  /**
   * Create services for skill execution
   * @param skillId - ID of the skill
   * @returns Services object
   */
  private createServices(skillId: string) {
    return {
      logger: {
        log: (message: string) => console.log(`[Skill ${skillId}] ${message}`),
        warn: (message: string) => console.warn(`[Skill ${skillId}] ${message}`),
        error: (message: string) => console.error(`[Skill ${skillId}] ${message}`),
      },
      storage: {
        get: async (key: string) => {
          try {
            const value = localStorage.getItem(`skill:${skillId}:${key}`)
            return value ? JSON.parse(value) : null
          } catch (error) {
            console.error(`Error getting storage for skill ${skillId}:`, error)
            return null
          }
        },
        set: async (key: string, value: any) => {
          try {
            localStorage.setItem(`skill:${skillId}:${key}`, JSON.stringify(value))
          } catch (error) {
            console.error(`Error setting storage for skill ${skillId}:`, error)
          }
        },
        remove: async (key: string) => {
          try {
            localStorage.removeItem(`skill:${skillId}:${key}`)
          } catch (error) {
            console.error(`Error removing storage for skill ${skillId}:`, error)
          }
        },
      },
      http: this.createHttpService(skillId),
    }
  }

  /**
   * Create HTTP service for skill execution
   * @param skillId - ID of the skill
   * @returns HTTP service object
   */
  private createHttpService(skillId: string) {
    return {
      get: async (url: string, options?: any) => {
        try {
          const response = await fetch(url, {
            method: "GET",
            ...options,
          })
          return await response.json()
        } catch (error) {
          console.error(`HTTP GET error in skill ${skillId}:`, error)
          throw error
        }
      },
      post: async (url: string, data: any, options?: any) => {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...options?.headers,
            },
            body: JSON.stringify(data),
            ...options,
          })
          return await response.json()
        } catch (error) {
          console.error(`HTTP POST error in skill ${skillId}:`, error)
          throw error
        }
      },
      put: async (url: string, data: any, options?: any) => {
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...options?.headers,
            },
            body: JSON.stringify(data),
            ...options,
          })
          return await response.json()
        } catch (error) {
          console.error(`HTTP PUT error in skill ${skillId}:`, error)
          throw error
        }
      },
      delete: async (url: string, options?: any) => {
        try {
          const response = await fetch(url, {
            method: "DELETE",
            ...options,
          })
          return await response.json()
        } catch (error) {
          console.error(`HTTP DELETE error in skill ${skillId}:`, error)
          throw error
        }
      },
    }
  }
}

// Singleton instance of the skill execution engine
export const skillExecutionEngine = new SkillExecutionEngine()
