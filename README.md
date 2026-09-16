# Quanto valia?

Calculadora de poder de compra no Brasil, com comparação de preços, salário mínimo e inflação entre 1994 e 2026.

## Funcionalidades

- Comparação entre dois anos e preços informados pelo usuário.
- Seleção de produtos predefinidos.
- Indicadores de percentual do salário, unidades compráveis e horas de trabalho.
- Correção por índice IPCA, gráficos de evolução e tabela histórica.
- Informações sobre os presidentes de cada período.

## Tecnologias

React 19, TypeScript, Vite 6, Tailwind CSS 4, Recharts e Lucide.

## Desenvolvimento

Requisitos: Node.js 22 e Bun.

```bash
git clone https://github.com/git-duda/quanto-valia.git
cd quanto-valia
bun install --frozen-lockfile
bun run dev
```

Abra http://localhost:3000.

```bash
bun run typecheck
bun run build
bun run preview
```

O build gera arquivos estáticos na pasta `dist/`.

## Dados

As séries, preços e descrições estão em `src/data/`; os cálculos ficam em `src/utils/calculations.ts`. Os dados são locais e foram preservados do projeto original. A aplicação não consulta IBGE, DIEESE ou outras fontes em tempo real. A migração do código não inclui auditoria dos valores e das atribuições de fonte, inclusive dos dados de 2026.

Não são necessárias chaves de API, variáveis de ambiente, banco de dados ou serviços de inteligência artificial.

## Publicação na Vercel

Importe este repositório com o preset **Vite**, usando a raiz do projeto. O arquivo `vercel.json` define a instalação, o build e a pasta `dist`.

Para publicar novos commits automaticamente, conecte o repositório nas configurações Git do projeto Vercel e selecione `main` como branch de produção. Uma publicação direta de arquivos não configura essa integração por si só.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `src/App.tsx` | Estado e composição da aplicação |
| `src/components/` | Formulário, indicadores, gráficos e tabelas |
| `src/data/` | Séries históricas e produtos |
| `src/utils/` | Cálculos e formatação |
| `public/presidents/` | Imagens utilizadas na interface |

Os avisos de licença presentes no código original foram preservados.
