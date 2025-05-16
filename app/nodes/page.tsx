import React from 'react';
import { NodeCategory } from '@/components/nodes-v0/node-category';

export default function NodesPage() {
  return (
    <div className="container py-6">
      <NodeCategory 
        onSelectTemplate={(templateId) => {
          console.log('Selecionado template:', templateId);
          // Em um cenário real, abriria detalhes do template
        }}
        onInstallTemplate={(templateId) => {
          console.log('Instalando template:', templateId);
          // Em um cenário real, instalaria o template
        }}
      />
    </div>
  );
}
