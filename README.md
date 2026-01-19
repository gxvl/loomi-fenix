# Nortus - Plataforma de Gestão para Consultores de Seguros

Uma plataforma completa desenvolvida para consultores de seguros gerenciarem clientes, visualizarem métricas e simularem planos de forma inteligente. O diferencial está na integração real com a API do Google Gemini, que funciona como um assistente virtual genuíno para auxiliar nas negociações e propostas.

## Stack Tecnológico

O projeto foi construído com Next.js 14 usando App Router e TypeScript. Para gerenciamento de estado assíncrono, utilizei TanStack Query v5 que facilita bastante o cache e sincronização com a API. Os formulários são validados com React Hook Form + Zod, e a estilização é toda feita com Tailwind CSS junto com alguns componentes do Shadcn/ui.

A parte mais interessante tecnicamente é a integração com o Google Gemini AI SDK - não é um mock, é a API real rodando. Criei um hook customizado que gerencia todo o contexto da conversa e permite que a IA realmente entenda o histórico completo do chat.

Para visualização de dados, usei ApexCharts que se comporta muito bem com React e permite customizações bem detalhadas nos gráficos.

## Rodando Localmente

Você vai precisar do Bun instalado (ou npm/yarn se preferir). Clone o repositório e instale as dependências:

```bash
bun install
```

Configure as variáveis de ambiente criando um arquivo `.env` na raiz:

```env
NEXT_PUBLIC_API_URL=https://nortus-challenge.api.stage.loomi.com.br
NEXT_PUBLIC_API_AI=sua_chave_api_gemini_aqui
```

A chave da API do Gemini você consegue no Google AI Studio (https://aistudio.google.com/app/apikey). É gratuito para começar.

Depois é só rodar:

```bash
bun dev
```

A aplicação estará disponível em `http://localhost:3000`. Vai redirecionar automaticamente para `/login`.

## Estrutura do Projeto

Organizei tudo seguindo as convenções do Next.js 14 com App Router. Os principais diretórios são:

**`src/app`** - Rotas da aplicação. Separei em `(authenticated)` para páginas protegidas e `(public)` para login. Dentro de authenticated tem dashboard, chat, simulator, tickets e account.

**`src/components`** - Componentes React reutilizáveis. Cada componente tem sua pasta com o arquivo principal e tipos quando necessário. Evitei colocar muita lógica dentro dos componentes, preferindo extrair para hooks.

**`src/hooks`** - Hooks customizados. Os mais importantes são os da pasta `queries/` que usam React Query, e o `useGeminiChat.tsx` que gerencia toda a integração com a IA.

**`src/services`** - Camada de comunicação com APIs. Cada service tem suas funções que retornam promessas tipadas. O `api.ts` configura a instância do Axios com interceptors.

**`src/common/entities`** - Tipos e interfaces TypeScript que representam os dados que vêm da API. Mantém tudo consistente e tipado.

**`src/validations`** - Schemas do Zod para validação de formulários.

## Features Principais

O **Dashboard** mostra métricas em tempo real com gráficos interativos. Implementei uma funcionalidade onde o gráfico de conversão mostra apenas 6 meses por vez, e ao clicar na seta você vê os próximos 6. Os gráficos têm gradientes customizados e tooltips formatados.

No **Chat com IA**, a integração com Gemini é real e funcional. O assistente mantém contexto da conversa e responde baseado no histórico completo. Implementei parsing de markdown nas respostas para formatar negrito, listas e code blocks. Os botões de ação ("Enviar proposta", "Fazer ligação") também interagem com a IA de forma contextual.

O **Simulador de Planos** é totalmente interativo. Você seleciona um plano, ajusta valor do veículo e idade do cliente nos sliders, marca coberturas adicionais, e o preço final é calculado em tempo real. A lógica considera multiplicadores de risco por faixa etária e proporcionalidade ao valor do veículo.

A página de **Tickets** lista todos os chamados com filtros e busca. Implementei uma modal de edição que permite atualizar status e prioridade.

A **Gestão de Clientes Ativos** tem uma tabela com paginação, ordenação e filtros múltiplos (status, tipo de seguro, localização). A tabela é responsiva e funciona bem em mobile.

## Responsividade

Todo o layout foi pensado para funcionar de desktop até mobile. Usei breakpoints do Tailwind (md: 768px, xl: 1280px) para adaptar componentes. Por exemplo, em telas menores que 1280px os cards de KPI e conversão ficam empilhados verticalmente, e os botões de filtro diminuem de tamanho.

Os gráficos se ajustam automaticamente, e implementei lógica específica para que o seletor de KPIs no dashboard fique embaixo do título em mobile ao invés de ao lado.

## Autenticação

O sistema de login salva o token em cookies (com 7 dias de validade e flag SameSite=Strict) e as informações do usuário no localStorage. O logout limpa tudo - cookies, localStorage e sessionStorage - antes de redirecionar.

Não implementei proteção de rotas com middleware porque o foco do desafio era nas features, mas em produção seria essencial adicionar isso.

## Performance e Otimizações

Usei dynamic imports para o ApexCharts já que é uma lib pesada e só precisa rodar no cliente. O React Query cuida do cache automaticamente, então chamadas repetidas não batem na API desnecessariamente.

Os componentes estão estruturados para evitar re-renders desnecessários, principalmente no simulador onde há vários estados sendo atualizados.

Desenvolvido como desafio técnico Loomi! 💜
