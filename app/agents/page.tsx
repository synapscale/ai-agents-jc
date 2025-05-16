import React from 'react';
import { AgentCard } from '@/components/agents-v0/agent-card';

export default function AgentsPage() {
  // Dados de exemplo para agentes
  const agents = [
    {
      id: 'agent1',
      name: 'Assistente de Atendimento',
      description: 'Agente especializado em atendimento ao cliente com suporte a múltiplos idiomas e integração com sistemas CRM.',
      type: 'assistant',
      model: 'gpt-4o',
      tags: ['Atendimento', 'Multilíngue', 'CRM'],
      isActive: true,
      isFavorite: true,
      lastUsed: new Date()
    },
    {
      id: 'agent2',
      name: 'Analista de Dados',
      description: 'Processa e analisa conjuntos de dados, gerando insights e visualizações automaticamente.',
      type: 'function',
      model: 'gpt-4',
      tags: ['Análise', 'Dados', 'Visualização'],
      isActive: true,
      isFavorite: false,
      lastUsed: new Date(Date.now() - 86400000)
    },
    {
      id: 'agent3',
      name: 'Gerador de Conteúdo',
      description: 'Cria conteúdo para blogs, redes sociais e newsletters com base em tópicos e diretrizes.',
      type: 'assistant',
      model: 'claude-3',
      tags: ['Conteúdo', 'Marketing', 'Criativo'],
      isActive: false,
      isFavorite: false,
      lastUsed: new Date(Date.now() - 172800000)
    }
  ];

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agentes</h1>
        
        <button 
          onClick={() => window.location.href = '/agents/create'}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Criar Agente
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onEdit={(id) => window.location.href = `/agents/edit/${id}`}
            onDelete={(id) => console.log('Excluir agente:', id)}
            onView={(id) => window.location.href = `/agents/view/${id}`}
            onToggleActive={(id, active) => console.log('Alternar ativo:', id, active)}
            onToggleFavorite={(id, favorite) => console.log('Alternar favorito:', id, favorite)}
          />
        ))}
      </div>
    </div>
  );
}
