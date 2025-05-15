/**
 * Hooks e Utilitários para o Chat
 * 
 * Este arquivo contém implementações de hooks e funções utilitárias
 * necessárias para o funcionamento dos componentes de chat.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Conversation, Message } from "@/types/chat";

/**
 * Estima o número de tokens em um texto
 * Esta é uma implementação simplificada para exemplo
 * @param text Texto para estimar tokens
 * @returns Número estimado de tokens
 */
export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  
  // Implementação simplificada: aproximadamente 4 caracteres por token
  // Em produção, use uma biblioteca específica para o modelo usado
  return Math.ceil(text.length / 4);
}

/**
 * Hook para textarea com auto-resize
 */
export function useTextarea({
  onEnter,
}: {
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleInput = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";
    
    // Set the height to scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && onEnter) {
        onEnter(e);
      }
    },
    [onEnter]
  );

  // Ajusta a altura inicial quando o componente é montado
  React.useEffect(() => {
    handleInput();
  }, [handleInput]);

  return {
    textareaRef,
    handleInput,
    handleKeyDown,
  };
}

/**
 * Hook para gerenciar conversas
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Carrega conversas do localStorage na inicialização
  useEffect(() => {
    const savedConversations = localStorage.getItem("chat-conversations");
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed);
        
        // Define a conversa atual como a mais recente
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id);
        }
      } catch (error) {
        console.error("Erro ao carregar conversas:", error);
      }
    }
  }, []);

  // Salva conversas no localStorage quando mudam
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("chat-conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  // Adiciona uma nova conversa
  const addConversation = useCallback((conversation: Conversation) => {
    setConversations((prev) => [conversation, ...prev]);
  }, []);

  // Atualiza uma conversa existente
  const updateConversation = useCallback((id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, ...updates, updatedAt: Date.now() } : conv
      )
    );
  }, []);

  // Exclui uma conversa
  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id));
  }, []);

  // Limpa todas as conversas
  const clearConversations = useCallback(() => {
    setConversations([]);
    setCurrentConversationId(null);
    localStorage.removeItem("chat-conversations");
  }, []);

  return {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    addConversation,
    updateConversation,
    deleteConversation,
    clearConversations,
  };
}

/**
 * Interface para o contexto da aplicação
 */
interface AppContextType {
  // Estado de conversas
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  clearConversations: () => void;
  
  // Estado do seletor de componentes
  isComponentSelectorActive: boolean;
  setComponentSelectorActive: (active: boolean) => void;
  
  // Outras configurações
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

/**
 * Contexto da aplicação
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provedor do contexto da aplicação
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Implementação do hook useConversations
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    addConversation,
    updateConversation,
    deleteConversation,
    clearConversations,
  } = useConversations();
  
  // Estado do seletor de componentes
  const [isComponentSelectorActive, setComponentSelectorActive] = useState(false);
  
  // Tema
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  
  // Valor do contexto
  const value = {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    addConversation,
    updateConversation,
    deleteConversation,
    clearConversations,
    isComponentSelectorActive,
    setComponentSelectorActive,
    theme,
    setTheme,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook para usar o contexto da aplicação
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}
