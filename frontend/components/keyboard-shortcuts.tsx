/**
 * Sistema de Atalhos de Teclado
 * 
 * Este componente implementa um sistema completo de atalhos de teclado
 * para usuários avançados, com suporte a personalização e uma tela de referência.
 */
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { 
  Keyboard, 
  Info, 
  X, 
  Edit, 
  Save,
  Plus,
  Trash,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { showNotification } from "@/components/ui/notification"

// Tipos de atalhos
export type ShortcutScope = "global" | "canvas" | "chat" | "settings"

// Interface para um atalho de teclado
export interface KeyboardShortcut {
  id: string
  name: string
  description: string
  keys: string[]
  scope: ShortcutScope
  action: () => void
  isCustom?: boolean
  isEditable?: boolean
}

// Formata as teclas para exibição
const formatKeys = (keys: string[]): string => {
  return keys.map(key => {
    // Substitui nomes de teclas por símbolos quando possível
    switch (key.toLowerCase()) {
      case "ctrl":
      case "control":
        return "⌃"
      case "alt":
        return "⌥"
      case "shift":
        return "⇧"
      case "meta":
      case "command":
      case "cmd":
        return "⌘"
      case "enter":
        return "↵"
      case "escape":
      case "esc":
        return "⎋"
      case "tab":
        return "⇥"
      case "space":
        return "␣"
      case "backspace":
        return "⌫"
      case "delete":
        return "⌦"
      case "arrowup":
        return "↑"
      case "arrowdown":
        return "↓"
      case "arrowleft":
        return "←"
      case "arrowright":
        return "→"
      default:
        return key.length === 1 ? key.toUpperCase() : key
    }
  }).join(" + ")
}

// Normaliza uma tecla para comparação
const normalizeKey = (key: string): string => {
  key = key.toLowerCase()
  
  // Normaliza nomes de teclas
  if (key === "control") return "ctrl"
  if (key === "command" || key === "meta") return "cmd"
  if (key === "escape") return "esc"
  if (key === " " || key === "spacebar") return "space"
  if (key === "return") return "enter"
  
  return key
}

// Verifica se duas combinações de teclas são iguais
const areKeysEqual = (keys1: string[], keys2: string[]): boolean => {
  if (keys1.length !== keys2.length) return false
  
  const normalized1 = keys1.map(normalizeKey).sort()
  const normalized2 = keys2.map(normalizeKey).sort()
  
  return normalized1.every((key, index) => key === normalized2[index])
}

interface KeyboardShortcutsProps {
  customShortcuts?: KeyboardShortcut[]
  onShortcutTrigger?: (shortcutId: string) => void
}

/**
 * Componente de atalhos de teclado
 */
export default function KeyboardShortcuts({
  customShortcuts = [],
  onShortcutTrigger,
}: KeyboardShortcutsProps) {
  // Estados
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ShortcutScope>("global")
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingShortcut, setEditingShortcut] = useState<KeyboardShortcut | null>(null)
  const [recordingKeys, setRecordingKeys] = useState(false)
  const [currentKeys, setCurrentKeys] = useState<string[]>([])
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  
  // Referências
  const keysRef = useRef<Set<string>>(new Set())
  
  // Atalhos padrão
  const defaultShortcuts: KeyboardShortcut[] = [
    {
      id: "toggle-theme",
      name: "Alternar tema",
      description: "Alterna entre os temas claro e escuro",
      keys: ["ctrl", "shift", "t"],
      scope: "global",
      action: () => {
        // Implementação da ação
        document.documentElement.classList.toggle("dark")
      },
      isEditable: true,
    },
    {
      id: "open-search",
      name: "Abrir pesquisa",
      description: "Abre a barra de pesquisa global",
      keys: ["ctrl", "k"],
      scope: "global",
      action: () => {
        // Implementação da ação
        console.log("Abrir pesquisa")
      },
      isEditable: true,
    },
    {
      id: "save",
      name: "Salvar",
      description: "Salva o projeto atual",
      keys: ["ctrl", "s"],
      scope: "global",
      action: () => {
        // Implementação da ação
        console.log("Salvar projeto")
      },
      isEditable: true,
    },
    {
      id: "undo",
      name: "Desfazer",
      description: "Desfaz a última ação",
      keys: ["ctrl", "z"],
      scope: "global",
      action: () => {
        // Implementação da ação
        console.log("Desfazer")
      },
      isEditable: true,
    },
    {
      id: "redo",
      name: "Refazer",
      description: "Refaz a última ação desfeita",
      keys: ["ctrl", "shift", "z"],
      scope: "global",
      action: () => {
        // Implementação da ação
        console.log("Refazer")
      },
      isEditable: true,
    },
    {
      id: "help",
      name: "Ajuda",
      description: "Abre a documentação de ajuda",
      keys: ["f1"],
      scope: "global",
      action: () => {
        // Implementação da ação
        console.log("Abrir ajuda")
      },
      isEditable: true,
    },
    {
      id: "shortcuts",
      name: "Atalhos de teclado",
      description: "Mostra esta tela de atalhos",
      keys: ["ctrl", "slash"],
      scope: "global",
      action: () => {
        setIsDialogOpen(true)
      },
      isEditable: true,
    },
    
    // Atalhos específicos do Canvas
    {
      id: "canvas-add-node",
      name: "Adicionar nó",
      description: "Adiciona um novo nó ao canvas",
      keys: ["n"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Adicionar nó")
      },
      isEditable: true,
    },
    {
      id: "canvas-delete",
      name: "Excluir selecionado",
      description: "Exclui os elementos selecionados no canvas",
      keys: ["delete"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Excluir selecionado")
      },
      isEditable: true,
    },
    {
      id: "canvas-select-all",
      name: "Selecionar tudo",
      description: "Seleciona todos os elementos no canvas",
      keys: ["ctrl", "a"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Selecionar tudo")
      },
      isEditable: true,
    },
    {
      id: "canvas-zoom-in",
      name: "Aumentar zoom",
      description: "Aumenta o zoom no canvas",
      keys: ["ctrl", "plus"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Aumentar zoom")
      },
      isEditable: true,
    },
    {
      id: "canvas-zoom-out",
      name: "Diminuir zoom",
      description: "Diminui o zoom no canvas",
      keys: ["ctrl", "minus"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Diminuir zoom")
      },
      isEditable: true,
    },
    {
      id: "canvas-zoom-reset",
      name: "Resetar zoom",
      description: "Reseta o zoom do canvas para 100%",
      keys: ["ctrl", "0"],
      scope: "canvas",
      action: () => {
        // Implementação da ação
        console.log("Resetar zoom")
      },
      isEditable: true,
    },
    
    // Atalhos específicos do Chat
    {
      id: "chat-new",
      name: "Nova conversa",
      description: "Inicia uma nova conversa",
      keys: ["ctrl", "shift", "n"],
      scope: "chat",
      action: () => {
        // Implementação da ação
        console.log("Nova conversa")
      },
      isEditable: true,
    },
    {
      id: "chat-send",
      name: "Enviar mensagem",
      description: "Envia a mensagem atual",
      keys: ["enter"],
      scope: "chat",
      action: () => {
        // Implementação da ação
        console.log("Enviar mensagem")
      },
      isEditable: true,
    },
    {
      id: "chat-new-line",
      name: "Nova linha",
      description: "Insere uma nova linha na mensagem",
      keys: ["shift", "enter"],
      scope: "chat",
      action: () => {
        // Implementação da ação
        console.log("Nova linha")
      },
      isEditable: true,
    },
    {
      id: "chat-clear",
      name: "Limpar conversa",
      description: "Limpa a conversa atual",
      keys: ["ctrl", "shift", "l"],
      scope: "chat",
      action: () => {
        // Implementação da ação
        console.log("Limpar conversa")
      },
      isEditable: true,
    },
    
    // Atalhos específicos das Configurações
    {
      id: "settings-save",
      name: "Salvar configurações",
      description: "Salva as configurações atuais",
      keys: ["ctrl", "enter"],
      scope: "settings",
      action: () => {
        // Implementação da ação
        console.log("Salvar configurações")
      },
      isEditable: true,
    },
    {
      id: "settings-reset",
      name: "Resetar configurações",
      description: "Reseta as configurações para os valores padrão",
      keys: ["ctrl", "shift", "r"],
      scope: "settings",
      action: () => {
        // Implementação da ação
        console.log("Resetar configurações")
      },
      isEditable: true,
    },
  ]
  
  // Efeito para inicializar os atalhos
  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Combina atalhos padrão com personalizados
    const allShortcuts = [...defaultShortcuts]
    
    // Adiciona atalhos personalizados
    customShortcuts.forEach(customShortcut => {
      // Verifica se já existe um atalho com o mesmo ID
      const existingIndex = allShortcuts.findIndex(s => s.id === customShortcut.id)
      
      if (existingIndex >= 0) {
        // Substitui o atalho existente
        allShortcuts[existingIndex] = customShortcut
      } else {
        // Adiciona novo atalho
        allShortcuts.push(customShortcut)
      }
    })
    
    // Carrega atalhos personalizados do localStorage
    const savedShortcuts = localStorage.getItem("keyboard-shortcuts")
    if (savedShortcuts) {
      try {
        const parsedShortcuts = JSON.parse(savedShortcuts)
        
        // Atualiza os atalhos com as configurações salvas
        parsedShortcuts.forEach((savedShortcut: any) => {
          const existingIndex = allShortcuts.findIndex(s => s.id === savedShortcut.id)
          
          if (existingIndex >= 0 && allShortcuts[existingIndex].isEditable) {
            // Atualiza apenas as teclas, mantendo a ação original
            allShortcuts[existingIndex] = {
              ...allShortcuts[existingIndex],
              keys: savedShortcut.keys,
              isCustom: savedShortcut.isCustom,
            }
          } else if (savedShortcut.isCustom) {
            // Adiciona atalho personalizado
            allShortcuts.push({
              ...savedShortcut,
              // Cria uma ação vazia para atalhos personalizados sem ação
              action: () => {
                console.log(`Atalho personalizado: ${savedShortcut.name}`)
                if (onShortcutTrigger) {
                  onShortcutTrigger(savedShortcut.id)
                }
              },
            })
          }
        })
      } catch (error) {
        console.error("Erro ao carregar atalhos personalizados:", error)
      }
    }
    
    setShortcuts(allShortcuts)
  }, [customShortcuts, onShortcutTrigger])
  
  // Efeito para registrar os listeners de teclado
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora eventos em campos de texto
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }
      
      // Se estiver gravando teclas para um novo atalho
      if (recordingKeys) {
        event.preventDefault()
        
        // Normaliza a tecla
        let key = event.key.toLowerCase()
        
        // Converte teclas especiais
        if (key === "control") key = "ctrl"
        if (key === "meta") key = "cmd"
        if (key === " ") key = "space"
        if (key === "escape") {
          // Cancela a gravação
          setRecordingKeys(false)
          setCurrentKeys([])
          return
        }
        
        // Adiciona modificadores
        if (event.ctrlKey && key !== "ctrl") keysRef.current.add("ctrl")
        if (event.altKey && key !== "alt") keysRef.current.add("alt")
        if (event.shiftKey && key !== "shift") keysRef.current.add("shift")
        if (event.metaKey && key !== "cmd") keysRef.current.add("cmd")
        
        // Adiciona a tecla atual
        keysRef.current.add(key)
        
        // Atualiza o estado
        setPressedKeys(new Set(keysRef.current))
        setCurrentKeys(Array.from(keysRef.current))
        
        return
      }
      
      // Verifica se algum atalho corresponde às teclas pressionadas
      const pressedKeys = new Set<string>()
      
      // Adiciona modificadores
      if (event.ctrlKey) pressedKeys.add("ctrl")
      if (event.altKey) pressedKeys.add("alt")
      if (event.shiftKey) pressedKeys.add("shift")
      if (event.metaKey) pressedKeys.add("cmd")
      
      // Adiciona a tecla atual
      let key = event.key.toLowerCase()
      if (key === " ") key = "space"
      if (key === "control") key = "ctrl"
      if (key === "meta") key = "cmd"
      pressedKeys.add(key)
      
      // Converte para array
      const pressedKeysArray = Array.from(pressedKeys)
      
      // Verifica se algum atalho corresponde
      for (const shortcut of shortcuts) {
        if (areKeysEqual(shortcut.keys, pressedKeysArray)) {
          event.preventDefault()
          shortcut.action()
          
          if (onShortcutTrigger) {
            onShortcutTrigger(shortcut.id)
          }
          
          break
        }
      }
    }
    
    const handleKeyUp = (event: KeyboardEvent) => {
      if (recordingKeys) {
        // Normaliza a tecla
        let key = event.key.toLowerCase()
        
        // Converte teclas especiais
        if (key === "control") key = "ctrl"
        if (key === "meta") key = "cmd"
        if (key === " ") key = "space"
        
        // Remove a tecla
        keysRef.current.delete(key)
        
        // Remove modificadores quando liberados
        if (key === "ctrl") keysRef.current.delete("ctrl")
        if (key === "alt") keysRef.current.delete("alt")
        if (key === "shift") keysRef.current.delete("shift")
        if (key === "cmd") keysRef.current.delete("cmd")
        
        // Atualiza o estado
        setPressedKeys(new Set(keysRef.current))
      }
    }
    
    // Registra os listeners
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [shortcuts, recordingKeys, onShortcutTrigger])
  
  /**
   * Inicia a gravação de teclas para um novo atalho
   */
  const startRecordingKeys = useCallback(() => {
    setRecordingKeys(true)
    setCurrentKeys([])
    keysRef.current.clear()
    setPressedKeys(new Set())
  }, [])
  
  /**
   * Para a gravação de teclas
   */
  const stopRecordingKeys = useCallback(() => {
    setRecordingKeys(false)
  }, [])
  
  /**
   * Inicia a edição de um atalho
   */
  const handleEditShortcut = useCallback((shortcut: KeyboardShortcut) => {
    setEditingShortcut(shortcut)
    setCurrentKeys(shortcut.keys)
    setIsEditing(true)
  }, [])
  
  /**
   * Salva as alterações em um atalho
   */
  const handleSaveShortcut = useCallback(() => {
    if (!editingShortcut || currentKeys.length === 0) return
    
    // Verifica se já existe um atalho com as mesmas teclas
    const conflictingShortcut = shortcuts.find(s => 
      s.id !== editingShortcut.id && 
      s.scope === editingShortcut.scope && 
      areKeysEqual(s.keys, currentKeys)
    )
    
    if (conflictingShortcut) {
      showNotification({
        type: "error",
        message: `Conflito com o atalho "${conflictingShortcut.name}". Escolha outra combinação.`,
      })
      return
    }
    
    // Atualiza o atalho
    setShortcuts(prev => {
      const updated = prev.map(s => {
        if (s.id === editingShortcut.id) {
          return {
            ...s,
            keys: currentKeys,
          }
        }
        return s
      })
      
      // Salva no localStorage
      const shortcutsToSave = updated.map(s => ({
        id: s.id,
        keys: s.keys,
        isCustom: s.isCustom,
      }))
      localStorage.setItem("keyboard-shortcuts", JSON.stringify(shortcutsToSave))
      
      return updated
    })
    
    // Limpa o estado de edição
    setIsEditing(false)
    setEditingShortcut(null)
    setCurrentKeys([])
    stopRecordingKeys()
    
    // Notifica o usuário
    showNotification({
      type: "success",
      message: "Atalho atualizado com sucesso!",
    })
  }, [editingShortcut, currentKeys, shortcuts, stopRecordingKeys])
  
  /**
   * Adiciona um novo atalho personalizado
   */
  const handleAddCustomShortcut = useCallback(() => {
    const newShortcut: KeyboardShortcut = {
      id: `custom-${Date.now()}`,
      name: "Novo Atalho",
      description: "Descrição do novo atalho",
      keys: [],
      scope: activeTab,
      action: () => {
        console.log("Atalho personalizado")
        if (onShortcutTrigger) {
          onShortcutTrigger(`custom-${Date.now()}`)
        }
      },
      isCustom: true,
      isEditable: true,
    }
    
    setEditingShortcut(newShortcut)
    setCurrentKeys([])
    setIsEditing(true)
    
    // Adiciona o novo atalho à lista
    setShortcuts(prev => [...prev, newShortcut])
  }, [activeTab, onShortcutTrigger])
  
  /**
   * Exclui um atalho personalizado
   */
  const handleDeleteShortcut = useCallback((shortcutId: string) => {
    setShortcuts(prev => {
      const updated = prev.filter(s => s.id !== shortcutId)
      
      // Salva no localStorage
      const shortcutsToSave = updated.map(s => ({
        id: s.id,
        keys: s.keys,
        isCustom: s.isCustom,
      }))
      localStorage.setItem("keyboard-shortcuts", JSON.stringify(shortcutsToSave))
      
      return updated
    })
    
    // Notifica o usuário
    showNotification({
      type: "success",
      message: "Atalho excluído com sucesso!",
    })
  }, [])
  
  /**
   * Reseta todos os atalhos para os valores padrão
   */
  const handleResetShortcuts = useCallback(() => {
    setShortcuts(defaultShortcuts)
    localStorage.removeItem("keyboard-shortcuts")
    
    // Notifica o usuário
    showNotification({
      type: "success",
      message: "Atalhos resetados para os valores padrão!",
    })
  }, [defaultShortcuts])
  
  /**
   * Filtra os atalhos por escopo
   */
  const filteredShortcuts = shortcuts.filter(shortcut => shortcut.scope === activeTab)
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDialogOpen(true)}
            >
              <Keyboard className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Atalhos de teclado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Atalhos de Teclado</DialogTitle>
            <DialogDescription>
              Visualize e personalize os atalhos de teclado para aumentar sua produtividade.
            </DialogDescription>
          </DialogHeader>
          
          {isEditing ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {editingShortcut?.isCustom ? "Novo Atalho" : `Editar: ${editingShortcut?.name}`}
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                  setIsEditing(false)
                  setEditingShortcut(null)
                  setCurrentKeys([])
                  stopRecordingKeys()
                  
                  // Remove o atalho personalizado não salvo
                  if (editingShortcut?.isCustom && !editingShortcut.keys.length) {
                    setShortcuts(prev => prev.filter(s => s.id !== editingShortcut.id))
                  }
                }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {editingShortcut?.isCustom && (
                <div className="space-y-2">
                  <Label htmlFor="shortcut-name">Nome do atalho</Label>
                  <Input
                    id="shortcut-name"
                    value={editingShortcut.name}
                    onChange={(e) => {
                      setEditingShortcut(prev => {
                        if (!prev) return null
                        return { ...prev, name: e.target.value }
                      })
                      
                      // Atualiza o atalho na lista
                      setShortcuts(prev => prev.map(s => {
                        if (s.id === editingShortcut.id) {
                          return { ...s, name: e.target.value }
                        }
                        return s
                      }))
                    }}
                  />
                </div>
              )}
              
              {editingShortcut?.isCustom && (
                <div className="space-y-2">
                  <Label htmlFor="shortcut-description">Descrição</Label>
                  <Input
                    id="shortcut-description"
                    value={editingShortcut.description}
                    onChange={(e) => {
                      setEditingShortcut(prev => {
                        if (!prev) return null
                        return { ...prev, description: e.target.value }
                      })
                      
                      // Atualiza o atalho na lista
                      setShortcuts(prev => prev.map(s => {
                        if (s.id === editingShortcut.id) {
                          return { ...s, description: e.target.value }
                        }
                        return s
                      }))
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="shortcut-keys">Teclas</Label>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex-1 h-10 px-3 py-2 rounded-md border ${
                      recordingKeys ? "border-primary" : "border-input"
                    } ${
                      currentKeys.length > 0 ? "bg-muted" : "bg-background"
                    }`}
                    onClick={startRecordingKeys}
                  >
                    {recordingKeys ? (
                      <span className="text-muted-foreground">Pressione as teclas...</span>
                    ) : currentKeys.length > 0 ? (
                      <span className="font-mono">{formatKeys(currentKeys)}</span>
                    ) : (
                      <span className="text-muted-foreground">Clique para definir</span>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={startRecordingKeys}
                  >
                    <Keyboard className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditingShortcut(null)
                    setCurrentKeys([])
                    stopRecordingKeys()
                    
                    // Remove o atalho personalizado não salvo
                    if (editingShortcut?.isCustom && !editingShortcut.keys.length) {
                      setShortcuts(prev => prev.filter(s => s.id !== editingShortcut.id))
                    }
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveShortcut}
                  disabled={currentKeys.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Tabs defaultValue="global" value={activeTab} onValueChange={(value) => setActiveTab(value as ShortcutScope)}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="canvas">Canvas</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {activeTab === "global" ? "Atalhos disponíveis em todo o aplicativo" :
                         activeTab === "canvas" ? "Atalhos específicos para o editor de workflow" :
                         activeTab === "chat" ? "Atalhos específicos para o chat" :
                         "Atalhos específicos para as configurações"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={handleAddCustomShortcut}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Adicionar
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={handleResetShortcuts}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        Resetar
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[300px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Ação</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="w-[150px]">Atalho</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredShortcuts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                              Nenhum atalho definido para esta seção.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredShortcuts.map((shortcut) => (
                            <TableRow key={shortcut.id}>
                              <TableCell className="font-medium">
                                {shortcut.name}
                                {shortcut.isCustom && (
                                  <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                    Personalizado
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{shortcut.description}</TableCell>
                              <TableCell className="font-mono">
                                {shortcut.keys.length > 0 ? formatKeys(shortcut.keys) : "-"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                  {shortcut.isEditable && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => handleEditShortcut(shortcut)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  )}
                                  
                                  {shortcut.isCustom && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive"
                                      onClick={() => handleDeleteShortcut(shortcut.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
