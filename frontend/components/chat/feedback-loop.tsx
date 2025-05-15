/**
 * Sistema de Feedback Loop de IA
 * 
 * Este componente implementa um sistema de feedback para respostas de IA,
 * permitindo que os usuários avaliem a qualidade das respostas e forneçam
 * comentários para melhorar os prompts futuros.
 */
"use client"

import { useState, useCallback } from "react"
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle,
  X,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { showNotification } from "@/components/ui/notification"

// Tipos de feedback
export type FeedbackType = "positive" | "negative" | "neutral"

// Razões para feedback negativo
export type NegativeFeedbackReason = 
  | "incorrect" 
  | "incomplete" 
  | "irrelevant" 
  | "harmful" 
  | "biased" 
  | "other"

// Interface para o feedback
export interface AIFeedback {
  messageId: string
  type: FeedbackType
  reason?: NegativeFeedbackReason
  comment?: string
  timestamp: number
  modelId: string
  promptId?: string
}

interface FeedbackLoopProps {
  messageId: string
  modelId: string
  promptId?: string
  onFeedbackSubmit?: (feedback: AIFeedback) => void
}

/**
 * Componente de feedback loop para IA
 */
export default function FeedbackLoop({
  messageId,
  modelId,
  promptId,
  onFeedbackSubmit,
}: FeedbackLoopProps) {
  // Estados
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [negativeFeedbackReason, setNegativeFeedbackReason] = useState<NegativeFeedbackReason | null>(null)
  const [comment, setComment] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  /**
   * Manipula o clique no botão de feedback positivo
   */
  const handlePositiveFeedback = useCallback(() => {
    if (hasSubmitted) return
    
    setFeedbackType("positive")
    setIsPopoverOpen(true)
  }, [hasSubmitted])

  /**
   * Manipula o clique no botão de feedback negativo
   */
  const handleNegativeFeedback = useCallback(() => {
    if (hasSubmitted) return
    
    setFeedbackType("negative")
    setIsPopoverOpen(true)
  }, [hasSubmitted])

  /**
   * Manipula o envio do feedback
   */
  const handleSubmitFeedback = useCallback(() => {
    if (!feedbackType || isSubmitting) return
    
    setIsSubmitting(true)
    
    // Cria o objeto de feedback
    const feedback: AIFeedback = {
      messageId,
      type: feedbackType,
      reason: feedbackType === "negative" ? negativeFeedbackReason || undefined : undefined,
      comment: comment.trim() || undefined,
      timestamp: Date.now(),
      modelId,
      promptId,
    }
    
    // Simula uma chamada de API
    setTimeout(() => {
      // Chama o callback se fornecido
      if (onFeedbackSubmit) {
        onFeedbackSubmit(feedback)
      }
      
      // Salva o feedback no localStorage para análise futura
      const savedFeedback = localStorage.getItem("ai-feedback")
      const feedbackArray = savedFeedback ? JSON.parse(savedFeedback) : []
      feedbackArray.push(feedback)
      localStorage.setItem("ai-feedback", JSON.stringify(feedbackArray))
      
      // Atualiza os estados
      setIsSubmitting(false)
      setHasSubmitted(true)
      setIsPopoverOpen(false)
      
      // Mostra notificação de sucesso
      showNotification({
        type: "success",
        message: "Obrigado pelo seu feedback! Ele nos ajudará a melhorar as respostas.",
      })
    }, 500)
  }, [feedbackType, negativeFeedbackReason, comment, messageId, modelId, promptId, onFeedbackSubmit, isSubmitting])

  /**
   * Manipula o fechamento do popover
   */
  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false)
    
    // Reseta os estados se não tiver enviado
    if (!hasSubmitted) {
      setFeedbackType(null)
      setNegativeFeedbackReason(null)
      setComment("")
    }
  }, [hasSubmitted])

  return (
    <div className="flex items-center gap-2 mt-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full ${
                feedbackType === "positive" && hasSubmitted
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : ""
              }`}
              onClick={handlePositiveFeedback}
              disabled={hasSubmitted && feedbackType !== "positive"}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Resposta útil</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full ${
                feedbackType === "negative" && hasSubmitted
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : ""
              }`}
              onClick={handleNegativeFeedback}
              disabled={hasSubmitted && feedbackType !== "negative"}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Resposta não útil</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <span className="hidden">Feedback</span>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              {feedbackType === "positive"
                ? "O que você gostou nesta resposta?"
                : "O que poderia ser melhorado?"}
            </h3>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClosePopover}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {feedbackType === "negative" && (
            <div className="mb-4">
              <RadioGroup
                value={negativeFeedbackReason || ""}
                onValueChange={(value) => setNegativeFeedbackReason(value as NegativeFeedbackReason)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="incorrect" id="incorrect" />
                  <Label htmlFor="incorrect">Informação incorreta</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="incomplete" id="incomplete" />
                  <Label htmlFor="incomplete">Resposta incompleta</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="irrelevant" id="irrelevant" />
                  <Label htmlFor="irrelevant">Não respondeu minha pergunta</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="harmful" id="harmful" />
                  <Label htmlFor="harmful">Conteúdo inadequado</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="biased" id="biased" />
                  <Label htmlFor="biased">Viés ou parcialidade</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Outro motivo</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="mb-4">
            <Textarea
              placeholder="Comentários adicionais (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmitFeedback}
              disabled={isSubmitting || (feedbackType === "negative" && !negativeFeedbackReason)}
              className="flex items-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5 mr-1" />
                  <span>Enviar feedback</span>
                </>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Componente de análise de feedback
 * Este componente exibe estatísticas e insights sobre o feedback recebido
 */
export function FeedbackAnalytics() {
  // Estados
  const [feedbackData, setFeedbackData] = useState<AIFeedback[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Efeito para carregar dados de feedback
  React.useEffect(() => {
    if (typeof window === "undefined") return

    // Carrega feedback do localStorage
    const savedFeedback = localStorage.getItem("ai-feedback")
    if (savedFeedback) {
      try {
        setFeedbackData(JSON.parse(savedFeedback))
      } catch (error) {
        console.error("Erro ao carregar dados de feedback:", error)
      }
    }
    
    setIsLoading(false)
  }, [])

  // Calcula estatísticas
  const stats = React.useMemo(() => {
    if (feedbackData.length === 0) {
      return {
        total: 0,
        positive: 0,
        negative: 0,
        positivePercentage: 0,
        negativeReasons: {},
      }
    }

    const positive = feedbackData.filter((f) => f.type === "positive").length
    const negative = feedbackData.filter((f) => f.type === "negative").length
    
    // Conta as razões para feedback negativo
    const negativeReasons: Record<string, number> = {}
    feedbackData
      .filter((f) => f.type === "negative" && f.reason)
      .forEach((f) => {
        if (f.reason) {
          negativeReasons[f.reason] = (negativeReasons[f.reason] || 0) + 1
        }
      })

    return {
      total: feedbackData.length,
      positive,
      negative,
      positivePercentage: Math.round((positive / feedbackData.length) * 100),
      negativeReasons,
    }
  }, [feedbackData])

  if (isLoading) {
    return <div className="p-4 text-center">Carregando dados de feedback...</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Análise de Feedback</h2>
      
      {feedbackData.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Nenhum feedback recebido ainda.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total de feedbacks</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.positivePercentage}%</div>
              <div className="text-sm text-muted-foreground">Taxa de satisfação</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{stats.positive}/{stats.negative}</div>
              <div className="text-sm text-muted-foreground">Positivo/Negativo</div>
            </div>
          </div>
          
          {stats.negative > 0 && (
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-medium mb-2">Razões para feedback negativo</h3>
              <div className="space-y-2">
                {Object.entries(stats.negativeReasons).map(([reason, count]) => (
                  <div key={reason} className="flex items-center justify-between">
                    <span className="text-sm">
                      {reason === "incorrect" && "Informação incorreta"}
                      {reason === "incomplete" && "Resposta incompleta"}
                      {reason === "irrelevant" && "Não respondeu à pergunta"}
                      {reason === "harmful" && "Conteúdo inadequado"}
                      {reason === "biased" && "Viés ou parcialidade"}
                      {reason === "other" && "Outro motivo"}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{count}</span>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${(count / stats.negative) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground text-center">
            Dados baseados em {stats.total} feedbacks recebidos.
          </div>
        </>
      )}
    </div>
  )
}

// Importações necessárias
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
