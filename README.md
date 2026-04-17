# The Library of Alexandria SPA

Aplicação de Página Única (SPA) para exploração de catálogo, visualização de detalhes de livros, autenticação de usuários e gerenciamento local de empréstimos e lista de desejos. O projeto foi construído com React, TypeScript e Vite, consumindo dados da Open Library API e usando Clerk para autenticação.

## Visão Geral

Este repositório implementa uma biblioteca universitária digital com foco em:

- busca e navegação de livros
- filtros e paginação
- página de detalhes com descrição sanitizada
- empréstimos simulados com persistência local
- wishlist protegida por autenticação
- tema claro/escuro
- carregamento assíncrono e otimizações de performance

## Link Ao Vivo

- Produção: não configurado ainda

## Stack Tecnológica

- React 19
- TypeScript
- Vite 8
- React Router DOM 7
- TanStack Query 5
- Zustand 5
- Clerk
- CSS Modules
- Vitest + Testing Library
- ESLint

## Funcionalidades Principais

- Catálogo com busca por título, autor ou ISBN
- Filtros por categoria, autor e ordenação
- Paginação de resultados
- Página de detalhes com capa, autores, ano, assuntos e descrição
- Adição e remoção de livros da wishlist
- Empréstimos locais com prazo de devolução e status
- Rotas protegidas para áreas do usuário
- Alternância entre tema claro e escuro
- Páginas legais de Termos e Privacidade

## Arquitetura Do Projeto

O projeto segue uma organização por responsabilidade, com destaque para:

- `src/features`: páginas e fluxos de negócio (`catalog`, `book-details`, `loans`, `wishlist`, `auth`, `legal`)
- `src/components`: componentes reutilizáveis de layout, autenticação, livros e UI base
- `src/hooks`: hooks para busca, detalhes, debounce, wishlist e persistência local
- `src/services/api`: integração com a Open Library API
- `src/stores`: estado global do usuário com Zustand e persistência em `localStorage`
- `src/contexts`: contexto de tema
- `src/utils`: utilitários de datas, empréstimos, sanitização e constantes

## Fluxo Da Aplicação

1. O usuário acessa o catálogo na rota `/`.
2. A busca é debounced antes de acionar a API pública.
3. Os resultados são cacheados com TanStack Query.
4. Ao abrir `/book/:id`, a aplicação busca detalhes da obra na Open Library.
5. Wishlist e empréstimos são persistidos localmente via Zustand.
6. As rotas `/wishlist` e `/my-loans` exigem autenticação com Clerk.

## Rotas

- `/`: catálogo principal
- `/book/:id`: detalhes do livro
- `/sign-in/*`: autenticação
- `/sign-up/*`: cadastro
- `/wishlist`: lista de desejos protegida
- `/my-loans`: empréstimos protegidos
- `/terms`: termos de uso
- `/privacy`: política de privacidade

## Integrações Externas

### Open Library API

- Base principal: `https://openlibrary.org`
- Capas: `https://covers.openlibrary.org/b`
- Não requer chave de API neste projeto

### Clerk

- Usado para autenticação e proteção de rotas
- Requer configuração da chave pública no ambiente

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

## Configuração Do Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
```

Observações:

- sem essa variável, o app usa um placeholder e a autenticação real não ficará funcional
- a Open Library API já está configurada no código e não exige variável adicional

## Como Executar

```bash
npm install
npm run dev
```

Depois, abra a URL informada pelo Vite no navegador, normalmente `http://localhost:5173`.

## Scripts Disponíveis

```bash
npm run dev        # inicia o servidor de desenvolvimento
npm run build      # valida TypeScript e gera build de produção
npm run preview    # serve o build gerado localmente
npm run lint       # executa o ESLint
npm run test       # inicia o Vitest em modo watch
npm run test:ui    # abre a interface do Vitest
npm run test:run   # executa os testes uma vez
npm run audit      # executa npm audit
```

## Testes

O projeto já possui testes unitários em áreas utilitárias e hooks, incluindo exemplos como:

- `src/hooks/useDebounce.test.ts`
- `src/utils/date.test.ts`
- `src/utils/bookKey.test.ts`

Para rodar tudo:

```bash
npm run test:run
```

## Decisões Técnicas Relevantes

- `React.lazy` e `Suspense` são usados para code splitting das páginas
- `TanStack Query` faz cache de buscas e evita refetch desnecessário
- `Zustand` persiste wishlist, empréstimos e status de leitura em `localStorage`
- a busca tem debounce de `400ms`
- a integração com Open Library implementa controle básico de rajada e cache LRU para autores
- descrições de livros passam por sanitização antes de renderização
- o servidor Vite injeta cabeçalho de `Content-Security-Policy` para `worker-src`

## Estrutura Resumida

```text
src/
  components/
  contexts/
  features/
  hooks/
  services/
  stores/
  styles/
  test/
  types/
  utils/
```

## Limitações Atuais

- empréstimos e wishlist são persistidos localmente, não em backend 
- a disponibilidade dos livros é simulada a partir do fluxo local do app

## Melhorias Futuras

- persistência em backend real
- perfil de usuário completo
- reservas e devoluções sincronizadas
- observabilidade e métricas
- pipeline de deploy contínuo

## Licença E Contexto

Projeto acadêmico de SPA para biblioteca universitária, Jala University - 2026.

