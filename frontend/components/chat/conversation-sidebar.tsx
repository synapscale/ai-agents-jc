/**
 * Componente de Barra Lateral de Conversas
 * 
 * Este componente exibe a lista de conversas do usuário e permite
 * gerenciar, selecionar e criar novas conversas.
 */
"use client"

import { useCallback } from "react"
import { Conversation } from "@/types/chat"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string) => void
  onClearConversations: () => void
}

/**
 * Componente de barra lateral de conversas
 */
export default function ConversationSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearConversations,
}: ConversationSidebarProps) {
  // Estados
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)

  /**
   * Filtra as conversas com base na consulta de pesquisa
   */
  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  /**
   * Manipula a exclusão de uma conversa
   */
  const handleDeleteConversation = useCallback(
    (id: string) => {
      setConversationToDelete(id)
      setIsDeleteDialogOpen(true)
    },
    []
  )

  /**
   * Confirma a exclusão de uma conversa
   */
  const confirmDeleteConversation = useCallback(() => {
    if (conversationToDelete) {
      onDeleteConversation(conversationToDelete)
    }
    setIsDeleteDialogOpen(false)
    setConversationToDelete(null)
  }, [conversationToDelete, onDeleteConversation])

  /**
   * Manipula a limpeza de todas as conversas
   */
  const handleClearConversations = useCallback(() => {
    setIsClearDialogOpen(true)
  }, [])

  /**
   * Confirma a limpeza de todas as conversas
   */
  const confirmClearConversations = useCallback(() => {
    onClearConversations()
    setIsClearDialogOpen(false)
  }, [onClearConversations])

  /**
   * Formata a data da conversa
   */
  const formatConversationDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Hoje"
    } else if (diffDays === 1) {
      return "Ontem"
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`
    } else {
      return date.toLocaleDateString()
    }
  }, [])

  return (
    <div className="flex h-full w-full flex-col border-r bg-card">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Conversas</h2>
        <Button variant="outline" size="icon" onClick={onNewConversation} aria-label="Nova conversa">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Barra de pesquisa */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar conversas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Lista de conversas */}
      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {searchQuery ? "Nenhuma conversa encontrada" : "Nenhuma conversa ainda"}
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group relative mb-1 flex cursor-pointer flex-col rounded-md p-3 transition-colors ${
                  conversation.id === currentConversationId
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-medium ${
                      conversation.id === currentConversationId
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {conversation.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 ${
                      conversation.id === currentConversationId
                        ? "text-primary-foreground hover:bg-primary/90"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteConversation(conversation.id)
                    }}
                    aria-label="Excluir conversa"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
                <p
                  className={`mt-1 text-xs ${
                    conversation.id === currentConversationId
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatConversationDate(conversation.updatedAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Rodapé */}
      <div className="p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={handleClearConversations}
          disabled={conversations.length === 0}
        >
          Limpar todas as conversas
        </Button>
      </div>

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteConversation}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de confirmação de limpeza */}
      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar todas as conversas</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja limpar todas as conversas? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearConversations}>Limpar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
