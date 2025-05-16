import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptEditor } from './prompt-editor';

interface AgentFormProps {
  agent?: {
    id: string;
    name: string;
    description: string;
    model: string;
    type: string;
    prompt: string;
    parameters: Record<string, any>;
    connections: Array<{id: string, name: string, type: string}>;
    tags: string[];
  };
  onSave: (agent: any) => void;
  onCancel: () => void;
}

export function AgentForm({ agent, onSave, onCancel }: AgentFormProps) {
  const [currentTab, setCurrentTab] = React.useState('basic');
  const [formData, setFormData] = React.useState(agent || {
    id: '',
    name: '',
    description: '',
    model: 'gpt-4o',
    type: 'assistant',
    prompt: '',
    parameters: {},
    connections: [],
    tags: []
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  
  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };
  
  const handleSave = () => {
    onSave(formData);
    setHasUnsavedChanges(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {agent ? 'Editar Agente' : 'Novo Agente'}
        </h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            Salvar
          </Button>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 pt-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => updateFormData('type', e.target.value)}
                  >
                    <option value="assistant">Assistente</option>
                    <option value="function">Função</option>
                    <option value="tool">Ferramenta</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Modelo</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.model}
                  onChange={(e) => updateFormData('model', e.target.value)}
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => updateFormData('tags', formData.tags.filter((_, i) => i !== index))}
                      >
                        <span>×</span>
                      </Button>
                    </Badge>
                  ))}
                  <input
                    type="text"
                    className="p-1 border rounded-md text-sm"
                    placeholder="Adicionar tag..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        updateFormData('tags', [...formData.tags, e.currentTarget.value]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4 pt-4">
          <Card className="p-6">
            <PromptEditor
              value={formData.prompt}
              onChange={(value) => updateFormData('prompt', value)}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="parameters" className="space-y-4 pt-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperatura</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full"
                    value={formData.parameters.temperature || 0.7}
                    onChange={(e) => updateFormData('parameters', {
                      ...formData.parameters,
                      temperature: parseFloat(e.target.value)
                    })}
                  />
                  <div className="text-sm text-right">
                    {formData.parameters.temperature || 0.7}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Top P</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full"
                    value={formData.parameters.top_p || 0.9}
                    onChange={(e) => updateFormData('parameters', {
                      ...formData.parameters,
                      top_p: parseFloat(e.target.value)
                    })}
                  />
                  <div className="text-sm text-right">
                    {formData.parameters.top_p || 0.9}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Máximo de Tokens</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={formData.parameters.max_tokens || 2048}
                    onChange={(e) => updateFormData('parameters', {
                      ...formData.parameters,
                      max_tokens: parseInt(e.target.value)
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Presença de Penalidade</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    className="w-full"
                    value={formData.parameters.presence_penalty || 0}
                    onChange={(e) => updateFormData('parameters', {
                      ...formData.parameters,
                      presence_penalty: parseFloat(e.target.value)
                    })}
                  />
                  <div className="text-sm text-right">
                    {formData.parameters.presence_penalty || 0}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-4 pt-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Conexões</h3>
                <Button variant="outline">Adicionar Conexão</Button>
              </div>
              
              {formData.connections.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  Nenhuma conexão configurada
                </div>
              ) : (
                <div className="space-y-2">
                  {formData.connections.map((connection, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{connection.name}</div>
                        <div className="text-sm text-muted-foreground">{connection.type}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateFormData('connections', formData.connections.filter((_, i) => i !== index))}
                      >
                        <span>×</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
