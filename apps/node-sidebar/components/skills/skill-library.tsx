"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSkillsStore } from "@/stores/use-skills-store"
import type { Skill, SkillType, CustomNode } from "@/types/skill-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SkillEditor } from "./skill-editor"
import { NodeComposer } from "./node-composer"
import { MarketplaceService } from "@/services/marketplace-service"
import {
  Search,
  Plus,
  Settings,
  Code,
  Database,
  GitBranch,
  Bot,
  Globe,
  FileText,
  MoreHorizontal,
  Copy,
  Trash,
  Edit,
  Eye,
  Upload,
  Download,
  ExternalLink,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SkillLibrary() {
  const router = useRouter()
  const { toast } = useToast()
  const { skills, customNodes, deleteSkill, deleteCustomNode } = useSkillsStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("skills")
  const [selectedSkillType, setSelectedSkillType] = useState<SkillType | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSkillEditorOpen, setIsSkillEditorOpen] = useState(false)
  const [isNodeComposerOpen, setIsNodeComposerOpen] = useState(false)
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [viewingSkill, setViewingSkill] = useState<Skill | null>(null)
  const [viewingNode, setViewingNode] = useState<CustomNode | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "skill" | "node"; name: string } | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  // Filtrar skills
  const filteredSkills = skills.filter((skill) => {
    // Filtrar por query
    const matchesQuery =
      searchQuery === "" ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtrar por tipo
    const matchesType = selectedSkillType === null || skill.type === selectedSkillType

    // Filtrar por tags
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => skill.metadata?.tags?.includes(tag))

    return matchesQuery && matchesType && matchesTags
  })

  // Filtrar nodes
  const filteredNodes = customNodes.filter((node) => {
    // Filtrar por query
    const matchesQuery =
      searchQuery === "" ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtrar por tags
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => node.metadata?.tags?.includes(tag))

    return matchesQuery && matchesTags
  })

  // Obter todas as tags únicas
  const allTags = Array.from(
    new Set([
      ...skills.flatMap((skill) => skill.metadata?.tags || []),
      ...customNodes.flatMap((node) => node.metadata?.tags || []),
    ]),
  )

  // Manipular exclusão
  const handleDelete = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === "skill") {
      deleteSkill(itemToDelete.id)
    } else {
      deleteCustomNode(itemToDelete.id)
    }

    setIsDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  // Exportar um item
  const handleExportItem = async (itemType: "skill" | "node", itemId: string) => {
    setIsExporting(true)
    try {
      const jsonData = await MarketplaceService.exportItem(itemType, itemId)

      // Criar um blob e um link para download
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${itemType}-${itemId}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Sucesso",
        description: "Item exportado com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao exportar item:", error)
      toast({
        title: "Erro",
        description: "Não foi possível exportar o item.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Publicar um item no marketplace
  const handlePublishItem = (itemType: "skill" | "node", itemId: string) => {
    router.push(`/marketplace?publish=true&type=${itemType}&id=${itemId}`)
  }

  // Obter ícone para tipo de skill
  const getSkillTypeIcon = (type: SkillType) => {
    switch (type) {
      case "data-transformation":
        return <FileText className="w-4 h-4" />
      case "data-input":
        return <Database className="w-4 h-4" />
      case "data-output":
        return <Database className="w-4 h-4" />
      case "control-flow":
        return <GitBranch className="w-4 h-4" />
      case "ui-interaction":
        return <Settings className="w-4 h-4" />
      case "integration":
        return <Globe className="w-4 h-4" />
      case "ai":
        return <Bot className="w-4 h-4" />
      case "utility":
        return <Code className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Biblioteca de Skills</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/marketplace")}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Marketplace
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingSkillId(null)
                setIsSkillEditorOpen(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Skill
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingNodeId(null)
                setIsNodeComposerOpen(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Node
            </Button>
          </div>
        </div>

        <Tabs defaultValue="skills" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="skills" className="flex-1">
              Skills
            </TabsTrigger>
            <TabsTrigger value="nodes" className="flex-1">
              Nodes
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-3 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-48 border-r p-4 overflow-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Tipos de Skill</h3>
                <div className="space-y-1">
                  <Button
                    variant={selectedSkillType === null ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType(null)}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Todos
                  </Button>
                  <Button
                    variant={selectedSkillType === "data-transformation" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType("data-transformation")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Transformação
                  </Button>
                  <Button
                    variant={selectedSkillType === "data-input" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType("data-input")}
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Entrada
                  </Button>
                  <Button
                    variant={selectedSkillType === "data-output" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType("data-output")}
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Saída
                  </Button>
                  <Button
                    variant={selectedSkillType === "control-flow" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType("control-flow")}
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    Fluxo
                  </Button>
                  <Button
                    variant={selectedSkillType === "ai" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedSkillType("ai")}
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    IA
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="space-y-1">
                  {allTags.length > 0 ? (
                    allTags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTags([...selectedTags, tag])
                            } else {
                              setSelectedTags(selectedTags.filter((t) => t !== tag))
                            }
                          }}
                          className="h-3 w-3 rounded border-gray-300 mr-2"
                        />
                        <label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground">Nenhuma tag disponível</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-auto">
            <TabsContent value="skills" className="mt-0">
              {filteredSkills.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Nenhuma skill encontrada</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setEditingSkillId(null)
                      setIsSkillEditorOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Nova Skill
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSkills.map((skill) => (
                    <Card key={skill.id}>
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base flex items-center">
                              {getSkillTypeIcon(skill.type)}
                              <span className="ml-2">{skill.name}</span>
                            </CardTitle>
                            <CardDescription>v{skill.version}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setViewingSkill(skill)
                                  setViewingNode(null)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingSkillId(skill.id)
                                  setIsSkillEditorOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleExportItem("skill", skill.id)}>
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePublishItem("skill", skill.id)}>
                                <Upload className="w-4 h-4 mr-2" />
                                Publicar no Marketplace
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setItemToDelete({
                                    id: skill.id,
                                    type: "skill",
                                    name: skill.name,
                                  })
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2 text-sm">{skill.description}</CardContent>
                      <CardFooter className="text-xs text-muted-foreground py-3">
                        Atualizado em {new Date(skill.updatedAt).toLocaleDateString()}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="nodes" className="mt-0">
              {filteredNodes.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Nenhum node encontrado</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setEditingNodeId(null)
                      setIsNodeComposerOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Novo Node
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNodes.map((node) => (
                    <Card key={node.id}>
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{node.name}</CardTitle>
                            <CardDescription>v{node.version}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setViewingSkill(null)
                                  setViewingNode(node)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingNodeId(node.id)
                                  setIsNodeComposerOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleExportItem("node", node.id)}>
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePublishItem("node", node.id)}>
                                <Upload className="w-4 h-4 mr-2" />
                                Publicar no Marketplace
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setItemToDelete({
                                    id: node.id,
                                    type: "node",
                                    name: node.name,
                                  })
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2 text-sm">{node.description}</CardContent>
                      <CardFooter className="text-xs text-muted-foreground py-3">
                        Atualizado em {new Date(node.updatedAt).toLocaleDateString()}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </div>

      {/* Modal de edição de skill */}
      {isSkillEditorOpen && (
        <Dialog open={isSkillEditorOpen} onOpenChange={setIsSkillEditorOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <SkillEditor
              skillId={editingSkillId}
              onSave={() => setIsSkillEditorOpen(false)}
              onCancel={() => setIsSkillEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de edição de node */}
      {isNodeComposerOpen && (
        <Dialog open={isNodeComposerOpen} onOpenChange={setIsNodeComposerOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <NodeComposer
              nodeId={editingNodeId}
              onSave={() => setIsNodeComposerOpen(false)}
              onCancel={() => setIsNodeComposerOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de visualização */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewingSkill ? viewingSkill.name : viewingNode?.name}</DialogTitle>
            <DialogDescription>{viewingSkill ? viewingSkill.description : viewingNode?.description}</DialogDescription>
          </DialogHeader>

          {viewingSkill && (
            <div>
              <p>
                <strong>Tipo:</strong> {viewingSkill.type}
              </p>
              <p>
                <strong>Versão:</strong> {viewingSkill.version}
              </p>
              {viewingSkill.metadata?.tags && viewingSkill.metadata.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong> {viewingSkill.metadata.tags.join(", ")}
                </p>
              )}
            </div>
          )}

          {viewingNode && (
            <div>
              <p>
                <strong>Versão:</strong> {viewingNode.version}
              </p>
              {viewingNode.metadata?.tags && viewingNode.metadata.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong> {viewingNode.metadata.tags.join(", ")}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir {itemToDelete?.type === "skill" ? "Skill" : "Node"}</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir "{itemToDelete?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
