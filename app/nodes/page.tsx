"use client"

import { NodeSidebar } from "@/components/node-sidebar/node-sidebar"
import { NodesProvider } from "@/hooks/use-nodes"
import { ThemeProvider } from "@/contexts/theme-context"

/**
 * Página principal de gerenciamento de nodes
 * 
 * Esta página exibe a interface de gerenciamento de nodes com a sidebar
 * para navegação, criação e edição de nodes.
 */
export default function NodesPage() {
  return (
    <ThemeProvider>
      <NodesProvider>
        <div className="container py-6">
          <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-lg border">
            <div className="w-80 border-r">
              <NodeSidebar />
            </div>
            <div className="flex-1 p-6">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Gerenciador de Nodes</h2>
                  <p className="mt-2 text-muted-foreground">
                    Selecione um node na sidebar para visualizar ou editar, ou crie um novo node.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NodesProvider>
    </ThemeProvider>
  )
}
