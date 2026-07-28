# BioPaper AI

**Aproveitamento dos resíduos de *Manihot esculenta* Crantz para produção de papel biodegradável, adubo e papel semente: de uma pesquisa em Ensino de Química a uma proposta STEAM com Inteligência Artificial**

Autoria: Gabriela Rodrigues Conceição
Baseado na pesquisa original desenvolvida no Estágio Supervisionado e no Programa Residência Pedagógica (CAPES) — Universidade do Estado do Amazonas (UEA), sob orientação da Profa. Célia Maria Serrão Eleutério.

## Sobre o projeto

A espécie *Manihot esculenta* Crantz (mandioca) é uma das raízes tuberosas mais cultivadas na Amazônia. Nas comunidades tradicionais, como em São Sebastião do Jará (rio Uaicurapá, Parintins-AM), as cascas resultantes do processamento são descartadas por não terem uso conhecido — apesar de apresentarem elevada carga orgânica e composto de cianeto, um risco de contaminação ambiental quando não tratadas adequadamente.

A pesquisa original valorizou esse resíduo (o epicarpo da mandioca) para a produção de **adubo** e **papel semente**, contextualizada nas aulas de Química. O **BioPaper AI** expande essa base para uma proposta interdisciplinar STEAM, incorporando Inteligência Artificial para estimar rendimento de produção e apoiar o processo educativo.

## Proposta STEAM

| Área | Como aparece no projeto |
|---|---|
| **S** — Ciência | Composição da casca (celulose, lignina), biodegradação, riscos ambientais do descarte |
| **T** — Tecnologia | Site/aplicação com calculadora de rendimento via IA e API em Node.js |
| **E** — Engenharia | Processo de fabricação: coleta, secagem, trituração (tradicional e mecanizada), preparo da massa e moldagem |
| **A** — Artes | Lembranças artesanais (cartões, marcadores, convites) feitas com o papel produzido |
| **M** — Matemática | Cálculo de rendimento, custo e proporção casca/papel |

## Metodologia

- **Método de procedimento:** fenomenológico
- **Tipo de pesquisa:** qualitativa
- **Método de abordagem:** experimentação investigativa
- Diálogo entre saberes locais, escolares e acadêmicos, com foco em Educação Ambiental e Sustentabilidade

## Resultados

O processo real (documentado com fotos no site) segue as etapas: coleta dos resíduos → trituração inicial → secagem → trituração final (tradicional ou mecanizada) → preparo da massa do papel → moldagem na tela.

Na pesquisa original, o mesmo epicarpo também foi aproveitado para produção de **adubo** e de **papel semente** — este último usando sementes de *Helianthus annuus* (girassol silvestre), espécie nativa da Amazônia, que germinam a partir do próprio papel plantado.

**Site do projeto:** [(https://biopaper-ai.netlify.app/)]

## Conclusão

O reaproveitamento do epicarpo da mandioca valoriza saberes locais e fortalece a experimentação investigativa na formação dos alunos, permitindo participação ativa em todas as fases do processo — da problematização à construção de novos conhecimentos. A expansão para uma proposta STEAM com IA amplia esse diálogo entre conceitos disciplinares (Química, Matemática, Tecnologia) e práticas sustentáveis de reaproveitamento de resíduos orgânicos.

## Referências

AZEVEDO, M. C. P. S. Ensino por Investigação: Problematizando as atividades em sala de aula. In: CARVALHO, A. M. P. (org.). *Ensino de Ciências: Unindo a Pesquisa e a Prática*. São Paulo: Thomson, cap. 2, p. 19-33, 2004.

CASTIGLIONI, G. L. et al. Modelagem matemática do processo de secagem da massa fibrosa de mandioca. *Revista Brasileira de Engenharia Agrícola e Ambiental*, v.17, n.9, p.987–994, 2013.

---
```
biopaper-ai/
├── backend/          Servidor Node.js + Express (API)
│   ├── server.js
│   └── package.json
└── frontend/         Site (HTML + CSS + JS)
    ├── index.html
    └── images/        fotos do processo
```

## Como rodar no VS Code

1. Abra a pasta `biopaper-ai` inteira no VS Code (File → Open Folder).
2. Abra um terminal (Terminal → New Terminal) e entre na pasta do backend:
   ```
   cd backend
   npm install
   npm start
   ```
3. Acesse **http://localhost:3000** no navegador — o backend já serve o site (frontend) e a API juntos, na mesma porta.

Precisa ter o **Node.js** instalado na máquina (versão 18 ou mais recente). Se não tiver, baixe em https://nodejs.org.

## O que o backend faz

- `POST /api/estimar` — recebe `{ kg, taxa, modo }` e devolve a estimativa de folhas, tempo e lotes (é o que alimenta a calculadora do site).
- `POST /api/produtores` e `GET /api/produtores` — cadastra e lista produtores.
- `POST /api/residuos` e `GET /api/residuos` — registra e lista entregas de resíduo (kg de casca) por produtor.
- `GET /api/relatorio` — resumo com total de produtores, total de kg recebidos e folhas estimadas no total.

Os dados ficam **em memória** (somem quando o servidor reinicia) — é o suficiente para uma demonstração de simpósio. Para guardar de verdade, trocar por um arquivo JSON ou um banco de dados depois.

## Se quiser rodar só o site, sem backend

Abrir o `frontend/index.html` direto no navegador também funciona — a calculadora tem um cálculo local de reserva que entra em ação automaticamente se não conseguir falar com o backend.
