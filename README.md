<h1 align="center">
  AutoGest
</h1>

<!-- Screenshots section -->
<!-- <p align="center">
  <img alt="AutoGest Demo" src=".github/demo.gif" width="100%">
</p> -->

## Sobre o Projeto

AutoGest é um sistema de gestão completo para oficinas mecânicas e autocentros, desenvolvido com Next.js 15 e arquitetura moderna. O sistema oferece controle integrado de agendamentos, clientes, veículos, serviços, produtos e funcionários, com dashboard analítico que fornece métricas de receita, comparativos mensais e visualização gráfica de desempenho. Inclui autenticação segura via Clerk, banco de dados PostgreSQL com Prisma ORM, e interface responsiva construída com Tailwind CSS e Shadcn UI.

---

## Funcionalidades

- **Gestão de Agendamentos** - Controle completo de serviços agendados com status, datas e funcionários responsáveis
- **Cadastro de Clientes e Veículos** - Gerenciamento integrado de clientes com seus respectivos veículos
- **Controle de Estoque** - Sistema de produtos com categorias, estoque mínimo/máximo e fornecedores
- **Dashboard Analítico** - Métricas de receita mensal, comparativos percentuais e gráficos de desempenho
- **Gestão de Serviços** - Catálogo de serviços com precificação e vínculo aos agendamentos
- **Comissões de Funcionários** - Cálculo e visualização de comissões por agendamento
- **Autenticação Segura** - Sistema de login e controle de acesso via Clerk
- **Interface Responsiva** - Design moderno adaptável a diferentes dispositivos

---

## Tecnologias

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Server Components
- **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn UI](https://ui.shadcn.com/)** - Componentes acessíveis e customizáveis
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento performático de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones

### Backend
- **[Prisma ORM](https://www.prisma.io/)** - ORM type-safe para Node.js e TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Clerk](https://clerk.com/)** - Plataforma de autenticação e gerenciamento de usuários
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Server-side data fetching e mutations

### DevOps & Ferramentas
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados
- **[Yarn](https://yarnpkg.com/)** - Gerenciador de dependências
- **[Husky](https://typicode.github.io/husky/)** - Git hooks para qualidade de código
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código

---

## Estrutura do Projeto

```
auto-gest/
├── app/
│   ├── (app)/
│   │   ├── dashboard/           # Dashboard com métricas e gráficos
│   │   ├── schedule/            # Gestão de agendamentos
│   │   ├── client/              # Cadastro de clientes
│   │   ├── vehicle/             # Cadastro de veículos
│   │   ├── service/             # Catálogo de serviços
│   │   ├── product/             # Controle de produtos
│   │   ├── category-product/    # Categorias de produtos
│   │   ├── employer/            # Cadastro de funcionários
│   │   └── employer-commission/ # Comissões de funcionários
│   ├── _components/             # Componentes reutilizáveis
│   │   ├── ui/                  # Componentes Shadcn UI
│   │   ├── table/               # Componentes de tabela
│   │   └── inputs/              # Componentes de entrada
│   ├── _data/                   # Camada de acesso a dados
│   ├── _hooks/                  # Custom React hooks
│   ├── _lib/                    # Utilitários e configurações
│   └── _utils/                  # Funções auxiliares
├── prisma/
│   ├── schema.prisma            # Schema do banco de dados
│   ├── migrations/              # Migrações do banco
│   └── seed.ts                  # Script de seed
└── public/                      # Arquivos estáticos
```

---

## English Version

### About

AutoGest is a comprehensive management system for auto repair shops and service centers, built with Next.js 15 and modern architecture. The system provides integrated control of schedules, clients, vehicles, services, products, and employees, featuring an analytical dashboard with revenue metrics, monthly comparisons, and performance visualization. It includes secure authentication via Clerk, PostgreSQL database with Prisma ORM, and responsive interface built with Tailwind CSS and Shadcn UI.

### Features

- **Schedule Management** - Complete control of scheduled services with status tracking, dates, and assigned employees
- **Client & Vehicle Registry** - Integrated management of clients with their respective vehicles
- **Inventory Control** - Product system with categories, min/max stock levels, and suppliers
- **Analytical Dashboard** - Monthly revenue metrics, percentage comparisons, and performance charts
- **Service Management** - Service catalog with pricing and schedule linking
- **Employee Commissions** - Commission calculation and visualization per schedule
- **Secure Authentication** - Login system and access control via Clerk
- **Responsive Interface** - Modern design adaptable to different devices

### Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI, Recharts, React Hook Form, Zod, Lucide React

**Backend:** Prisma ORM, PostgreSQL, Clerk, Next.js API Routes

**DevOps:** Docker, Yarn, Husky, ESLint, Prettier
