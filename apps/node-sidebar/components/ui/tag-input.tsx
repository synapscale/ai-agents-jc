"use client"

import { useState, useRef, type KeyboardEvent, type FocusEvent } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

/**
 * Interface que define as propriedades do componente TagInput
 * @interface TagInputProps
 */
export interface TagInputProps {
  /**
   * Lista inicial de tags a serem exibidas
   * @default []
   */
  initialTags?: string[]

  /**
   * Função chamada quando a lista de tags é alterada
   * @param tags - Lista atualizada de tags
   */
  onTagsChange: (tags: string[]) => void

  /**
   * Placeholder exibido quando o input está vazio
   * @default "Adicionar tag..."
   */
  placeholder?: string

  /**
   * Número máximo de tags permitidas
   * @default Infinity
   */
  maxTags?: number

  /**
   * Tamanho máximo de caracteres para cada tag
   * @default 50
   */
  maxTagLength?: number

  /**
   * Determina se o componente está desabilitado
   * @default false
   */
  disabled?: boolean

  /**
   * Determina se as tags duplicadas são permitidas
   * @default false
   */
  allowDuplicates?: boolean

  /**
   * Função de validação personalizada para novas tags
   * @param tag - Tag a ser validada
   * @returns true se a tag for válida, false caso contrário
   * @default () => true
   */
  validateTag?: (tag: string) => boolean

  /**
   * Classe CSS adicional para o container principal
   */
  className?: string

  /**
   * Determina se as tags devem ser convertidas para minúsculas
   * @default true
   */
  lowercase?: boolean

  /**
   * Caracteres que, quando digitados, criam uma nova tag
   * @default [',', 'Enter']
   */
  delimiters?: string[]

  /**
   * Mensagem de erro exibida quando uma tag é inválida
   */
  errorMessage?: string

  /**
   * Função chamada quando uma tag é adicionada
   * @param tag - Tag adicionada
   */
  onTagAdd?: (tag: string) => void

  /**
   * Função chamada quando uma tag é removida
   * @param tag - Tag removida
   * @param index - Índice da tag removida
   */
  onTagRemove?: (tag: string, index: number) => void
}

/**
 * Componente TagInput - Permite a entrada e gerenciamento de múltiplas tags
 *
 * @example
 * // Uso básico
 * <TagInput
 *   initialTags={['react', 'typescript']}
 *   onTagsChange={(tags) => console.log(tags)}
 * />
 *
 * @example
 * // Com validação personalizada
 * <TagInput
 *   onTagsChange={handleTagsChange}
 *   validateTag={(tag) => tag.length >= 3}
 *   errorMessage="Tags devem ter pelo menos 3 caracteres"
 * />
 */
export function TagInput({
  initialTags = [],
  onTagsChange,
  placeholder = "Adicionar tag...",
  maxTags = Number.POSITIVE_INFINITY,
  maxTagLength = 50,
  disabled = false,
  allowDuplicates = false,
  validateTag = () => true,
  className = "",
  lowercase = true,
  delimiters = [",", "Enter"],
  errorMessage,
  onTagAdd,
  onTagRemove,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Adiciona uma nova tag à lista se for válida
   * @param tag - Tag a ser adicionada
   */
  const addTag = (tag: string): void => {
    // Normaliza a tag conforme configuração
    const normalizedTag = lowercase ? tag.trim().toLowerCase() : tag.trim()

    // Verifica se a tag está vazia
    if (normalizedTag === "") return

    // Verifica se atingiu o número máximo de tags
    if (tags.length >= maxTags) {
      setError(`Número máximo de ${maxTags} tags atingido`)
      return
    }

    // Verifica o tamanho máximo da tag
    if (normalizedTag.length > maxTagLength) {
      setError(`Tags devem ter no máximo ${maxTagLength} caracteres`)
      return
    }

    // Verifica se a tag já existe (se duplicatas não forem permitidas)
    if (!allowDuplicates && tags.includes(normalizedTag)) {
      setError("Esta tag já foi adicionada")
      return
    }

    // Aplica validação personalizada
    if (!validateTag(normalizedTag)) {
      setError(errorMessage || "Tag inválida")
      return
    }

    // Adiciona a tag e limpa o input
    const updatedTags = [...tags, normalizedTag]
    setTags(updatedTags)
    setInputValue("")
    setError(null)
    onTagsChange(updatedTags)
    onTagAdd?.(normalizedTag)
  }

  /**
   * Remove uma tag da lista pelo índice
   * @param index - Índice da tag a ser removida
   */
  const removeTag = (index: number): void => {
    if (disabled) return

    const removedTag = tags[index]
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
    onTagsChange(updatedTags)
    onTagRemove?.(removedTag, index)
  }

  /**
   * Manipula o evento de tecla pressionada no input
   * @param e - Evento de teclado
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    // Se estiver desabilitado, não faz nada
    if (disabled) return

    // Verifica se a tecla pressionada é um delimitador
    if (delimiters.includes(e.key)) {
      e.preventDefault()
      addTag(inputValue)
    }

    // Remove a última tag se pressionar Backspace com o input vazio
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  /**
   * Manipula o evento de perda de foco do input
   * @param e - Evento de foco
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // Adiciona a tag atual quando o input perde o foco
    if (inputValue.trim() !== "") {
      addTag(inputValue)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-10">
        {/* Renderiza as tags existentes */}
        {tags.map((tag, index) => (
          <Badge key={`${tag}-${index}`} variant="secondary" className="flex items-center gap-1 px-3 py-1">
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
                aria-label={`Remover tag ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}

        {/* Input para adicionar novas tags */}
        {tags.length < maxTags && (
          <div className="flex-1 min-w-[120px]">
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setError(null)
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )}

        {/* Botão para adicionar tag quando o input está vazio */}
        {inputValue === "" && !disabled && tags.length < maxTags && (
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="flex items-center text-muted-foreground text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  )
}
