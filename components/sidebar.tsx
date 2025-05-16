"use client"

import { useState } from "react"
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
  const pathname = usePathname();

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
