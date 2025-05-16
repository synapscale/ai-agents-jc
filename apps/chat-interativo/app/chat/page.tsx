/**
 * Chat Page
 *
 * The main page for the chat application that integrates all components.
 *
 * @ai-pattern page-component
 * Main page that orchestrates the chat experience
 */
"use client"

import { lazy, Suspense } from "react"
import { AppProvider } from "@/contexts/app-context"
import { ThemeProvider } from '@theme/theme-provider';
import { Sidebar } from "@ui/sidebar"
import ChatInterface from "@/components/chat/chat-interface"

// Lazy load the ComponentSelector for better performance
const ComponentSelector = lazy(() => import("@/components/component-selector/component-selector"))

/**
 * Loading fallback for lazy-loaded components
 */
const LoadingFallback = () => <div className="hidden">Loading...</div>

/**
 * Chat page component
 * @returns Chat page component
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
