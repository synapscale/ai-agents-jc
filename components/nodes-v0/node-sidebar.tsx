import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';

interface NodeSidebarProps {
  onSelectNode: (nodeType: string, category: string) => void;
  onSearch: (query: string) => void;
}

export function NodeSidebar({ onSelectNode, onSearch }: NodeSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const categories = [
    { id: 'entrada', name: 'Entrada de Dados', icon: '📥' },
    { id: 'transformacao', name: 'Transformação de Dados', icon: '🔄' },
    { id: 'fluxo', name: 'Fluxo de Controle', icon: '🔀' },
    { id: 'saida', name: 'Saída de Dados', icon: '📤' },
    { id: 'ui', name: 'Elementos de UI', icon: '🖼️' },
    { id: 'ia', name: 'Inteligência Artificial', icon: '🧠' },
    { id: 'acao', name: 'Ação em Aplicativo', icon: '🔧' },
    { id: 'core', name: 'Core', icon: '⚙️' },
    { id: 'interacao', name: 'Interação Humana', icon: '👤' },
    { id: 'gatilhos', name: 'Gatilhos', icon: '⚡' }
  ];
  
  const nodesByCategory = {
    'entrada': [
      { id: 'file-input', name: 'Entrada de Arquivo', description: 'Carrega dados de um arquivo' },
      { id: 'text-input', name: 'Entrada de Texto', description: 'Entrada de texto manual' },
      { id: 'api-input', name: 'Entrada de API', description: 'Obtém dados de uma API externa' }
    ],
    'transformacao': [
      { id: 'text-transform', name: 'Transformação de Texto', description: 'Manipula e transforma texto' },
      { id: 'data-filter', name: 'Filtro de Dados', description: 'Filtra dados com base em critérios' },
      { id: 'data-merge', name: 'Mesclagem de Dados', description: 'Combina múltiplas fontes de dados' }
    ],
    'fluxo': [
      { id: 'condition', name: 'Condição', description: 'Executa lógica condicional' },
      { id: 'loop', name: 'Loop', description: 'Repete operações em uma coleção' },
      { id: 'switch', name: 'Switch', description: 'Direciona fluxo com base em múltiplas condições' }
    ],
    'saida': [
      { id: 'file-output', name: 'Saída para Arquivo', description: 'Salva dados em um arquivo' },
      { id: 'visualization', name: 'Visualização', description: 'Cria visualizações de dados' },
      { id: 'api-output', name: 'Saída para API', description: 'Envia dados para uma API externa' }
    ],
    'ui': [
      { id: 'form', name: 'Formulário', description: 'Cria formulários interativos' },
      { id: 'chart', name: 'Gráfico', description: 'Exibe dados em formato gráfico' },
      { id: 'table', name: 'Tabela', description: 'Exibe dados em formato tabular' }
    ],
    'ia': [
      { id: 'text-generation', name: 'Geração de Texto', description: 'Gera texto com IA' },
      { id: 'classification', name: 'Classificação', description: 'Classifica dados com IA' },
      { id: 'sentiment-analysis', name: 'Análise de Sentimento', description: 'Analisa sentimento de texto' }
    ],
    'acao': [
      { id: 'email-send', name: 'Envio de Email', description: 'Envia emails automaticamente' },
      { id: 'notification', name: 'Notificação', description: 'Envia notificações' },
      { id: 'webhook', name: 'Webhook', description: 'Aciona webhooks externos' }
    ],
    'core': [
      { id: 'variable', name: 'Variável', description: 'Armazena e gerencia variáveis' },
      { id: 'function', name: 'Função', description: 'Define funções reutilizáveis' },
      { id: 'timer', name: 'Temporizador', description: 'Controla operações baseadas em tempo' }
    ],
    'interacao': [
      { id: 'user-input', name: 'Entrada do Usuário', description: 'Solicita entrada do usuário' },
      { id: 'confirmation', name: 'Confirmação', description: 'Solicita confirmação do usuário' },
      { id: 'feedback', name: 'Feedback', description: 'Coleta feedback do usuário' }
    ],
    'gatilhos': [
      { id: 'schedule', name: 'Agendamento', description: 'Executa em horários programados' },
      { id: 'event', name: 'Evento', description: 'Responde a eventos do sistema' },
      { id: 'webhook-trigger', name: 'Gatilho de Webhook', description: 'Responde a webhooks recebidos' }
    ]
  };
  
  const allNodes = Object.values(nodesByCategory).flat();
  
  const displayNodes = activeCategory === 'all' 
    ? allNodes 
    : nodesByCategory[activeCategory as keyof typeof nodesByCategory] || [];
  
  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium mb-4">Nodes</h2>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar nodes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">Categorias</h3>
          
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Nodes</h3>
            <Button variant="ghost" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {displayNodes.map((node) => (
              <Card
                key={node.id}
                className="p-3 cursor-pointer hover:bg-accent"
                onClick={() => onSelectNode(node.id, activeCategory)}
              >
                <div className="font-medium">{node.name}</div>
                <div className="text-xs text-muted-foreground">{node.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full" onClick={() => {}}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Criar Node Personalizado
        </Button>
      </div>
    </div>
  );
}
