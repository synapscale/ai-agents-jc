"use client"

import { useState, useEffect } from "react"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Settings,
  Users,
  Workflow,
  FileText,
  MessageCircle,
  UserCircle,
  Box
} from "lucide-react"
import { cn } from "@/lib/utils"

const SIDEBAR_COLLAPSE_KEY = "sidebar-collapsed"

interface SidebarProps {
  className?: string
}

const navItems = [
  { href: "/canvas", icon: Workflow, label: "Editor de Workflow" },
  { href: "/agentes", icon: UserCircle, label: "Agentes" },
  { href: "/nodes", icon: Box, label: "Nodes" },
  { href: "/chat", icon: MessageCircle, label: "Chat Interativo" },
  { href: "/settings", icon: Settings, label: "Configurações" },
];

export default function Sidebar({ className, children }: SidebarProps & { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Persistência do estado de colapso
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSE_KEY)
    if (saved) setCollapsed(saved === "true")
  }, [])
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSE_KEY, String(collapsed))
  }, [collapsed])

  // Responsividade mobile: sidebar vira drawer
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Tooltip custom simples
  function Tooltip({ children, label }: { children: React.ReactNode, label: string }) {
    return (
      <span className="relative group">
        {children}
        <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {label}
        </span>
      </span>
    )
  }

  // Renderização condicional para mobile
  if (isMobile) {
    return (
      <div className={cn("fixed inset-0 z-40 flex", !collapsed ? "" : "pointer-events-none")}
        style={{ background: collapsed ? "transparent" : "rgba(0,0,0,0.3)" }}
        onClick={() => setCollapsed(true)}
      >
        <div
          className={cn(
            "flex h-full flex-col border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ease-in-out w-64",
            collapsed ? "-translate-x-full" : "translate-x-0",
            "transform-gpu shadow-xl"
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b dark:border-gray-700 px-4">
            <div className="flex items-center overflow-hidden">
              <Link href="/" className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">JC</div>
              </Link>
              <h1 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">Agente AI Canvas</h1>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              aria-label="Fechar sidebar"
              title="Fechar sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          {/* Navegação */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    tabIndex={0}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                      pathname === item.href || pathname.startsWith(`${item.href}/`) 
                        ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold" 
                        : "",
                    )}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {children}
          </nav>
          {/* Footer */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">Usuário</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
              </div>
            </div>
          </div>
        </div>
        {/* Botão flutuante para abrir */}
        {collapsed && (
          <button
            onClick={e => { e.stopPropagation(); setCollapsed(false) }}
            className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Abrir menu"
            title="Abrir menu"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    )
  }

  // Desktop
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header com logo e botão de colapso */}
      <div className="flex h-16 items-center justify-between border-b dark:border-gray-700 px-4">
        <div className="flex items-center overflow-hidden">
          <Link href="/" className="flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">JC</div>
          </Link>
          <h1
            className={cn(
              "ml-3 text-lg font-semibold text-gray-800 dark:text-white transition-opacity duration-200",
              collapsed ? "opacity-0 w-0 hidden" : "opacity-100",
            )}
          >
            Agente AI Canvas
          </h1>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          title={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Tooltip label={collapsed ? item.label : ""}>
                <Link
                  href={item.href}
                  tabIndex={0}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                    pathname === item.href || pathname.startsWith(`${item.href}/`) 
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold" 
                      : "",
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span
                    className={cn(
                      "ml-3 transition-opacity duration-200",
                      collapsed ? "opacity-0 w-0 hidden" : "opacity-100",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </Tooltip>
            </li>
          ))}
        </ul>
        {children}
        {/* Se não houver itens, mostra mensagem */}
        {navItems.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-600 mt-8">Nenhuma navegação disponível</div>
        )}
      </nav>

      {/* Footer */}
      <div className={cn("border-t dark:border-gray-700 p-4 transition-all duration-200", collapsed && "p-0 border-none")}
        aria-hidden={collapsed}
        style={collapsed ? { height: 0, overflow: 'hidden' } : {}}>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className={cn("ml-3 transition-opacity duration-200", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}> 
            <p className="text-sm font-medium text-gray-800 dark:text-white">Usuário</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
      </div>
    </div>
  )
}
