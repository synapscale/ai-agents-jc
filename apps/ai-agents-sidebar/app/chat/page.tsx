"use client"

import { lazy, Suspense } from "react"
import { AppProvider } from "@/contexts/app-context"
import ChatInterface from "@/components/chat/chat-interface"

const ComponentSelector = lazy(() => import("@/components/component-selector/component-selector"))

const LoadingFallback = () => <div className="hidden">Loading...</div>

export default function ChatPage() {
  return (
    <AppProvider>
      <ChatInterface />
      <Suspense fallback={<LoadingFallback />}>
        <ComponentSelector />
      </Suspense>
    </AppProvider>
  )
}
