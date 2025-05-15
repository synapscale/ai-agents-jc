/**
 * ChatInterface
 *
 * Componente principal que orquestra toda a experiência de chat.
 * Gerencia o estado da conversa, mensagens, configurações e interações do usuário.
 */
"use client"

import { useState, useRef, useCallback, useMemo } from "react"
import { useAppContext } from "@/contexts/app-context"
import { Message, Conversation } from "@/types/chat"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import ChatHeader from "./chat-header"
import MessagesArea from "./messages-area"
import ChatInput from "./chat-input"
import ConversationSidebar from "./conversation-sidebar"
import ModelSelectorSidebar from "./model-selector-sidebar"
import ToolSelector from "./tool-selector"
import PersonalitySelector from "./personality-selector"
import PresetSelector from "./preset-selector"
import Notification from "@/components/ui/notification"

interface ChatInterfaceProps {
  className?: string
  style?: React.CSSProperties
  id?: string
  dataAttributes?: Record<string, string>
}

/**
 * Interface principal de chat
 */
export default function ChatInterface({
  className = "",
  style,
  id,
  dataAttributes,
}: ChatInterfaceProps) {
  // Referências
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Estado do contexto global
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    addConversation,
    updateConversation,
    deleteConversation,
    clearConversations,
    isComponentSelectorActive,
    setComponentSelectorActive,
  } = useAppContext()

  // Estados locais
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [showMessageTimestamps, setShowMessageTimestamps] = useState(true)
  const [showMessageSenders, setShowMessageSenders] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")
  const [chatBackground, setChatBackground] = useState<string | null>(null)

  // Conversa atual
  const currentConversation = useMemo(() => {
    return conversations.find((conv) => conv.id === currentConversationId) || null
  }, [conversations, currentConversationId])

  // Estado derivado
  const isInputDisabled = isLoading || !currentConversationId

  /**
   * Manipula o envio de uma nova mensagem
   */
  const handleSendMessage = useCallback(
    async (content: string, files?: File[]) => {
      if (!content.trim() && (!files || files.length === 0)) return
      if (!currentConversationId) return

      // Cria uma nova conversa se necessário
      if (!currentConversation) {
        const newConversation: Conversation = {
          id: currentConversationId,
          title: "Nova conversa",
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        addConversation(newConversation)
      }

      // Cria a mensagem do usuário
      const userMessage: Message = {
        id: `msg_${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now(),
        status: "sent",
        files: files
          ? files.map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
              url: URL.createObjectURL(file),
            }))
          : undefined,
      }

      // Adiciona a mensagem à conversa
      const updatedMessages = [...(currentConversation?.messages || []), userMessage]
      updateConversation(currentConversationId, {
        messages: updatedMessages,
        updatedAt: Date.now(),
      })

      // Rola para o final da lista de mensagens
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)

      // Simula o envio para a API e recebimento da resposta
      setIsLoading(true)
      try {
        // Aqui seria a chamada real para a API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content,
            conversationId: currentConversationId,
            files: files ? files.map((f) => f.name) : undefined,
          }),
        })

        if (!response.ok) {
          throw new Error("Falha ao enviar mensagem")
        }

        const data = await response.json()

        // Cria a mensagem do assistente
        const assistantMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          content: data.reply || "Desculpe, não consegui processar sua solicitação.",
          timestamp: Date.now(),
          status: "sent",
        }

        // Adiciona a mensagem à conversa
        const finalMessages = [...updatedMessages, assistantMessage]
        updateConversation(currentConversationId, {
          messages: finalMessages,
          updatedAt: Date.now(),
        })

        // Atualiza o título da conversa se for a primeira mensagem
        if (updatedMessages.length === 1) {
          const title = content.slice(0, 30) + (content.length > 30 ? "..." : "")
          updateConversation(currentConversationId, { title })
        }
      } catch (error) {
        console.error("Erro ao processar mensagem:", error)
        // Adiciona mensagem de erro
        const errorMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          content: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
          timestamp: Date.now(),
          status: "error",
        }
        updateConversation(currentConversationId, {
          messages: [...updatedMessages, errorMessage],
          updatedAt: Date.now(),
        })
      } finally {
        setIsLoading(false)
        // Rola para o final da lista de mensagens
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    },
    [currentConversation, currentConversationId, addConversation, updateConversation]
  )

  /**
   * Cria uma nova conversa
   */
  const handleNewConversation = useCallback(() => {
    const newId = `conv_${Date.now()}`
    const newConversation: Conversation = {
      id: newId,
      title: "Nova conversa",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    addConversation(newConversation)
    setCurrentConversationId(newId)
    setIsSidebarOpen(false)
  }, [addConversation, setCurrentConversationId])

  /**
   * Atualiza o título de uma conversa
   */
  const handleUpdateConversationTitle = useCallback(
    (id: string, title: string) => {
      updateConversation(id, { title })
    },
    [updateConversation]
  )

  /**
   * Exclui uma conversa
   */
  const handleDeleteConversation = useCallback(
    (id: string) => {
      deleteConversation(id)
      if (id === currentConversationId) {
        // Se a conversa atual foi excluída, seleciona outra ou cria uma nova
        if (conversations.length > 1) {
          const nextConversation = conversations.find((conv) => conv.id !== id)
          if (nextConversation) {
            setCurrentConversationId(nextConversation.id)
          } else {
            handleNewConversation()
          }
        } else {
          handleNewConversation()
        }
      }
    },
    [
      conversations,
      currentConversationId,
      deleteConversation,
      handleNewConversation,
      setCurrentConversationId,
    ]
  )

  /**
   * Limpa todas as conversas
   */
  const clearAllConversations = useCallback(() => {
    clearConversations()
    handleNewConversation()
  }, [clearConversations, handleNewConversation])

  /**
   * Exporta uma conversa
   */
  const handleExportConversation = useCallback((id: string) => {
    const conversation = conversations.find((conv) => conv.id === id)
    if (!conversation) return

    const conversationData = JSON.stringify(conversation, null, 2)
    const blob = new Blob([conversationData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversation-${id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [conversations])

  /**
   * Manipula eventos de drag and drop
   */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files)
        handleSendMessage("", files)
      }
    },
    [handleSendMessage]
  )

  /**
   * Alterna a visibilidade do seletor de componentes
   */
  const handleToggleComponentSelector = useCallback(() => {
    if (typeof setComponentSelectorActive === "function") {
      setComponentSelectorActive(!isComponentSelectorActive)
    }
  }, [isComponentSelectorActive, setComponentSelectorActive])

  /**
   * Alterna o painel de configuração
   */
  const handleToggleConfig = useCallback(() => {
    setShowConfig((prev) => !prev)
  }, [])

  // Prepara atributos de dados
  const allDataAttributes = useMemo(
    () => ({
      "data-component": "ChatInterface",
      "data-component-path": "@/components/chat/chat-interface",
      ...(dataAttributes || {}),
    }),
    [dataAttributes]
  )

  // Prepara classes CSS
  const containerClassName = useMemo(
    () =>
      `flex-1 flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${
        focusMode ? "focus-mode" : ""
      } ${className}`,
    [focusMode, className]
  )

  return (
    <div className={containerClassName} style={style} id={id} {...allDataAttributes}>
      {/* Notificação para feedback */}
      <Notification />
      
      {/* Barra lateral de conversas (visível apenas quando isSidebarOpen é true) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:relative md:z-0">
          <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 md:w-auto md:relative md:block">
            <ConversationSidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={setCurrentConversationId}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              onClearConversations={clearAllConversations}
            />
          </div>
        </div>
      )}
      
      {/* Interface principal de chat */}
      <div className="flex flex-col flex-1 h-full">
        {/* Cabeçalho do chat */}
        <ChatHeader
          currentConversation={currentConversation}
          currentConversationId={currentConversationId}
          onNewConversation={handleNewConversation}
          onUpdateConversationTitle={handleUpdateConversationTitle}
          onDeleteConversation={handleDeleteConversation}
          onExportConversation={handleExportConversation}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleComponentSelector={handleToggleComponentSelector}
        />
        
        {/* Área de mensagens */}
        <MessagesArea
          messages={currentConversation?.messages || []}
          isLoading={isLoading}
          showTimestamps={showMessageTimestamps}
          showSenders={showMessageSenders}
          focusMode={focusMode}
          theme={theme}
          chatBackground={chatBackground}
          messagesEndRef={messagesEndRef}
        />
        
        {/* Área de entrada */}
        <div className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-lg transition-colors duration-200">
          <div className="max-w-3xl mx-auto">
            {/* Input de chat */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={isInputDisabled}
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            
            {/* Seletores de modelo, ferramenta e personalidade */}
            {showConfig && (
              <div className="flex flex-wrap items-center gap-2 mt-3 px-2 animate-in">
                <ModelSelectorSidebar />
                <ToolSelector />
                <PersonalitySelector />
                <PresetSelector />
              </div>
            )}
            
            {/* Toggle de configuração */}
            <div className="flex justify-center mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full px-3"
                onClick={handleToggleConfig}
              >
                {showConfig ? "Ocultar" : "Mostrar"} Configurações
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${showConfig ? "rotate-180" : ""}`}
                />
              </Button>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary flex items-center gap-1 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-full px-3"
                >
                  Tutorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
