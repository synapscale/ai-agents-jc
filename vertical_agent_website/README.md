# Site do Agente Vertical AI

Este projeto contém o código-fonte para o site do Agente Vertical AI, que inclui uma seção de documentação e uma interface de chat interativa.

## Estrutura do Projeto

-   `/frontend`: Contém a aplicação Next.js para a interface do usuário (documentação e chat).
-   `/api`: Contém as funções serverless Python (Flask) que servem como backend para o chat, integrando-se com o `MainAgent`.
-   `/content/docs`: Arquivos Markdown da documentação.
-   `vercel.json`: Configuração de build e roteamento para a Vercel.

## Pré-requisitos

-   Node.js (versão recomendada pelo Next.js)
-   pnpm (gerenciador de pacotes usado no frontend)
-   Python (versão 3.9+ para as funções serverless)
-   Conta na Vercel para implantação.
-   Credenciais para os serviços utilizados pelo agente (OpenAI, Google Gemini, Anthropic Claude, Groq, Hugging Face Hub, Redis, Supabase).

## Configuração do Ambiente Local (para Desenvolvimento e Teste)

1.  **Clonar o Repositório (se aplicável) ou Descompactar o Projeto.**

2.  **Configurar o Frontend:**
    ```bash
    cd frontend
    pnpm install
    ```

3.  **Configurar o Backend (Funções Serverless Python):**
    -   Crie um ambiente virtual Python na raiz do projeto ou dentro da pasta `api`:
        ```bash
        python -m venv .venv
        source .venv/bin/activate  # Linux/macOS
        # .venv\Scripts\activate    # Windows
        ```
    -   Instale as dependências Python:
        ```bash
        pip install -r api/requirements.txt
        ```

4.  **Variáveis de Ambiente:**
    -   O backend (`api/chat.py`) e o agente (`api/agent_src/`) dependem de variáveis de ambiente para as API keys e configurações de serviços (Redis, Supabase, LLMs).
    -   Para desenvolvimento local, crie um arquivo `.env` na raiz do projeto `vertical_agent_website` (ou configure-as diretamente no seu sistema). O `agent_src` utiliza `python-dotenv` para carregar variáveis de um arquivo `.env` localizado na raiz de execução do agente (que, no contexto da API, é `api/agent_src`).
    -   Exemplo de variáveis necessárias (consulte `my_vertical_agent/config/.env.example` do template original para a lista completa):
        ```
        OPENAI_API_KEY="sk-..."
        GOOGLE_API_KEY="AIza..."
        ANTHROPIC_API_KEY="sk-ant-..."
        GROQ_API_KEY="gsk_..."
        HUGGINGFACE_API_KEY="hf_..."
        REDIS_HOST="localhost"
        REDIS_PORT="6379"
        REDIS_PASSWORD="your_redis_password_or_empty"
        REDIS_CHAT_HISTORY_KEY_PREFIX="chat_history:"
        SUPABASE_URL="https://your-project.supabase.co"
        SUPABASE_KEY="your-supabase-anon-key"
        EMBEDDINGS_MODEL_NAME="text-embedding-ada-002"
        # ...e outras configurações específicas dos LLMs e do agente.
        ```

5.  **Executar Localmente com `vercel dev`:**
    -   Instale a Vercel CLI: `npm install -g vercel`
    -   Na raiz do projeto `vertical_agent_website`, execute:
        ```bash
        vercel dev
        ```
    -   Isso iniciará o frontend Next.js e as funções serverless Python simultaneamente, simulando o ambiente da Vercel.
    -   Acesse o site em `http://localhost:3000` (ou a porta indicada pelo `vercel dev`).

## Implantação na Vercel

1.  **Repositório Git:**
    -   Certifique-se de que seu projeto está em um repositório Git (GitHub, GitLab, Bitbucket).

2.  **Conectar à Vercel:**
    -   Acesse sua conta Vercel e crie um novo projeto.
    -   Importe o repositório Git.

3.  **Configurações do Projeto na Vercel:**
    -   **Framework Preset:** Vercel deve detectar Next.js automaticamente para o frontend.
    -   **Build and Output Settings:**
        -   Geralmente, as configurações padrão do Next.js funcionam. O `vercel.json` fornecido ajuda a Vercel a entender a estrutura monorepo com o backend Python.
        -   Verifique se o "Root Directory" está configurado corretamente (deve ser a raiz do projeto `vertical_agent_website` se o `vercel.json` estiver lá).
    -   **Environment Variables:**
        -   Configure todas as variáveis de ambiente necessárias (API keys, Redis, Supabase, etc.) nas configurações do projeto na Vercel. Estas são as mesmas variáveis que você usaria localmente no seu `.env`.
        -   **IMPORTANTE:** Sem essas variáveis, o agente no backend não funcionará.

4.  **Deploy:**
    -   Inicie o deploy através da interface da Vercel.
    -   A Vercel instalará as dependências do `frontend` (usando `pnpm install` se `pnpm-lock.yaml` estiver presente) e do `api` (usando `pip install -r api/requirements.txt`).

5.  **Testar:**
    -   Após o deploy bem-sucedido, acesse a URL pública fornecida pela Vercel e teste todas as funcionalidades (documentação e chat interativo).

## Solução de Problemas Comuns na Vercel

-   **Erros de Importação no Backend Python:** Verifique se o `sys.path` está configurado corretamente em `api/chat.py` para encontrar os módulos do `agent_src`. Os logs da função na Vercel são essenciais para depuração.
-   **Timeout de Funções Serverless:** Funções na Vercel têm limites de execução. Se o agente demorar muito para responder, pode ocorrer timeout. Otimize a performance do agente ou considere estratégias para respostas assíncronas se necessário.
-   **Variáveis de Ambiente Não Encontradas:** Confirme se todas as variáveis foram adicionadas corretamente no painel da Vercel e se os nomes correspondem exatamente ao esperado pelo código.
-   **Problemas de CORS:** O `Flask-CORS(app)` em `api/chat.py` deve permitir requisições do domínio do seu frontend na Vercel. Se houver problemas, pode ser necessário ajustar a configuração do CORS.
-   **Caminhos de Arquivo:** Funções serverless têm um sistema de arquivos efêmero. O agente não deve depender de salvar arquivos localmente de forma persistente entre invocações. Use serviços externos como Redis ou Supabase para persistência.

Lembre-se de que o `MainAgent` e seus subcomponentes foram projetados para serem configuráveis e podem precisar de ajustes finos nos arquivos YAML de configuração (dentro de `api/agent_src/agents/...`) para otimizar o comportamento para casos de uso específicos ou diferentes modelos LLM.

