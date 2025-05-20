"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, LayoutDashboard, Settings, Sparkles, Layers, FileText, MessageSquare, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { SidebarNavItem } from "@/components/sidebar/sidebar-nav-item"
import { SidebarNavSection } from "@/components/sidebar/sidebar-nav-section"

// Navigation sections definition
const NAV_SECTIONS = [
  {
    title: "Principal",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
      { href: "/agentes", label: "Agentes De IA", icon: <Bot /> },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      { href: "/canvas", label: "Canvas", icon: <Layers /> },
      { href: "/prompts", label: "Prompts", icon: <FileText /> },
      { href: "/chat", label: "Chat", icon: <MessageSquare /> },
    ],
  },
  {
    title: "Configurações",
    items: [{ href: "/settings", label: "Configurações", icon: <Settings /> }],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add resize listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close sidebar when navigating on mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Check if an item is active
  const isItemActive = useCallback(
    (href: string) => {
      if (href === "/agentes") {
        return pathname === "/agentes" || pathname.startsWith("/agentes/")
      }
      return pathname === href
    },
    [pathname],
  )

  // Mobile menu button
  const mobileMenuButton = isMobile ? (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-3 left-3 z-50 md:hidden h-9 w-9"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
      aria-controls="sidebar"
    >
      {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
    </Button>
  ) : null

  // Mobile overlay
  const mobileOverlay =
    isMobile && isOpen ? (
      <div
        className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
        onClick={toggleSidebar}
        aria-hidden="true"
      />
    ) : null

  // Sidebar classes
  const sidebarClasses = cn(
    "border-0 transition-all duration-300",
    isMobile && (isOpen ? "translate-x-0" : "-translate-x-full"),
    isMobile && "fixed top-0 left-0 z-40 h-full",
  )

  return (
    <>
      {mobileMenuButton}

      <Sidebar variant="floating" className={sidebarClasses} id="sidebar" aria-label="Navegação principal">
        <SidebarHeader className="flex items-center justify-center py-4 sm:py-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Página inicial">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-purple-600 text-white">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </div>
            <span className="text-base sm:text-lg font-semibold">Canva E Agentes</span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          {NAV_SECTIONS.map((section) => (
            <SidebarNavSection key={section.title} title={section.title}>
              {section.items.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={isItemActive(item.href)}
                />
              ))}
            </SidebarNavSection>
          ))}
        </SidebarContent>
      </Sidebar>

      {mobileOverlay}
    </>
  )
}
