"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/context/sidebar-context"
import {
  Settings,
  Menu,
  X,
  Code,
  Variable,
  BookTemplate,
  PenTool,
  History,
  FileCode,
  BookOpen,
  Box,
  ShoppingBag,
} from "lucide-react"

/**
 * Componente de barra lateral da aplicação.
 * Fornece navegação principal e acesso a recursos do sistema.
 *
 * @param props - Propriedades do componente
 * @param props.className - Classes CSS adicionais
 */
export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  const { isOpen, toggle, close, isCollapsed } = useSidebar()
  const [isMounted, setIsMounted] = useState(false)

  // Previne incompatibilidade de hidratação renderizando apenas após a montagem
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Manipula o comportamento da barra lateral em dispositivos móveis nas mudanças de rota
  useEffect(() => {
    // Fecha a barra lateral na mudança de rota em dispositivos móveis
    const handleRouteChange = () => {
      if (window.innerWidth < 1024) {
        close()
      }
    }

    handleRouteChange()
  }, [pathname, close])

  // Não renderiza nada durante SSR para prevenir incompatibilidade de hidratação
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Overlay móvel - mostrado apenas quando a barra lateral está aberta em dispositivos móveis */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Container da barra lateral */}
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:z-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        aria-label="Navegação principal"
      >
        {/* Cabeçalho da barra lateral */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h2 className="text-lg font-semibold">Workflow Builder</h2>
          <Button variant="ghost" size="icon" onClick={toggle} className="lg:hidden" aria-label="Fechar barra lateral">
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Fechar barra lateral</span>
          </Button>
        </div>

        {/* Conteúdo da barra lateral */}
        <div className="space-y-4 py-4 flex-1">
          {/* Links de navegação principal */}
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground" id="workflow-nav-heading">
              Workflow
            </h3>
            <div className="space-y-1" role="navigation" aria-labelledby="workflow-nav-heading">
              <NavItem href="/canvas" icon={<PenTool className="h-5 w-5" />} label="Canvas" pathname={pathname} />
              <NavItem
                href="/node-definitions"
                icon={<Code className="h-5 w-5" />}
                label="Definições de Nós"
                pathname={pathname}
              />
              <NavItem
                href="/templates"
                icon={<BookTemplate className="h-5 w-5" />}
                label="Templates"
                pathname={pathname}
              />
              <NavItem
                href="/templates/code-templates"
                icon={<FileCode className="h-5 w-5" />}
                label="Templates de Código"
                pathname={pathname}
              />
              <NavItem
                href="/variables"
                icon={<Variable className="h-5 w-5" />}
                label="Variáveis"
                pathname={pathname}
              />
            </div>
          </div>

          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground" id="dev-nav-heading">
              Desenvolvimento
            </h3>
            <div className="space-y-1" role="navigation" aria-labelledby="dev-nav-heading">
              <NavItem
                href="/executions"
                icon={<History className="h-5 w-5" />}
                label="Execuções"
                pathname={pathname}
              />
              <NavItem href="/docs" icon={<BookOpen className="h-5 w-5" />} label="Documentação" pathname={pathname} />
              <NavItem
                href="/node-definitions"
                icon={<Box className="h-5 w-5" />}
                label="Templates de Nós"
                pathname={pathname}
              />
              <NavItem
                href="/marketplace"
                icon={<ShoppingBag className="h-5 w-5" />}
                label="Marketplace"
                pathname={pathname}
              />
            </div>
          </div>

          <Separator />

          {/* Área rolável para lista de workflows */}
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground" id="recent-workflows-heading">
              Workflows Recentes
            </h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-1" role="list" aria-labelledby="recent-workflows-heading">
                {[
                  "Automação de Marketing",
                  "Processamento de Dados",
                  "Integração de API",
                  "Sequência de Email",
                  "Jornada do Cliente",
                ].map((workflow, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                    role="listitem"
                  >
                    {workflow}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Rodapé da barra lateral */}
        <div className="mt-auto p-4">
          <Separator className="mb-4" />
          <NavItem href="/settings" icon={<Settings className="h-5 w-5" />} label="Configurações" pathname={pathname} />
        </div>
      </div>

      {/* Botão de alternância móvel - fixo no canto inferior esquerdo */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        className="fixed bottom-4 left-4 z-40 rounded-full shadow-md lg:hidden"
        aria-label="Abrir menu de navegação"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Alternar barra lateral</span>
      </Button>
    </>
  )
}

/**
 * Componente de Item de Navegação
 *
 * Renderiza um único link de navegação com estilo de estado ativo.
 *
 * @param props - Propriedades do componente
 * @param props.href - O destino do link
 * @param props.icon - O ícone a ser exibido
 * @param props.label - O rótulo de texto
 * @param props.pathname - O caminho atual para comparação de estado ativo
 * @returns Um link de navegação estilizado
 */
interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
}

/**
 * Componente de item de navegação.
 *
 * @param props - Propriedades do componente
 * @param props.href - Destino do link
 * @param props.icon - Ícone a ser exibido
 * @param props.label - Texto do link
 * @param props.pathname - Caminho atual para determinar estado ativo
 */
function NavItem({ href, icon, label, pathname }: NavItemProps) {
  // Determina se este item de navegação está ativo com base no caminho atual
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      {label}
    </Link>
  )
}
