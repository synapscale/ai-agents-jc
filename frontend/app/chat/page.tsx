/**
 * Chat Page
 *
 * A página principal para a interface de chat interativa que integra todos os componentes.
 */
"use client"

import { lazy, Suspense } from "react"
import { AppProvider } from "@/contexts/app-context"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import ChatInterface from "@/components/chat/chat-interface"

// Carregamento lazy do ComponentSelector para melhor performance
const ComponentSelector = lazy(() => import("@/components/component-selector/component-selector"))

/**
 * Fallback de carregamento para componentes lazy-loaded
 */
const LoadingFallback = () => <div className="hidden">Loading...</div>

/**
 * Componente da página de chat
 * @returns Componente da página de chat
 */
export default function ChatPage() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ai-canvas-theme">
      <AppProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex">
            <ChatInterface />
            <Suspense fallback={<LoadingFallback />}>
              <ComponentSelector />
            </Suspense>
          </div>
        </div>
      </AppProvider>
    </ThemeProvider>
  )
}
