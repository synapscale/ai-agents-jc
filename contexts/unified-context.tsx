"use client"

import React from "react"
// Importa todos os providers e contextos existentes
import { AppProvider as MainAppProvider } from "@/contexts/app-context"
import { AppProvider as LegacyAppProvider } from "@/context/app-context"
import { AppProvider as FrontendAppProvider } from "@/frontend/context/app-context"
import { SidebarProvider as MainSidebarProvider } from "@/context/sidebar-context"
import { SidebarProvider as FrontendSidebarProvider } from "@/frontend/context/sidebar-context"
import { ThemeProvider } from "@/components/theme-provider"

// Provider unificado que engloba todos os providers necessários
export function UnifiedProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MainAppProvider>
        <LegacyAppProvider>
          <FrontendAppProvider>
            <MainSidebarProvider>
              <FrontendSidebarProvider>
                {children}
              </FrontendSidebarProvider>
            </MainSidebarProvider>
          </FrontendAppProvider>
        </LegacyAppProvider>
      </MainAppProvider>
    </ThemeProvider>
  )
}

// Hooks unificados para acesso aos contextos
export { useApp as useMainApp } from "@/contexts/app-context"
export { useApp as useLegacyApp } from "@/context/app-context"
export { useApp as useFrontendApp } from "@/frontend/context/app-context"
export { useSidebar as useMainSidebar } from "@/context/sidebar-context"
export { useSidebar as useFrontendSidebar } from "@/frontend/context/sidebar-context"

// Exemplo de hook unificado (pode ser expandido conforme necessidade)
export function useUnifiedSidebar() {
  // Retorna todos os contextos de sidebar disponíveis
  return {
    main: useMainSidebar(),
    frontend: useFrontendSidebar(),
  }
}

export function useUnifiedApp() {
  return {
    main: useMainApp(),
    legacy: useLegacyApp(),
    frontend: useFrontendApp(),
  }
}
