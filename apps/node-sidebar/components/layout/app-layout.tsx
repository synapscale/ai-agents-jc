"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layout, LayoutContent, LayoutSidebar } from "@/components/ui/layout"
import { Button } from "@/components/ui/button"
import { PaintbrushIcon as Canvas, Store, Settings, Menu, X } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
}

export function AppLayout({ children, sidebar }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <Layout>
      {/* Main Navigation Sidebar */}
      <LayoutSidebar
        className="w-16 border-r flex flex-col items-center py-4 bg-background"
        position="left"
        collapsed={false}
      >
        <div className="flex flex-col items-center space-y-4">
          <Link href="/canvas">
            <Button
              variant={isActive("/canvas") ? "secondary" : "ghost"}
              size="icon"
              className="h-10 w-10"
              aria-label="Canvas"
            >
              <Canvas className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button
              variant={isActive("/marketplace") ? "secondary" : "ghost"}
              size="icon"
              className="h-10 w-10"
              aria-label="Marketplace"
            >
              <Store className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant={isActive("/settings") ? "secondary" : "ghost"}
              size="icon"
              className="h-10 w-10"
              aria-label="Configurações"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </LayoutSidebar>

      {/* Secondary Sidebar (conditional) */}
      {sidebar && (
        <LayoutSidebar className="border-r bg-background" position="left" collapsed={!sidebarOpen}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-medium">
              {isActive("/canvas") && "Canvas"}
              {isActive("/marketplace") && "Marketplace"}
              {isActive("/settings") && "Configurações"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
          {sidebar}
        </LayoutSidebar>
      )}

      {/* Main Content Area */}
      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
