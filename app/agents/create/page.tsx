import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CreateAgentPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Link href="/agents" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mr-4">
          ← Voltar
        </Link>
        <h1 className="text-2xl font-bold flex-1">Novo Agente</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-sm">
            Templates
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
            Criar Agente
          </Button>
        </div>
      </div>
      
      <div className="p-6 overflow-auto">
        <form className="space-y-6 max-w-4xl mx-auto">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium flex items-center">
              Nome do Agente <span className="text-red-500 ml-1">*</span>
            </label>
            <div>
              <Input 
                id="name" 
                placeholder="Digite o nome do agente" 
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className="text-red-500 text-xs">O nome do agente é obrigatório</span>
                <span className="text-xs text-gray-500">0/50</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="type" className="text-sm font-medium">
                Tipo
              </label>
              <select 
                id="type" 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="chat">Chat</option>
                <option value="text">Texto</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="model" className="text-sm font-medium">
                Modelo
              </label>
              <select 
                id="model" 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="gpt-4o">ChatGPT 4o</option>
                <option value="gpt-4">GPT-4</option>
                <option value="claude-3">Claude 3</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <div>
              <Textarea 
                id="description" 
                placeholder="Breve descrição do agente" 
                className="w-full"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">0/200</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select 
              id="status" 
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="draft">Rascunho</option>
              <option value="active">Ativo</option>
            </select>
          </div>
          
          <div className="pt-4">
            <Tabs defaultValue="prompt">
              <TabsList className="mb-4">
                <TabsTrigger value="prompt" className="px-4 py-2">Prompt</TabsTrigger>
                <TabsTrigger value="parameters" className="px-4 py-2">Parâmetros</TabsTrigger>
                <TabsTrigger value="connections" className="px-4 py-2">Conexões</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prompt" className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Variáveis</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Funções</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Exemplos</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Persona</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Contexto</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Instruções</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Formato</span>
                    <span className="text-xs">+</span>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Capacidades</span>
                    <span className="text-xs">+</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="text-xs">Restrições</span>
                    <span className="text-xs">+</span>
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label htmlFor="prompt" className="text-sm font-medium flex items-center">
                      Prompt do Agente <span className="text-red-500 ml-1">*</span>
                    </label>
                    <button type="button" className="text-sm text-purple-600 hover:text-purple-800">
                      Usar template
                    </button>
                  </div>
                  <Textarea 
                    id="prompt" 
                    className="w-full h-80 font-mono text-sm"
                    defaultValue={`# Agente Central Multi-Funcional: Coordenador de Fluxos

Você é um assistente avançado capaz de gerenciar múltiplos fluxos de trabalho especializados. Sua função é identificar comandos específicos, coordenar as etapas necessárias e garantir uma experiência fluida para o usuário.

## Capacidades Principais:
- Identificar comandos específicos e iniciar os fluxos correspondentes
- Manter o contexto da conversa durante cada fluxo
- Alternar entre diferentes modos

## Comportamento Padrão:
Quando nenhum fluxo específico está ativo, você deve:
- Responder perguntas gerais de forma útil e informativa
- Oferecer assistência de acordo com suas capacidades normais
- Estar atento a comandos que possam iniciar fluxos específicos`}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="parameters">
                <div className="p-8 text-center text-gray-500">
                  Configurações de parâmetros do agente
                </div>
              </TabsContent>
              
              <TabsContent value="connections">
                <div className="p-8 text-center text-gray-500">
                  Configurações de conexões do agente
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline">
              Redefinir
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Criar Agente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Adicionar import que faltou
import Link from 'next/link';
