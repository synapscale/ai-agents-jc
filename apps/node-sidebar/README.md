# Canvas E Agentes - Plataforma de Fluxo Visual

## Visão Geral

Canvas E Agentes é uma plataforma de fluxo visual que permite criar, conectar e gerenciar nós em um canvas interativo. A plataforma é projetada para ser extensível, permitindo a criação de nós personalizados, integração com IA e compartilhamento através de um marketplace.

## Estrutura do Projeto

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

\`\`\`
├── app/                  # Rotas e páginas da aplicação
├── components/           # Componentes reutilizáveis
│   ├── canvas/           # Componentes relacionados ao canvas
│   ├── marketplace/      # Componentes do marketplace
│   ├── node-sidebar/     # Componentes da barra lateral de nós
│   └── ui/               # Componentes de UI genéricos
├── contexts/             # Contextos React para gerenciamento de estado
├── hooks/                # Hooks personalizados
├── services/             # Serviços para interação com APIs
├── stores/               # Stores para gerenciamento de estado global
└── types/                # Definições de tipos TypeScript
\`\`\`

## Estrutura de pastas do projeto

- `app/` — Rotas e páginas do Next.js
- `components/` — Componentes exclusivos deste app
- `hooks/` — Hooks customizados deste app
- `lib/` — Funções utilitárias e integrações deste app
- `contexts/` — Contextos React exclusivos deste app
- `services/` — Serviços de API ou lógica de negócio
- `stores/` — Gerenciamento de estado (ex: Zustand, Redux)
- `types/` — Tipos TypeScript exclusivos deste app
- `styles/` — Estilos globais e temas
- `public/` — Arquivos estáticos
- `docs/` — Documentação específica do app

## Dicas
- Use `@shared` para importar recursos compartilhados.
- Mantenha o que for exclusivo do app dentro dessas pastas.
- Consulte o README na raiz para mais informações.

## Principais Funcionalidades

### Canvas Interativo
- Arrastar e soltar nós
- Conectar nós através de portas de entrada e saída
- Selecionar e editar nós
- Desfazer/refazer ações
- Temas personalizáveis

### Biblioteca de Nós
- Categorias de nós pré-definidas
- Criação de nós personalizados
- Importação/exportação de nós
- Busca e filtragem

### Marketplace
- Compartilhamento de nós e skills
- Coleções temáticas
- Sistema de avaliação
- Importação direta para o projeto

## Guia de Desenvolvimento

### Convenções de Código

1. **Nomenclatura**:
   - Componentes: PascalCase (ex: `NodeSidebar`)
   - Hooks: camelCase com prefixo "use" (ex: `useNodeOperations`)
   - Funções: camelCase (ex: `handleNodeClick`)
   - Variáveis: camelCase (ex: `selectedNode`)
   - Tipos/Interfaces: PascalCase (ex: `NodeProps`)

2. **Estrutura de Componentes**:
   - Cada componente em seu próprio arquivo
   - Comentários JSDoc descrevendo o componente
   - Props tipadas com interfaces
   - Funções auxiliares dentro do componente

3. **Tipagem**:
   - Usar TypeScript para todos os arquivos
   - Definir interfaces para props de componentes
   - Evitar uso de `any`
   - Usar tipos genéricos quando apropriado

### Adicionando Novos Componentes

1. Criar o arquivo do componente na pasta apropriada
2. Definir a interface de props com JSDoc
3. Implementar o componente com comentários explicativos
4. Exportar o componente como default ou named export
5. Adicionar testes se necessário

### Trabalhando com o Canvas

O canvas utiliza um sistema de coordenadas para posicionar os nós:

\`\`\`tsx
// Exemplo de adição de um nó ao canvas
const handleAddNode = (node, position) => {
  addCanvasNode(node, { x: position.x, y: position.y });
};
\`\`\`

### Criando Novos Tipos de Nós

Para adicionar um novo tipo de nó:

1. Adicionar a definição do tipo em `types/node-types.ts`
2. Definir as portas de entrada e saída
3. Configurar as propriedades padrão
4. Adicionar à categoria apropriada

\`\`\`tsx
// Exemplo de definição de um novo tipo de nó
const newNodeType: NodeTypeDefinition = {
  id: "my-node",
  name: "Meu Nó",
  category: "data-transformation",
  description: "Descrição do meu nó",
  icon: "Settings",
  color: "blue",
  inputs: [
    {
      id: "input1",
      type: "input",
      name: "Entrada",
      dataType: "string",
      required: true,
    },
  ],
  outputs: [
    {
      id: "output1",
      type: "output",
      name: "Saída",
      dataType: "string",
    },
  ],
  properties: {
    // Propriedades configuráveis
  },
};
\`\`\`

## Boas Práticas para IA

Este projeto foi otimizado para ser "AI-friendly", facilitando a análise e assistência por ferramentas de IA. Seguimos estas práticas:

1. **Comentários Descritivos**: Cada componente, função e bloco importante tem comentários explicando seu propósito e funcionamento.

2. **Tipagem Explícita**: Usamos TypeScript com interfaces detalhadas para garantir que a IA entenda a estrutura de dados.

3. **Nomes Significativos**: Variáveis, funções e componentes têm nomes descritivos que explicam claramente seu propósito.

4. **Documentação JSDoc**: Componentes e funções importantes têm documentação JSDoc completa, incluindo descrições de parâmetros e exemplos de uso.

5. **Modularização**: O código é organizado em módulos coesos com responsabilidades claras.

6. **Padrões Consistentes**: Seguimos padrões consistentes em todo o código para facilitar a compreensão.

7. **Separação de Preocupações**: Lógica de negócios, UI e gerenciamento de estado são claramente separados.

### Exemplo de Componente AI-Friendly

\`\`\`tsx
/**
 * Componente NodePort
 * 
 * Representa uma porta de entrada ou saída em um nó do canvas.
 * Permite conexões com outras portas.
 * 
 * @param props - Propriedades do componente
 * @returns Componente React
 */
export function NodePort({ 
  nodeId, 
  port, 
  onConnect 
}: NodePortProps) {
  // Implementação...
}
\`\`\`

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
\`\`\`

## 6. Criando um arquivo de documentação para o contexto do tema
