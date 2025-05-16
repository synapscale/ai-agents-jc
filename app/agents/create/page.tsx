import React from 'react';
import { AgentForm } from '@/components/agents-v0/agent-form';

export default function CreateAgentPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Criar Novo Agente</h1>
      
      <AgentForm 
        onSave={(data) => {
          console.log('Salvando agente:', data);
          // Em um cenário real, enviaria para a API
          window.location.href = '/agents';
        }}
        onCancel={() => {
          window.location.href = '/agents';
        }}
      />
    </div>
  );
}
