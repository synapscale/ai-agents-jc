"use client"

import type React from "react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StatusType } from "@types/component-types"

/**
 * Configuração para cada tipo de status
 * @internal
 */
const STATUS_CONFIG: Record<
  StatusType,
  {
    /**
     * Variante do badge a ser usada
     */
    variant: BadgeProps["variant"]

    /**
     * Ícone a ser exibido
     */
    icon: React.ElementType

    /**
     * Rótulo padrão a ser exibido
     */
    defaultLabel: string

    /**
     * Classe CSS adicional para o badge
     */
    className?: string
  }
> = {
  success: {
    variant: "success",
    icon: CheckCircle,
    defaultLabel: "Sucesso",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  pending: {
    variant: "outline",
    icon: Clock,
    defaultLabel: "Pendente",
    className: "border-yellow-300 text-yellow-800 dark:border-yellow-600 dark:text-yellow-100",
  },
  error: {
    variant: "destructive",
    icon: XCircle,
    defaultLabel: "Erro",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
  warning: {
    variant: "outline",
    icon: AlertTriangle,
    defaultLabel: "Aviso",
    className: "border-orange-300 text-orange-800 dark:border-orange-600 dark:text-orange-100",
  },
  info: {
    variant: "outline",
    icon: Info,
    defaultLabel: "Informação",
    className: "border-blue-300 text-blue-800 dark:border-blue-600 dark:text-blue-100",
  },
  draft: {
    variant: "secondary",
    icon: Clock,
    defaultLabel: "Rascunho",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  },
  published: {
    variant: "success",
    icon: CheckCircle,
    defaultLabel: "Publicado",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  rejected: {
    variant: "destructive",
    icon: XCircle,
    defaultLabel: "Rejeitado",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
  failed: {
    variant: "destructive",
    icon: XCircle,
    defaultLabel: "Falha",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
}

/**
 * Props para o componente StatusBadge
 */
export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  /**
   * Tipo de status a ser exibido
   * @required
   * @example "success" | "pending" | "error" | "warning" | "info" | "draft" | "published" | "rejected" | "failed"
   */
  status: StatusType

  /**
   * Rótulo personalizado a ser exibido. Se não for fornecido, o rótulo padrão para o status será usado.
   * @example "Processado com sucesso"
   */
  label?: string

  /**
   * Se verdadeiro, exibe o ícone correspondente ao status
   * @default true
   */
  showIcon?: boolean

  /**
   * Tamanho do ícone em pixels
   * @default 14
   */
  iconSize?: number

  /**
   * Posição do ícone em relação ao texto
   * @default "left"
   */
  iconPosition?: "left" | "right"

  /**
   * Espaçamento entre o ícone e o texto em pixels
   * @default 4
   */
  iconGap?: number

  /**
   * Componente de ícone personalizado para substituir o ícone padrão
   * @example <CustomIcon />
   */
  customIcon?: React.ReactNode

  /**
   * Se verdadeiro, o badge terá uma animação de pulso
   * @default false
   */
  pulse?: boolean

  /**
   * Função chamada quando o badge é clicado
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>

  /**
   * Se verdadeiro, o badge terá um estilo de cursor pointer
   * @default false
   */
  clickable?: boolean

  /**
   * Texto para o atributo title do badge (tooltip nativo do navegador)
   */
  title?: string

  /**
   * ID para testes
   */
  testId?: string
}

/**
 * Componente StatusBadge
 *
 * Exibe um badge com um status visual, incluindo ícone e texto.
 *
 * @example
 * // Badge de sucesso básico
 * <StatusBadge status="success" />
 *
 * @example
 * // Badge de erro com texto personalizado
 * <StatusBadge status="error" label="Falha no processamento" />
 *
 * @example
 * // Badge de pendente sem ícone
 * <StatusBadge status="pending" showIcon={false} />
 *
 * @example
 * // Badge clicável com ícone à direita
 * <StatusBadge
 *   status="info"
 *   iconPosition="right"
 *   clickable
 *   onClick={() => alert('Clicado!')}
 * />
 */
export function StatusBadge({
  status,
  label,
  showIcon = true,
  iconSize = 14,
  iconPosition = "left",
  iconGap = 4,
  customIcon,
  pulse = false,
  onClick,
  clickable = false,
  title,
  testId,
  className,
  ...props
}: StatusBadgeProps) {
  // Obter a configuração para o status especificado
  const config = STATUS_CONFIG[status]

  if (!config) {
    console.warn(`StatusBadge: Status "${status}" não reconhecido. Usando "info" como fallback.`)
    return <StatusBadge status="info" label={label} {...props} />
  }

  // Determinar o ícone a ser exibido
  const IconComponent = config.icon
  const icon = customIcon || (showIcon && <IconComponent className={`w-${iconSize / 4} h-${iconSize / 4}`} />)

  // Construir o conteúdo do badge com base na posição do ícone
  const content = (
    <>
      {showIcon && iconPosition === "left" && <span className={`inline-flex mr-${iconGap / 4}`}>{icon}</span>}
      <span>{label || config.defaultLabel}</span>
      {showIcon && iconPosition === "right" && <span className={`inline-flex ml-${iconGap / 4}`}>{icon}</span>}
    </>
  )

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "flex items-center",
        config.className,
        pulse && "animate-pulse",
        clickable && "cursor-pointer hover:opacity-80",
        className,
      )}
      onClick={clickable ? onClick : undefined}
      title={title}
      data-testid={testId}
      data-status={status}
      {...props}
    >
      {content}
    </Badge>
  )
}
