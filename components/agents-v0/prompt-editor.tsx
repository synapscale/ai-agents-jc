import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptEditor({ value, onChange }: PromptEditorProps) {
  const [activeTab, setActiveTab] = React.useState('editor');
  const [previewContent, setPreviewContent] = React.useState('');
  
  const handlePreview = () => {
    setPreviewContent(value);
    setActiveTab('preview');
  };
  
  const insertVariable = (variable: string) => {
    onChange(value + `{{${variable}}}`);
  };
  
  const insertTemplate = (template: string) => {
    onChange(template);
  };
  
  const templates = [
    {
      name: 'Assistente Básico',
      content: `Você é um assistente de IA útil e amigável. Responda às perguntas do usuário de forma clara e concisa.

Contexto: {{context}}

Instruções:
1. Seja educado e profissional
2. Forneça informações precisas
3. Admita quando não souber a resposta
4. Não invente informações`
    },
    {
      name: 'Especialista Técnico',
      content: `Você é um especialista técnico em {{domain}}. Forneça explicações detalhadas e precisas sobre tópicos técnicos.

Conhecimento: {{knowledge}}

Diretrizes:
- Use terminologia técnica apropriada
- Explique conceitos complexos de forma acessível
- Forneça exemplos práticos quando possível
- Cite fontes relevantes quando apropriado`
    },
    {
      name: 'Gerador de Conteúdo',
      content: `Você é um gerador de conteúdo especializado em criar {{content_type}} sobre {{topic}}.

Estilo: {{style}}
Público-alvo: {{audience}}
Comprimento: {{length}}

Requisitos:
- Seja criativo e original
- Adapte o tom ao público-alvo
- Estruture o conteúdo de forma lógica
- Inclua elementos envolventes`
    }
  ];
  
  const variables = [
    'user_name',
    'current_date',
    'context',
    'domain',
    'knowledge',
    'content_type',
    'topic',
    'style',
    'audience',
    'length'
  ];
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Visualização</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              Visualizar
            </Button>
          </div>
        </div>
        
        <TabsContent value="editor" className="space-y-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[400px] font-mono"
            placeholder="Digite o prompt do agente aqui..."
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Variáveis</h3>
              <div className="flex flex-wrap gap-2">
                {variables.map((variable) => (
                  <Button
                    key={variable}
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(variable)}
                  >
                    {variable}
                  </Button>
                ))}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Templates</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.name}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => insertTemplate(template.content)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="p-6 min-h-[400px] whitespace-pre-wrap">
            {previewContent || 'Nada para visualizar. Clique em "Visualizar" para ver o prompt formatado.'}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
