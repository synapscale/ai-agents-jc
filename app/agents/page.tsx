import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Tipos de agentes
interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  type: string;
  status: string;
  created: string;
  updated: string;
}

export default function AgentsPage() {
  // Dados de exemplo para agentes
  const agents: Agent[] = [
    {
      id: 'agent1',
      name: 'Assistente de Suporte Técnico',
      description: 'Assistente especializado em resolver problemas técnicos',
      model: 'gpt-4o',
      type: 'Chat',
      status: 'Ativo',
      created: '15/05/2023',
      updated: '15/05/2023'
    },
    {
      id: 'agent2',
      name: 'Gerador de Conteúdo para Blog',
      description: 'Cria artigos de blog sobre diversos temas',
      model: 'gpt-4',
      type: 'Texto',
      status: 'Rascunho',
      created: '10/05/2023',
      updated: '14/05/2023'
    },
    {
      id: 'agent3',
      name: 'Assistente de Pesquisa Acadêmica',
      description: 'Auxilia em pesquisas acadêmicas e formatação de trabalhos',
      model: 'gpt-4',
      type: 'Chat',
      status: 'Ativo',
      created: '05/05/2023',
      updated: '12/05/2023'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Agentes</h1>
        <Link href="/agents/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <span className="mr-1">+</span> Novo Agente
          </Button>
        </Link>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Buscar agentes..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <Tabs defaultValue="todos" className="ml-4">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="rascunhos">Rascunhos/Arquivados</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-1">{agent.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-md">
                  {agent.model}
                </span>
                <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-md">
                  {agent.type}
                </span>
                <span className={`px-2 py-1 text-xs rounded-md ${
                  agent.status === 'Ativo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {agent.status}
                </span>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Criado: {agent.created}</span>
                <span>Atualizado: {agent.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
