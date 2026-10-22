"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart3,
  ShieldAlert,
  Globe2,
  Scale,
  Printer,
  FileDown,
  Layers,
  Search,
  TrendingUp,
  AlertTriangle,
  Flame,
  Gavel,
  Calculator,
  BookOpen,
  FileText,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  Fuel,
  Handshake,
  DollarSign,
  Users,
  Trees,
  Info,
  RotateCcw,
  Terminal,
  Activity,
  ExternalLink,
  Instagram,
  Share2,
} from "lucide-react";

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

type SourceBadgeType =
  | "IBGE"
  | "BCB"
  | "TN"
  | "INPE"
  | "STF"
  | "STJ"
  | "TSE"
  | "DIEESE"
  | "CGU"
  | "MCTI"
  | "MDIC"
  | "LUPA"
  | "AOSFATOS";

type TabId =
  | "todos"
  | "modulo1"
  | "modulo2"
  | "modulo3"
  | "modulo4"
  | "modulo5"
  | "simulador";

interface GdpCycle {
  id: string;
  codigoUrbano: string;
  governo: string;
  periodo: string;
  pibAcumulado: number;
  pibAcumuladoLabel: string;
  mediaAnual: number;
  mediaAnualLabel: string;
  pibPerCapita: number;
  pibPerCapitaLabel: string;
  observacao: string;
  corBarra: string;
  corTexto: string;
  bordaLateral: string;
  fonte: SourceBadgeType[];
}

interface SovereigntyComparison {
  id: string;
  codigoSetor: string;
  eixo: string;
  icone: "fuel" | "cpu" | "globe";
  fontes: SourceBadgeType[];
  subordinacao: {
    titulo: string;
    periodo: string;
    pontos: string[];
    impactoCritico: string;
  };
  soberania: {
    titulo: string;
    periodo: string;
    pontos: string[];
    impactoPositivo: string;
  };
}

interface JudicialDossier {
  id: string;
  protocolo: string;
  nome: string;
  cargo: string;
  partidoPolo: "PL" | "PT / Equilíbrio Metodológico";
  statusCurtos: string[];
  severidade: "critico" | "alerta" | "metodologico";
  fontes: SourceBadgeType[];
  resumoExecutivo: string;
  detalhesProcessuais: string[];
  valoresEnvolvidos?: string;
}

// ============================================================================
// DADOS OFICIAIS HARDCODED (INTEGRALMENTE PRESERVADOS)
// ============================================================================

const HERO_KPIS = [
  {
    id: "kpi-pib",
    codigo: "IND-01 // PIB REAL",
    titulo: "Crescimento do PIB Real",
    valorPrincipal: "+37,3% vs +5,6%",
    subtitulo:
      "Lula I e II (2003–2010: +4,0% a.a.) e Lula III (+9,2% no triênio 2023–2025) vs. Bolsonaro (2019–2022: +1,4% a.a.)",
    tendencia: "positivo" as const,
    fontes: ["IBGE"] as SourceBadgeType[],
  },
  {
    id: "kpi-trabalho-gini",
    codigo: "IND-02 // TRABALHO & RENDA",
    titulo: "Desemprego & Índice de Gini",
    valorPrincipal: "5,6% | Gini 0,491",
    subtitulo:
      "Mínimas históricas em 2025 (Lula III) e valorização real do Salário Mínimo de +53,6% (Lula I/II) e +8,8% (Lula III) vs +1,3% (Bolsonaro)",
    tendencia: "positivo" as const,
    fontes: ["IBGE", "DIEESE"] as SourceBadgeType[],
  },
  {
    id: "kpi-risco-fiscal",
    codigo: "IND-03 // ALERTA FISCAL",
    titulo: "Alerta Fiscal: DBGG & Juros Reais",
    valorPrincipal: "78,7% do PIB (+7,0 p.p.)",
    subtitulo:
      "Salto de 71,7% (2022) para 78,7% (2025) sob r ≈ 7% > g ≈ 3%, déficits primários consecutivos e Carga Tributária recorde de 32,40% do PIB",
    tendencia: "alerta" as const,
    fontes: ["BCB", "TN"] as SourceBadgeType[],
  },
  {
    id: "kpi-risco-institucional",
    codigo: "IND-04 // RISCO PENAL/STF",
    titulo: "Risco Institucional & Condenações STF",
    valorPrincipal: "27 anos e 3 meses",
    subtitulo:
      "Condenação de Jair Bolsonaro no STF (Arts. 359-M e 359-L CP), Inquérito Banco Master (Flávio Bolsonaro) e 1ª condenação do Orçamento Secreto",
    tendencia: "risco" as const,
    fontes: ["STF", "TSE"] as SourceBadgeType[],
  },
];

const GDP_DATA: GdpCycle[] = [
  {
    id: "lula-1",
    codigoUrbano: "CICLO 01 // 2003–2006",
    governo: "Lula I",
    periodo: "2003–2006",
    pibAcumulado: 14.8,
    pibAcumuladoLabel: "+14,8% acum.",
    mediaAnual: 3.5,
    mediaAnualLabel: "+3,5% a.a.",
    pibPerCapita: 9.1,
    pibPerCapitaLabel: "+9,1%",
    observacao:
      "Consolidação do tripé macroeconômico com superávit primário e início do ciclo de expansão de crédito e renda.",
    corBarra: "bg-gradient-to-r from-emerald-700 to-emerald-500",
    corTexto: "text-emerald-700",
    bordaLateral: "border-l-4 border-l-emerald-600",
    fonte: ["IBGE"],
  },
  {
    id: "lula-2",
    codigoUrbano: "CICLO 02 // 2007–2010",
    governo: "Lula II",
    periodo: "2007–2010",
    pibAcumulado: 19.6,
    pibAcumuladoLabel: "+19,6% acum.",
    mediaAnual: 4.6,
    mediaAnualLabel: "+4,6% a.a.",
    pibPerCapita: 12.8,
    pibPerCapitaLabel: "+12,8%",
    observacao:
      "Total combinado 2003–2010: +37,3% acumulado (+4,0% a.a.), atravessando a crise financeira global de 2008/2009.",
    corBarra: "bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-500",
    corTexto: "text-emerald-700",
    bordaLateral: "border-l-4 border-l-emerald-600",
    fonte: ["IBGE"],
  },
  {
    id: "bolsonaro",
    codigoUrbano: "CICLO 03 // 2019–2022",
    governo: "Jair Bolsonaro",
    periodo: "2019–2022",
    pibAcumulado: 5.6,
    pibAcumuladoLabel: "+5,6% acum.",
    mediaAnual: 1.4,
    mediaAnualLabel: "+1,4% a.a.",
    pibPerCapita: 2.8,
    pibPerCapitaLabel: "+2,8%",
    observacao:
      "Crescimento de +1,2% em 2019 (pré-pandemia), retração em 2020 e recuperação parcial em 2021–2022 com estagnação salarial.",
    corBarra: "bg-gradient-to-r from-amber-600 to-yellow-500",
    corTexto: "text-amber-700",
    bordaLateral: "border-l-4 border-l-amber-500",
    fonte: ["IBGE"],
  },
  {
    id: "lula-3",
    codigoUrbano: "CICLO 04 // 2023–2025",
    governo: "Lula III",
    periodo: "2023–2025 (Triênio)",
    pibAcumulado: 9.2,
    pibAcumuladoLabel: "+9,2% acum. no triênio",
    mediaAnual: 3.0,
    mediaAnualLabel: "+3,0% a.a.",
    pibPerCapita: 7.8,
    pibPerCapitaLabel: "+7,8%",
    observacao:
      "Expansão acima das projeções de mercado por três anos seguidos, puxada pelo mercado de trabalho aquecido, agro e indústria.",
    corBarra: "bg-gradient-to-r from-emerald-700 to-emerald-500",
    corTexto: "text-emerald-700",
    bordaLateral: "border-l-4 border-l-emerald-600",
    fonte: ["IBGE"],
  },
];

const LABOR_INCOME_DATA = [
  {
    indicador: "Taxa de Desemprego (Desocupação)",
    lula1e2: "Caiu de 12,3% para 6,7% (Metodologia PME)",
    bolsonaro: "Média de 12,1% no ciclo (fechou 2022 em 9,3% na PNAD-C)",
    lula3: "Média de 6,7%, atingindo em 2025 a mínima histórica de 5,6%",
    fontes: ["IBGE", "DIEESE"] as SourceBadgeType[],
    destaque: "Mínima histórica da série PNAD Contínua em 2025 (5,6%)",
  },
  {
    indicador: "Índice de Gini (Desigualdade de Renda)",
    lula1e2: "Derrubou de 0,581 (2003) para 0,538 (2010)",
    bolsonaro: "Foi de 0,544 (2019) para 0,518 (2022, sob efeito do Auxílio de R$ 600)",
    lula3: "Atingiu a mínima histórica de 0,491 em 2025",
    fontes: ["IBGE"] as SourceBadgeType[],
    destaque: "Primeira vez na história abaixo do patamar de 0,500 (0,491)",
  },
  {
    indicador: "Valorização Real do Salário Mínimo (Acima da Inflação)",
    lula1e2: "+53,6% de ganho real acumulado (2003–2010)",
    bolsonaro: "+1,3% no quadriênio (2019–2022) — fim da política de valorização",
    lula3: "+8,8% de ganho real acumulado (2023–2026) — retomada da regra PIB + INPC",
    fontes: ["IBGE", "DIEESE"] as SourceBadgeType[],
    destaque: "+53,6% (Lula I/II) e +8,8% (Lula III) vs. +1,3% (Bolsonaro)",
  },
];

const ENVIRONMENT_DATA = [
  {
    id: "env-lula-1-2",
    codigo: "PRODES // 01",
    ciclo: "Lula I e II (2003–2010)",
    variacao: "-74,8%",
    taxaReferencia: "De 27.772 km² (pico 2004) para 7.000 km² (2010)",
    kmAnoNumerico: 7000,
    status: "positivo" as const,
    marcosInstitucionais:
      "Criação do PPCDAm (Plano de Ação para Prevenção e Controle do Desmatamento na Amazônia Legal), sistema DETER/INPE em tempo real, criação do ICMBio e do Fundo Amazônia.",
    fontes: ["INPE"] as SourceBadgeType[],
  },
  {
    id: "env-bolsonaro",
    codigo: "PRODES // 02",
    ciclo: "Bolsonaro (2019–2022)",
    variacao: "+53,8% no ciclo",
    taxaReferencia: "Média de 11.403 km²/ano (pico de 13.038 km² em 2021)",
    kmAnoNumerico: 13038,
    status: "risco" as const,
    marcosInstitucionais:
      "Paralisação unilateral do Fundo Amazônia, desmonte da governança ambiental e queda drástica na aplicação e cobrança de multas ambientais pelo Ibama.",
    fontes: ["INPE"] as SourceBadgeType[],
  },
  {
    id: "env-lula-3",
    codigo: "PRODES // 03",
    ciclo: "Lula III (2023–2026)",
    variacao: "-71,2% acum.",
    taxaReferencia: "3.335 km²/ano em 2026 (menor taxa histórica desde 1988)",
    kmAnoNumerico: 3335,
    status: "positivo" as const,
    marcosInstitucionais:
      "Menor taxa da série histórica do PRODES (desde 1988), reativação imediata do Fundo Amazônia e R$ 11,8 bilhões em multas aplicadas pelo Ibama.",
    fontes: ["INPE"] as SourceBadgeType[],
  },
];

const SOVEREIGNTY_DATA: SovereigntyComparison[] = [
  {
    id: "petrobras-energia",
    codigoSetor: "EIXO 01 // ENERGIA & REFINO",
    eixo: "Petrobras, Refino e Soberania Energética",
    icone: "fuel",
    fontes: ["CGU", "BCB", "TN"],
    subordinacao: {
      titulo: "Subordinação Passiva (2019–2022)",
      periodo: "Governo Jair Bolsonaro",
      pontos: [
        "Manutenção estrita da dolarização artificial dos combustíveis internos via Preço de Paridade de Importação (PPI), transferindo choques externos diretamente para a inflação de alimentos e transporte no Brasil.",
        "Distribuição de R$ 215,8 bilhões em dividendos recordes em 2022 aos acionistas (inclusive estrangeiros), às custas da compressão do investimento produtivo e da inflação interna.",
        "Venda da Refinaria Landulpho Alves — RLAM (BA) por US$ 1,65 bilhão, valor apontado como abaixo do valor de mercado segundo auditoria da CGU, gerando monopólio regional privado com preços mais caros na Bahia.",
      ],
      impactoCritico:
        "Desverticalização da estatal, perda de capacidade de refino nacional e transferência de renda do consumidor brasileiro para dividendos de curto prazo.",
    },
    soberania: {
      titulo: "Soberania Nacional (2003–2010 / 2023–2026)",
      periodo: "Governos Lula I, II e III",
      pontos: [
        "Fim oficial da política de Preço de Paridade de Importação (PPI) em maio de 2023, adotando custo alternativo do cliente e vantagem competitiva do petróleo extraído no pré-sal nacional.",
        "Plano Estratégico da Petrobras de US$ 111 bilhões focado na ampliação do parque de refino nacional (RNEST, REPLAN, Boaventura), transição energética e exploração da Margem Equatorial.",
        "Retomada das fábricas nacionais de fertilizantes (Araucária Nitrogenados - ANSA e UFN-III em Três Lagoas/MS) para reduzir a dependência externa do agronegócio brasileiro.",
      ],
      impactoPositivo:
        "Amortecimento da volatilidade cambial sobre o diesel e gasolina, segurança energética e reconstrução da cadeia petroquímica e de fertilizantes.",
    },
  },
  {
    id: "ciencia-tecnologia-industria",
    codigoSetor: "EIXO 02 // CHIPS, C&T & INDÚSTRIA",
    eixo: "Ciência, Tecnologia, Semicondutores e Indústria",
    icone: "cpu",
    fontes: ["MCTI", "TN", "CGU"],
    subordinacao: {
      titulo: "Desmonte Científico e Desindustrialização (2019–2022)",
      periodo: "Governo Jair Bolsonaro",
      pontos: [
        "Contingenciamento ilegal de mais de R$ 4+ bilhões do FNDCT (Fundo Nacional de Desenvolvimento Científico e Tecnológico), paralisando laboratórios e infraestrutura de pesquisa.",
        "Cortes severos no orçamento do CNPq e da CAPES, congelamento de bolsas de mestrado, doutorado e iniciação científica por todo o mandato.",
        "Tentativa de liquidar e extinguir a estatal de semicondutores CEITEC (única fabricante de chips com sala limpa da América Latina, sediada em Porto Alegre).",
      ],
      impactoCritico:
        "Fuga de cérebros, sucateamento tecnológico e tentativa de abandono da indústria estratégica de microeletrônica em plena crise global de chips.",
    },
    soberania: {
      titulo: "Reindustrialização e Autonomia Tecnológica (2003–2010 / 2023–2026)",
      periodo: "Governos Lula I, II e III",
      pontos: [
        "Descontingenciamento total e integral do FNDCT, garantindo execução superior a R$ 10 bilhões/ano em fomento direto à ciência, inovação e universidades.",
        "Reversão da liquidação e retomada plena da estatal de chips CEITEC, com investimentos em semicondutores de carbeto de silício (SiC) para transição energética e mobilidade elétrica.",
        "Lançamento do programa Nova Indústria Brasil (NIB) com R$ 300 bilhões em financiamentos (BNDES, FINEP e EMBRAPII) até 2026 para complexos de saúde, defesa, agroindústria e transformação digital.",
      ],
      impactoPositivo:
        "Reconstrução da capacidade produtiva doméstica, reajuste imediato das bolsas científicas (+40% a +75%) e soberania em tecnologias críticas.",
    },
  },
  {
    id: "diplomacia-comercio",
    codigoSetor: "EIXO 03 // GEOPOLÍTICA & COMÉRCIO",
    eixo: "Diplomacia Econômica e Comércio Exterior",
    icone: "globe",
    fontes: ["MDIC", "BCB"],
    subordinacao: {
      titulo: "Alinhamento Automático sem Contrapartida (2019–2022)",
      periodo: "Governo Jair Bolsonaro",
      pontos: [
        "Renúncia unilateral do Brasil ao status de Tratamento Especial e Diferenciado (TED) na OMC em 2019 em visita a Washington, sem obter qualquer contrapartida concreta dos EUA (inclusive ficando fora da OCDE).",
        "Imposição de cotas e sobretaxas pelos EUA ao aço e alumínio brasileiros mesmo após concessões tarifárias unilaterais do Brasil ao etanol e trigo norte-americanos.",
        "Isolamento ambiental internacional, paralisação do acordo Mercosul-União Europeia e perda de protagonismo nos fóruns multilaterais (G20, BRICS e COP).",
      ],
      impactoCritico:
        "Subordinação ideológica externa sem ganhos comerciais, resultando em barreiras sanitárias/ambientais e perda de poder de barganha geopolítico.",
    },
    soberania: {
      titulo: "Autonomia Multipolar e Pragmatismo Comercial (2003–2010 / 2023–2026)",
      periodo: "Governos Lula I, II e III",
      pontos: [
        "Política externa de autonomia multipolar: fortalecimento estratégico do BRICS+, presidência brasileira do G20 (2024) e da COP30 (Belém, 2025) com diálogo aberto com EUA, China e União Europeia.",
        "Destravamento diplomático e assinatura das bases do acordo comercial Mercosul-União Europeia com salvaguardas para compras governamentais e indústria local.",
        "Abertura recorde de mais de 300 novos mercados internacionais para produtos do agronegócio e da indústria brasileira em mais de 65 países entre 2023 e 2026.",
      ],
      impactoPositivo:
        "Recordes históricos na balança comercial brasileira, diversificação de parceiros comerciais e atração de investimentos verdes e industriais.",
    },
  },
];

const JUDICIAL_DOSSIERS: JudicialDossier[] = [
  {
    id: "jair-bolsonaro",
    protocolo: "AUTOS // STF-2025-1T",
    nome: "Jair Messias Bolsonaro",
    cargo: "Ex-Presidente da República (2019–2022) e Presidente de Honra do PL",
    partidoPolo: "PL",
    statusCurtos: [
      "Condenado a 27 anos e 3 meses no STF (Regime Fechado)",
      "2x Inelegível no TSE (até 2030)",
      "Indiciado pela PF (Joias Sauditas)",
    ],
    severidade: "critico",
    fontes: ["STF", "TSE"],
    resumoExecutivo:
      "Condenado criminalmente pela 1ª Turma do Supremo Tribunal Federal (2025) a 27 anos e 3 meses de prisão em regime fechado por liderar organização criminosa voltada à ruptura democrática.",
    detalhesProcessuais: [
      "Condenação criminal pela 1ª Turma do STF (2025) a 27 anos e 3 meses de reclusão em regime fechado pelos crimes de tentativa de golpe de Estado (Art. 359-M do Código Penal), abolição violenta do Estado Democrático de Direito (Art. 359-L do CP), organização criminosa armada e dano qualificado ao patrimônio tombado.",
      "Duas condenações colegiadas à inelegibilidade por 8 anos no Tribunal Superior Eleitoral (TSE) por abuso de poder político e uso indevido dos meios de comunicação (reunião com embaixadores para atacar o sistema eleitoral e uso eleitoral do Bicentenário da Independência no 7 de Setembro).",
      "Indiciado pela Polícia Federal no inquérito das Joias Sauditas pelos crimes de peculato (desvio de bens públicos de alto valor do acervo presidencial), lavagem de dinheiro no exterior e associação criminosa.",
    ],
  },
  {
    id: "flavio-bolsonaro",
    protocolo: "AUTOS // STF-INQ-2026",
    nome: "Flávio Nantes Bolsonaro",
    cargo: "Senador da República (PL-RJ) e Candidato Presidencial (Plano 2026)",
    partidoPolo: "PL",
    statusCurtos: [
      "Inquérito Ativo no STF (Set/2026 - Caso Banco Master / Filme Dark Horse)",
      "Operação Make Up (Auditoria da PF sobre Emendas)",
      "Caso Rachadinhas Alerj (Anulado por Erro de Foro)",
      "0 Leis de Autoria Individual em ~8 anos de Senado",
    ],
    severidade: "critico",
    fontes: ["STF", "STJ"],
    valoresEnvolvidos:
      "R$ 134 milhões (Dark Horse / Master) | R$ 61 milhões (EUA) | R$ 58 milhões (Ex-sócio) | R$ 6,1 milhões (Rachadinhas Alerj)",
    resumoExecutivo:
      "Alvo de inquérito ativo no STF (Rel. Min. Flávio Dino, aberto em set/2026) por suspeita de corrupção, lavagem de dinheiro e evasão de divisas, além de apresentar produtividade legislativa de zero projetos de autoria individual sancionados como lei em quase 8 anos de Senado.",
    detalhesProcessuais: [
      "Investigado em inquérito ativo no STF (Relator Min. Flávio Dino, instaurado em setembro/2026) por suspeita de corrupção, lavagem de dinheiro e evasão de divisas no caso Banco Master / Filme 'Dark Horse': negociação estruturada de R$ 134 milhões, com R$ 61 milhões remetidos via fundo nos Estados Unidos.",
      "Investigação conexa sobre movimentações de R$ 58 milhões envolvendo ex-sócio empresarial e auditoria da Polícia Federal sobre destinação de emendas parlamentares no âmbito da Operação Make Up.",
      "No caso das 'Rachadinhas' da Alerj (R$ 6,1 milhões movimentados pelo ex-assessor Fabrício Queiroz, depósitos fracionados em espécie e lavagem via franquia de chocolates Kopenhagen e transações imobiliárias), foi denunciado pelo MPRJ em 2020 por peculato, lavagem de dinheiro e organização criminosa, mas teve o processo arquivado em 2022 exclusivamente porque o STJ e o STF anularam as quebras de sigilo bancário/fiscal por erro formal de foro (competência de 1ª instância vs. Órgão Especial do TJRJ).",
      "Risco institucional no Plano 2026: propõe limitar poderes constitucionais do STF e conceder anistia irrestrita a condenados por golpe de Estado enquanto é ele próprio investigado em inquérito criminal ativo na Corte.",
    ],
  },
  {
    id: "valdemar-costa-neto",
    protocolo: "AUTOS // STF-AP470",
    nome: "Valdemar Costa Neto",
    cargo: "Presidente Nacional do Partido Liberal (PL)",
    partidoPolo: "PL",
    statusCurtos: [
      "Condenado no STF na AP 470 (7 anos e 10 meses)",
      "Indiciado pela PF em 2024 (Trama Golpista)",
      "Multa de R$ 22,9 milhões ao PL (Litigância de Má-fé no TSE)",
    ],
    severidade: "critico",
    fontes: ["STF", "TSE"],
    valoresEnvolvidos:
      "Gerencia >R$ 900 mi de Fundo Eleitoral (2026), R$ 886,8 mi (2024) e ~R$ 220 mi/ano de Fundo Partidário",
    resumoExecutivo:
      "Comandante do orçamento bilionário do PL, já foi condenado pelo STF por corrupção passiva e lavagem de dinheiro no Mensalão e indiciado pela Polícia Federal na investigação da tentativa de golpe de Estado.",
    detalhesProcessuais: [
      "Condenado pelo Plenário do STF na Ação Penal 470 (Mensalão) à pena de 7 anos e 10 meses de prisão pelos crimes de corrupção passiva e lavagem de dinheiro (tendo renunciado ao mandato antes para tentar evitar cassação e cumprido pena antes de receber indulto em 2016).",
      "Indiciado pela Polícia Federal em 2024 no inquérito da trama golpista por financiar e dar suporte partidário-institucional à disseminação de desinformação contra o sistema eleitoral e à tentativa de subversão do resultado das urnas.",
      "Acionou o TSE sem provas contra as urnas eletrônicas do 2º turno de 2022, resultando na condenação histórica do PL à multa de R$ 22,9 milhões por litigância de má-fé (Rel. Min. Alexandre de Moraes).",
    ],
  },
  {
    id: "deputados-orcamento-secreto",
    protocolo: "AUTOS // STF-17/03/2026",
    nome: "Josimar Maranhãozinho (PL-MA), Pastor Gil (PL-MA) e Bosco Costa (PL-SE)",
    cargo: "Deputados Federais da Bancada do PL",
    partidoPolo: "PL",
    statusCurtos: [
      "1ª Condenação Criminal da História no STF pelo 'Orçamento Secreto' (17/03/2026)",
      "Propina de 25% sobre Emendas da Saúde (SUS)",
      "Pena de 6 anos e 5 meses + R$ 1,66 milhão",
    ],
    severidade: "critico",
    fontes: ["STF"],
    valoresEnvolvidos: "Propina de 25% sobre emendas SUS | Indenização de R$ 1,66 milhão",
    resumoExecutivo:
      "Primeiros parlamentares da história condenados criminalmente pelo STF (1ª Turma, por unanimidade, em 17/03/2026) por corrupção passiva e organização criminosa no esquema do 'Orçamento Secreto' (emendas de relator RP9 e emendas Pix).",
    detalhesProcessuais: [
      "Condenação unânime pela 1ª Turma do STF em 17/03/2026: os parlamentares operavam uma organização criminosa que cobrava propina de 25% ('pedágio') de prefeitos para liberar emendas parlamentares destinadas ao custeio da saúde pública (SUS) em municípios do Maranhão (como São José de Ribamar).",
      "O líder do esquema, deputado Josimar Maranhãozinho (PL-MA), foi condenado a 6 anos e 5 meses de reclusão, além do pagamento de indenização por danos coletivos de R$ 1,66 milhão, com uso documentado de agiotas e homens armados para cobrança das propinas.",
      "Caso paradigmático que comprovou judicialmente como a falta de transparência das emendas criadas/expandidas entre 2020 e 2022 abriu margem para desvios diretos de verbas do SUS.",
    ],
  },
  {
    id: "ramagem-zambelli",
    protocolo: "AUTOS // STF-ABIN-CNJ",
    nome: "Alexandre Ramagem (PL-RJ) e Carla Zambelli (PL-SP)",
    cargo: "Deputados Federais (PL-RJ e PL-SP)",
    partidoPolo: "PL",
    statusCurtos: [
      "Réus no STF",
      "Caso 'Abin Paralela' (Espionagem Clandestina)",
      "Invasão Hacker ao Sistema do CNJ",
    ],
    severidade: "critico",
    fontes: ["STF", "TSE"],
    resumoExecutivo:
      "Parlamentares de destaque da bancada do PL que respondem como réus em ações penais no Supremo Tribunal Federal por crimes contra a administração da Justiça e aparelhamento clandestino de órgãos de inteligência.",
    detalhesProcessuais: [
      "Alexandre Ramagem (ex-Diretor-Geral da ABIN e Deputado Federal PL-RJ): Réu no STF no caso da 'Abin Paralela' (uso ilegal do software espião FirstMile para monitorar clandestinamente ministros do STF, parlamentares, jornalistas e adversários políticos sem autorização judicial) e integrante do núcleo de inteligência da trama golpista.",
      "Carla Zambelli (Deputada Federal PL-SP): Ré no STF por invasão de dispositivo informático e falsidade ideológica, acusada de comandar e financiar o hacker Walter Delgatti Neto na invasão criminosa aos sistemas do Conselho Nacional de Justiça (CNJ) para inserir mandado de prisão falso contra ministro do STF, além de responder por porte ilegal de arma de fogo com perseguição a civil em via pública na véspera do 2º turno de 2022.",
    ],
  },
  {
    id: "nota-equilibrio-lula",
    protocolo: "HC 193.726 & HC 164.493",
    nome: "Nota de Equilíbrio e Rigor Metodológico: Luiz Inácio Lula da Silva",
    cargo: "Presidente da República (2003–2010 e 2023–2026)",
    partidoPolo: "PT / Equilíbrio Metodológico",
    statusCurtos: [
      "Condenações da Lava Jato Anuladas pelo Plenário do STF (2021)",
      "Incompetência Territorial de Curitiba (HC 193.726)",
      "Suspeição do Ex-Juiz Sérgio Moro (HC 164.493)",
      "Prescrição e Arquivamento — Sem Condenação Vigente",
    ],
    severidade: "metodologico",
    fontes: ["STF", "STJ"],
    resumoExecutivo:
      "Rigor simétrico na análise jurídica: assim como Flávio Bolsonaro teve o caso das Rachadinhas arquivado por nulidade processual de foro no STJ/STF, Luiz Inácio Lula da Silva teve suas condenações na Operação Lava Jato anuladas pelo STF por vícios formais de competência e parcialidade do juízo.",
    detalhesProcessuais: [
      "Nos casos do Triplex do Guarujá e do Sítio de Atibaia (Operação Lava Jato), Lula havia sido condenado em 1ª e 2ª instâncias (13ª Vara Federal de Curitiba e TRF-4) e no STJ, cumprindo 580 dias de prisão entre 2018 e 2019.",
      "Em março/abril de 2021, o Plenário do STF declarou a incompetência territorial absoluta da 13ª Vara Federal de Curitiba (HC 193.726) para julgar os casos — por ausência de vínculo direto e exclusivo com desvios da Petrobras — remetendo os autos à Justiça Federal do Distrito Federal.",
      "Subsequentemente, o STF reconheceu a suspeição (parcialidade) do ex-juiz Sérgio Moro (HC 164.493), anulando todos os atos decisórios e instrutórios desde o início das ações. Com a nulidade e a idade superior a 70 anos (que reduz os prazos prescricionais pela metade no Código Penal), os processos resultaram em prescrição e arquivamento definitivo, sem condenação criminal vigente.",
      "Conclusão Metodológica: A análise técnica comprova que ambos os polos políticos brasileiros se beneficiaram diretamente de anulações processuais formais nos tribunais superiores (STJ e STF) baseadas em regras de competência de foro e devido processo legal.",
    ],
  },
];

// ============================================================================
// DADOS DO MÓDULO 5: CREDIBILIDADE, CHECAGEM DOS DEBATES E ÚLTIMAS NOTÍCIAS (OUT/2026)
// ============================================================================

interface DebateFactCheckItem {
  id: string;
  protocolo: string;
  candidato: "Lula (PT)" | "Flávio Bolsonaro (PL)";
  eventoData: string;
  declaracao: string;
  veredito: "FALSO" | "ENGANOSO" | "IMPRECISO" | "VERDADEIRO";
  resumoVeredito: string;
  auditoriaTecnica: string;
  fontes: SourceBadgeType[];
}

interface CandidateCredibilityProfile {
  id: string;
  candidato: string;
  partido: string;
  cargoAtual: string;
  resultado1TurnoTSE: string;
  votos1TurnoTSE: string;
  indicePrecisaoDebates: number;
  indicePrecisaoLabel: string;
  placarChecagem: {
    verdadeiro: number;
    impreciso: number;
    falsoEnganoso: number;
  };
  pilaresCredibilidade: string[];
  passivosCredibilidade: string[];
  fontes: SourceBadgeType[];
}

interface ElectionNewsItem {
  id: string;
  data: string;
  categoria: string;
  manchete: string;
  resumo: string;
  impactoEleitoral: string;
  destaqueCor: "emerald" | "amber" | "blue" | "rose";
  fontes: SourceBadgeType[];
}

const CANDIDATE_CREDIBILITY: CandidateCredibilityProfile[] = [
  {
    id: "cred-lula",
    candidato: "Luiz Inácio Lula da Silva",
    partido: "PT • Coligação Brasil da Esperança",
    cargoAtual: "Presidente da República (Candidato à Reeleição)",
    resultado1TurnoTSE: "45,16% dos votos válidos",
    votos1TurnoTSE: "53.876.617 votos (TSE)",
    indicePrecisaoDebates: 74,
    indicePrecisaoLabel: "74% de Aderência a Séries Oficiais (Com Improvisos Imprecisos)",
    placarChecagem: {
      verdadeiro: 6,
      impreciso: 3,
      falsoEnganoso: 1,
    },
    pilaresCredibilidade: [
      "Lastro Empírico Auditável: Os indicadores centrais citados na campanha (desemprego na mínima histórica de 5,6%, Índice de Gini em 0,491, ganho real do salário mínimo e menor desmatamento desde 1988 no PRODES) são integralmente confirmados pelo IBGE e pelo INPE.",
      "Defesa de Checagem em Tempo Real: A campanha apoiou formalmente a petição pública com mais de 1 milhão de assinaturas pela implementação de fact-checking ao vivo nos debates televisivos do 2º turno.",
      "Previsibilidade Institucional e Diplomática: Cumprimento integral das regras do calendário eleitoral, respeito às decisões do STF/TSE e interlocução ativa com EUA, União Europeia e BRICS.",
    ],
    passivosCredibilidade: [
      "Promessa de 'Déficit Zero' Descumprida: Apesar do compromisso firmado pelo Ministério da Fazenda em 2023, o governo entregou déficits primários consecutivos (-2,29% em 2023; -0,40% em 2024; -0,43% em 2025) e elevou a Dívida Bruta (DBGG) em +7,0 p.p. (78,7% do PIB).",
      "Exageros Retóricos de Improviso nos Debates: No Debate da Band (18/10/2026), afirmou falsamente que o PIB nunca havia crescido acima de 3% entre 2011 e 2022 (ignorando os +4,0% de 2011 e o rebote de +4,8% em 2021) e inflou de cabeça a proporção de cestas básicas compradas pelo salário mínimo.",
    ],
    fontes: ["IBGE", "BCB", "TN", "LUPA", "AOSFATOS", "TSE"],
  },
  {
    id: "cred-flavio",
    candidato: "Flávio Bolsonaro",
    partido: "PL • Partido Liberal",
    cargoAtual: "Senador da República (RJ) e Candidato a Presidente",
    resultado1TurnoTSE: "47,03% dos votos válidos",
    votos1TurnoTSE: "56.104.268 votos (TSE)",
    indicePrecisaoDebates: 32,
    indicePrecisaoLabel: "32% de Aderência Factual (Uso Recorrente de Peças Desmentidas)",
    placarChecagem: {
      verdadeiro: 2,
      impreciso: 3,
      falsoEnganoso: 5,
    },
    pilaresCredibilidade: [
      "Tração Eleitoral e Coerência Ideológica: Venceu o 1º turno com 47,03% dos votos válidos (vantagem de 2,22 milhões de votos sobre Lula), mantendo discurso coeso de oposição fiscal ao governo, endurecimento penal e defesa da anistia a Jair Bolsonaro.",
      "Capacidade de Mobilização Digital: Lidera o engajamento orgânico nas redes e consolidou a transferência de capital político do bolsonarismo em torno de sua candidatura em 2026.",
    ],
    passivosCredibilidade: [
      "Repetição de Desinformação Desmentida nos Debates: No Debate da Band (18/10/2026), insistiu na afirmação falsa de que Lula e Janja teriam gasto 'R$ 7 bilhões em viagens' (valor que corresponde a todas as diárias e passagens de centenas de milhares de servidores, policiais e militares de todo o Estado brasileiro) e distorceu regras do Código Penal (Art. 75).",
      "Baixa Entrega Legislativa vs. Discurso Antissistema: Teve 0 projetos de autoria individual sancionados como lei em quase 8 anos de Senado, enquanto seu partido (PL) absorveu mais de R$ 900 milhões de Fundo Eleitoral em 2026.",
      "Passivo Investigativo Ativo no STF: Responde ao inquérito aberto em set/2026 no STF (Rel. Min. Flávio Dino) sobre negociação de R$ 134 milhões no caso Banco Master / Filme Dark Horse (com R$ 61 milhões enviados a fundo nos EUA), além de ter tido o caso das Rachadinhas (R$ 6,1 mi) arquivado apenas por anulação formal de foro.",
    ],
    fontes: ["TSE", "STF", "LUPA", "AOSFATOS", "CGU"],
  },
];

const DEBATE_FACT_CHECKS: DebateFactCheckItem[] = [
  {
    id: "fc-1",
    protocolo: "CHECAGEM // BAND-01",
    candidato: "Flávio Bolsonaro (PL)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“O Lula gastou R$ 7 bilhões do dinheiro do povo brasileiro em viagens internacionais com a primeira-dama Janja.”",
    veredito: "FALSO",
    resumoVeredito:
      "Mentira recorrente: O valor de R$ 7 bilhões é o gasto global de toda a Administração Federal (militares, PF, Ibama e servidores), não do casal presidencial.",
    auditoriaTecnica:
      "Auditado por Agência Lupa, Aos Fatos e Estadão Verifica com base no Portal da Transparência (CGU): O montante citado soma todas as diárias e passagens aéreas/terrestres pagas entre 2023 e 2026 a centenas de milhares de servidores públicos civis e militares em missões oficiais dentro e fora do Brasil (incluindo operações da Polícia Federal, Forças Armadas e fiscalização ambiental).",
    fontes: ["LUPA", "AOSFATOS", "CGU"],
  },
  {
    id: "fc-2",
    protocolo: "CHECAGEM // BAND-02",
    candidato: "Flávio Bolsonaro (PL)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“O governo Lula ficou de braços cruzados e inerte diante do tarifaço dos Estados Unidos e não defendeu os produtos brasileiros.”",
    veredito: "FALSO",
    resumoVeredito:
      "Falso segundo registros oficiais do Itamaraty e do MDIC: houve dezenas de rodadas diplomáticas e reunião bilateral na Casa Branca.",
    auditoriaTecnica:
      "Dados oficiais do Ministério das Relações Exteriores e do MDIC comprovam que o governo brasileiro realizou dezenas de reuniões técnicas com o USTR e o Departamento de Comércio dos EUA, incluindo encontro presencial entre Lula e Donald Trump na Casa Branca para negociar cotas tarifárias, além da abertura de mais de 300 novos mercados externos para compensar barreiras.",
    fontes: ["LUPA", "MDIC"],
  },
  {
    id: "fc-3",
    protocolo: "CHECAGEM // BAND-03",
    candidato: "Lula (PT)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“Desde que eu deixei a Presidência em 2010, o PIB brasileiro nunca mais cresceu acima de 3% até eu voltar ao governo em 2023.”",
    veredito: "FALSO",
    resumoVeredito:
      "Falso segundo a série histórica do IBGE: o PIB superou 3% em 2011 (+4,0%), em 2013 (+3,0%) e em 2021 (+4,8%).",
    auditoriaTecnica:
      "De acordo com o Sistema de Contas Nacionais do IBGE, a economia brasileira cresceu +4,0% em 2011 e +3,0% em 2013 (durante o primeiro mandato de Dilma Rousseff) e registrou alta de +4,8% em 2021 (sob Jair Bolsonaro, em recuperação estatística após a queda de -3,3% na pandemia de 2020). Na média acumulada dos ciclos, porém, Lula detém a maior taxa (+4,0% a.a. em 2003–2010 e +3,0% a.a. em 2023–2025, contra +1,4% a.a. de Bolsonaro).",
    fontes: ["LUPA", "AOSFATOS", "IBGE"],
  },
  {
    id: "fc-4",
    protocolo: "CHECAGEM // BAND-04",
    candidato: "Flávio Bolsonaro (PL)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“Com a aprovação da nossa lei, líderes de facções criminosas vão ficar obrigatoriamente 80 anos presos na cadeia.”",
    veredito: "ENGANOSO",
    resumoVeredito:
      "Enganoso: O artigo 75 do Código Penal brasileiro limita o cumprimento efetivo máximo de prisão a 40 anos no país.",
    auditoriaTecnica:
      "Embora a alteração legislativa permita dobrar penas na dosimetria da sentença (podendo a condenação somar 80 anos no papel), o Art. 75 do Código Penal (alterado pelo próprio Pacote Anticrime de 2019) fixa que o tempo de cumprimento das penas privativas de liberdade não pode ser superior a 40 anos no Brasil.",
    fontes: ["LUPA", "STF"],
  },
  {
    id: "fc-5",
    protocolo: "CHECAGEM // BAND-05",
    candidato: "Flávio Bolsonaro (PL)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“As ações do governo federal na segurança pública não tiveram nenhum efeito prático na redução do roubo de celulares.”",
    veredito: "ENGANOSO",
    resumoVeredito:
      "Enganoso: O Anuário Brasileiro de Segurança Pública registrou queda consistente nos roubos de celular com o programa Celular Seguro.",
    auditoriaTecnica:
      "Levantamento do Fórum Brasileiro de Segurança Pública e relatórios do MJSP apontam queda expressiva nas ocorrências de roubo e furto de aparelhos móveis nas capitais após a integração do aplicativo federal Celular Seguro com a Anatel, operadoras de telefonia e instituições financeiras da Febraban.",
    fontes: ["AOSFATOS", "LUPA"],
  },
  {
    id: "fc-6",
    protocolo: "CHECAGEM // BAND-06",
    candidato: "Lula (PT)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“Nós derrubamos a inflação de alimentos pela metade e hoje o salário mínimo compra o dobro de cestas básicas do governo passado.”",
    veredito: "IMPRECISO",
    resumoVeredito:
      "Impreciso com fundo de verdade: A inflação de alimentos caiu e o poder de compra subiu, mas não na proporção do 'dobro'.",
    auditoriaTecnica:
      "Segundo o IPCA/IBGE e a Pesquisa Nacional da Cesta Básica de Alimentos do DIEESE, a inflação acumulada de alimentos e bebidas em Lula III (2023–2025) foi de fato inferior à metade da registrada no ciclo Bolsonaro (2019–2022, quando alimentos subiram mais de 40%), e o salário mínimo teve ganho real de +8,8%, mas o poder de compra em cestas básicas cresceu cerca de 18% a 22%, e não 100% ('o dobro').",
    fontes: ["AOSFATOS", "DIEESE", "IBGE"],
  },
  {
    id: "fc-7",
    protocolo: "CHECAGEM // BAND-07",
    candidato: "Lula (PT)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“Entregamos a menor taxa de desemprego da série histórica do IBGE (5,6%) e o menor desmatamento na Amazônia desde 1988.”",
    veredito: "VERDADEIRO",
    resumoVeredito:
      "Verdadeiro: Confirmado integralmente pelas séries históricas oficiais da PNAD Contínua (IBGE) e do sistema PRODES (INPE).",
    auditoriaTecnica:
      "A PNAD Contínua do IBGE confirma que a taxa de desocupação atingiu 5,6% em 2025 (menor marca desde o início da série em 2012), e o monitoramento orbital PRODES/INPE registrou 3.335 km² de desmatamento na Amazônia Legal em 2026 (queda acumulada de -71,2% em Lula III e menor valor desde o início da medição em 1988).",
    fontes: ["IBGE", "INPE", "LUPA"],
  },
  {
    id: "fc-8",
    protocolo: "CHECAGEM // BAND-08",
    candidato: "Flávio Bolsonaro (PL)",
    eventoData: "Debate da Band (2º Turno) — 18/10/2026",
    declaracao:
      "“O governo Lula aumentou a dívida pública e bateu recorde de arrecadação e carga tributária sobre o setor produtivo em 2025.”",
    veredito: "VERDADEIRO",
    resumoVeredito:
      "Verdadeiro: A Dívida Bruta (DBGG) subiu +7,0 p.p. (para 78,7% do PIB) e a Carga Tributária Bruta atingiu recorde de 32,40% do PIB em 2025.",
    auditoriaTecnica:
      "Os boletins fiscais do Banco Central e da Secretaria do Tesouro Nacional confirmam que, entre dezembro de 2022 e dezembro de 2025, a DBGG avançou de 71,7% para 78,7% do PIB, enquanto a Carga Tributária Bruta do Governo Geral alcançou 32,40% do PIB em 2025, o maior patamar da série histórica recente.",
    fontes: ["BCB", "TN", "AOSFATOS"],
  },
];

const OCTOBER_2026_NEWS: ElectionNewsItem[] = [
  {
    id: "news-1",
    data: "22 OUT 2026 • PESQUISAS DO 2º TURNO",
    categoria: "EMPATE TÉCNICO EXTREMO",
    manchete:
      "Quaest, PoderData e Indexa apontam empate técnico absoluto a 3 dias da votação (25/10)",
    resumo:
      "As rodadas divulgadas entre 21 e 22 de outubro de 2026 mostram a disputa mais acirrada desde 1989: na Quaest/Globo, Flávio Bolsonaro tem 45% e Lula 44% dos votos totais (~50,5% a 49,4% nos válidos, margem de 2 p.p.). No PoderData (22/10), o placar é de 51% a 49% nos válidos (49% a 48% nos totais, margem de 1,6 p.p.), e na Indexa/Broadcast é de 50,6% a 49,4%.",
    impactoEleitoral:
      "Com cerca de 90% do eleitorado já decidido segundo a Quaest, os ~5% a 8% de eleitores indecisos ou que cogitam voto branco/nulo decidirão matematicamente a Presidência da República no domingo (25/10).",
    destaqueCor: "amber",
    fontes: ["TSE", "LUPA"],
  },
  {
    id: "news-2",
    data: "22 OUT 2026 • MOBILIZAÇÃO CÍVICA",
    categoria: "FACT-CHECKING AO VIVO",
    manchete:
      "Petição por checagem de fatos em tempo real no Debate da Globo (23/10) ultrapassa 1 milhão de assinaturas",
    resumo:
      "Após o alto volume de números falsos ou distorcidos no debate da Band (18/10), um abaixo-assinado nacional superou 1 milhão de subscrições cobrando verificação factual ao vivo no último debate presidencial desta sexta-feira (23/10, às 21h20), mediado por César Tralli nos Estúdios Globo.",
    impactoEleitoral:
      "A pressão pública por checagem ao vivo reflete o cansaço do eleitor moderado com a guerra de desinformação e eleva o peso de dossiês baseados em dados primários oficiais.",
    destaqueCor: "emerald",
    fontes: ["LUPA", "AOSFATOS"],
  },
  {
    id: "news-3",
    data: "18–22 OUT 2026 • PAUTAS DECISIVAS",
    categoria: "ECONOMIA, SEGURANÇA & STF",
    manchete:
      "Fim da Escala 6x1, PEC da Segurança Pública e Inquérito do Banco Master dominam a reta final",
    resumo:
      "Nos últimos dias de campanha, Lula concentrou foco na defesa do fim da escala de trabalho 6x1, na isenção de IR e na queda do desemprego (5,6%), enquanto Flávio Bolsonaro apostou na pauta de segurança pública, mas precisou responder na imprensa e nos debates sobre o avanço do inquérito no STF (Caso Banco Master / Filme Dark Horse — R$ 134 milhões).",
    impactoEleitoral:
      "O contraste final opõe a agenda trabalhista e social de Lula (com o desafio fiscal de 2027) à pauta conservadora de Flávio Bolsonaro (pressionada pelas condenações do pai e de deputados do PL no STF).",
    destaqueCor: "blue",
    fontes: ["STF", "IBGE", "DIEESE"],
  },
  {
    id: "news-4",
    data: "04 OUT 2026 • RESULTADO OFICIAL 1º TURNO",
    categoria: "APURAÇÃO OFICIAL TSE",
    manchete:
      "1º Turno terminou com diferença de apenas 1,87 p.p. entre Flávio Bolsonaro (47,03%) e Lula (45,16%)",
    resumo:
      "Segundo a totalização oficial do Tribunal Superior Eleitoral (119.300.788 votos válidos), Flávio Bolsonaro (PL) recebeu 56.104.268 votos (47,03%) e Luiz Inácio Lula da Silva (PT) obteve 53.876.617 votos (45,16%). Votos brancos somaram 2.300.781 (1,84%) e nulos 3.674.149 (2,93%), além da renovação da Câmara com o PL elegendo a maior bancada (121 deputados).",
    impactoEleitoral:
      "Os 5,97 milhões de brasileiros que votaram branco/nulo e os eleitores da 3ª via tornaram-se o público-alvo central das duas campanhas para o 2º turno em 25 de outubro.",
    destaqueCor: "rose",
    fontes: ["TSE"],
  },
];

// ============================================================================
// COMPONENTES AUXILIARES DE UI (ESTILO CARIMBO TÉCNICO URBANO EM TEMA BRANCO)
// ============================================================================

const SOURCE_STYLES: Record<
  SourceBadgeType,
  {
    bg: string;
    text: string;
    border: string;
    nomeCompleto: string;
    url: string;
    descricao: string;
  }
> = {
  IBGE: {
    bg: "bg-blue-50 hover:bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    nomeCompleto: "Instituto Brasileiro de Geografia e Estatística",
    url: "https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais.html",
    descricao:
      "Sistema de Contas Nacionais (PIB real e per capita), PME, PNAD Contínua (Desocupação e Índice de Gini) e INPC.",
  },
  BCB: {
    bg: "bg-amber-50 hover:bg-amber-100",
    text: "text-amber-900",
    border: "border-amber-300",
    nomeCompleto: "Banco Central do Brasil (SGS / Estatísticas Fiscais)",
    url: "https://www.bcb.gov.br/estatisticas/estatisticasfiscais",
    descricao:
      "Dívida Bruta do Governo Geral (DBGG em % do PIB), Taxa Selic, Juro Real ex-ante/ex-post e Resultado Nominal.",
  },
  TN: {
    bg: "bg-yellow-50 hover:bg-yellow-100",
    text: "text-yellow-900",
    border: "border-yellow-400",
    nomeCompleto: "Secretaria do Tesouro Nacional (Transparente)",
    url: "https://www.tesourotransparente.gov.br",
    descricao:
      "Resultado Primário do Governo Central, Carga Tributária Bruta (32,40% do PIB em 2025) e Boletins Fiscais.",
  },
  INPE: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-300",
    nomeCompleto: "Instituto Nacional de Pesquisas Espaciais (TerraBrasilis / PRODES)",
    url: "https://terrabrasilis.dpi.inpe.br",
    descricao:
      "Monitoramento orbital da Amazônia Legal (série histórica PRODES 1988–2026 e alertas DETER em tempo real).",
  },
  STF: {
    bg: "bg-rose-50 hover:bg-rose-100",
    text: "text-rose-800",
    border: "border-rose-300",
    nomeCompleto: "Supremo Tribunal Federal (Portal de Jurisprudência e Processos)",
    url: "https://portal.stf.jus.br",
    descricao:
      "Acórdãos da 1ª Turma e Plenário (AP 470, Trama Golpista 2025, Orçamento Secreto 2026, Inquérito Banco Master, HC 193.726 e HC 164.493).",
  },
  STJ: {
    bg: "bg-indigo-50 hover:bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-300",
    nomeCompleto: "Superior Tribunal de Justiça (Consulta Processual)",
    url: "https://www.stj.jus.br",
    descricao:
      "Julgamentos da 5ª Turma (RHC sobre anulação de quebras de sigilo bancário/fiscal por incompetência de foro na Alerj).",
  },
  TSE: {
    bg: "bg-sky-50 hover:bg-sky-100",
    text: "text-sky-800",
    border: "border-sky-300",
    nomeCompleto: "Tribunal Superior Eleitoral (Resultados e DivulgaCandContas)",
    url: "https://resultados.tse.jus.br",
    descricao:
      "Apuração oficial do 1º e 2º turno de 2026, Fundo Eleitoral (FEFC), Fundo Partidário, AIJEs de inelegibilidade e multas.",
  },
  DIEESE: {
    bg: "bg-teal-50 hover:bg-teal-100",
    text: "text-teal-800",
    border: "border-teal-300",
    nomeCompleto: "Departamento Intersindical de Estatística e Estudos Socioeconômicos",
    url: "https://www.dieese.org.br",
    descricao:
      "Série histórica do Salário Mínimo Nominal vs. Necessário, Pesquisa da Cesta Básica e ganho real pelo INPC.",
  },
  CGU: {
    bg: "bg-orange-50 hover:bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-300",
    nomeCompleto: "Controladoria-Geral da União / Portal da Transparência",
    url: "https://portaldatransparencia.gov.br",
    descricao:
      "Auditorias de desinvestimentos (Refinaria RLAM), execução de emendas parlamentares e gastos globais com diárias e passagens.",
  },
  MCTI: {
    bg: "bg-blue-50 hover:bg-blue-100",
    text: "text-blue-900",
    border: "border-blue-300",
    nomeCompleto: "Ministério da Ciência, Tecnologia e Inovação / FNDCT",
    url: "https://www.gov.br/mcti/pt-br",
    descricao:
      "Execução orçamentária do FNDCT, bolsas científicas CNPq e reversão da liquidação da estatal de semicondutores CEITEC.",
  },
  MDIC: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    text: "text-emerald-900",
    border: "border-emerald-300",
    nomeCompleto: "Ministério do Desenvolvimento, Indústria, Comércio e Serviços (ComexStat)",
    url: "https://www.gov.br/mdic/pt-br",
    descricao:
      "Balança comercial, negociações tarifárias internacionais, Nova Indústria Brasil e abertura de +300 mercados externos.",
  },
  LUPA: {
    bg: "bg-purple-50 hover:bg-purple-100",
    text: "text-purple-900",
    border: "border-purple-300",
    nomeCompleto: "Agência Lupa (Rede Internacional de Fact-Checking — IFCN)",
    url: "https://lupa.uol.com.br",
    descricao:
      "Checagem independente em tempo real dos debates presidenciais de 2026 (Band, Globo e sabatinas) e verificação de dados públicos.",
  },
  AOSFATOS: {
    bg: "bg-fuchsia-50 hover:bg-fuchsia-100",
    text: "text-fuchsia-900",
    border: "border-fuchsia-300",
    nomeCompleto: "Aos Fatos (Agência Signatária do Código de Princípios da IFCN)",
    url: "https://www.aosfatos.org",
    descricao:
      "Auditoria factual de discursos, programas de governo e declarações dos candidatos no 1º e 2º turno das Eleições 2026.",
  },
};

function SourceBadge({ source }: { source: SourceBadgeType }) {
  const style = SOURCE_STYLES[source];
  return (
    <a
      href={style.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Fonte Oficial Auditada: ${style.nomeCompleto}\n${style.descricao}\nClique para abrir o portal oficial (${style.url})`}
      className={`group inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-bold tracking-wider border ${style.bg} ${style.text} ${style.border} transition-all duration-150 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`}
    >
      <span>[{source}]</span>
      <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity print:hidden shrink-0" />
    </a>
  );
}

/**
 * Brasão / Ícone Arquitetônico Cívico Urbano-Orgânico da República (Bandeira + Telemetria de Dados)
 */
function BandeiraBrasilUrbanEmblem({
  className = "w-11 h-9 sm:w-14 sm:h-11",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-zinc-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] sm:shadow-[3px_3px_0px_#18181b] shrink-0 group ${className}`}
      title="República Federativa do Brasil • Observatório Quantitativo Urbano (2003–2026)"
    >
      <svg
        viewBox="0 0 64 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Fundo Esmeralda Arquitetônico */}
        <rect width="64" height="48" fill="url(#urbanGreenCrest)" />

        {/* Malha Cartográfica de Precisão */}
        <path
          d="M0 12H64M0 24H64M0 36H64M16 0V48M32 0V48M48 0V48"
          stroke="#FFFFFF"
          strokeOpacity="0.14"
          strokeWidth="0.6"
        />

        {/* Cantoneiras Técnicas Urbanas em Ouro */}
        <path
          d="M4 10V4H10"
          stroke="#FACC15"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 10V4H54"
          stroke="#FACC15"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 38V44H10"
          stroke="#FACC15"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 38V44H54"
          stroke="#FACC15"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Losango Ouro Canário com Contorno Duplo */}
        <path
          d="M32 3.5L58.5 24L32 44.5L5.5 24L32 3.5Z"
          fill="url(#urbanGoldDiamond)"
          stroke="#18181B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M32 6.5L54.5 24L32 41.5L9.5 24L32 6.5Z"
          stroke="#92400E"
          strokeOpacity="0.35"
          strokeWidth="0.7"
        />

        {/* Esfera Celestial Azul República */}
        <circle
          cx="32"
          cy="24"
          r="11.8"
          fill="url(#urbanBlueSphere)"
          stroke="#18181B"
          strokeWidth="1.5"
        />

        {/* Colunas Quantitativas Internas (Símbolo do Observatório de Dados) */}
        <rect x="25" y="26.5" width="2.3" height="5" rx="0.8" fill="#34D399" />
        <rect x="28.6" y="23.8" width="2.3" height="7.7" rx="0.8" fill="#FACC15" />
        <rect x="32.2" y="21.2" width="2.3" height="10.3" rx="0.8" fill="#FFFFFF" />
        <rect x="35.8" y="18.5" width="2.3" height="13" rx="0.8" fill="#34D399" />

        {/* Faixa Equatorial Orgânica Branca */}
        <path
          d="M20.6 21.8C25.5 18.5 38.5 19.8 43.4 25.4"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Cruzeiro do Sul + Estrela Espiga */}
        <circle cx="35.5" cy="16.5" r="1.05" fill="#FACC15" />
        <circle cx="32" cy="29.5" r="0.85" fill="#FACC15" />
        <circle cx="32" cy="33" r="0.75" fill="#FFFFFF" />
        <circle cx="29.5" cy="31" r="0.7" fill="#FFFFFF" />
        <circle cx="34.5" cy="30.8" r="0.7" fill="#FFFFFF" />

        <defs>
          <linearGradient
            id="urbanGreenCrest"
            x1="0"
            y1="0"
            x2="64"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10B981" />
            <stop offset="0.55" stopColor="#059669" />
            <stop offset="1" stopColor="#065F46" />
          </linearGradient>
          <linearGradient
            id="urbanGoldDiamond"
            x1="6"
            y1="4"
            x2="58"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEF08A" />
            <stop offset="0.45" stopColor="#FACC15" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient
            id="urbanBlueSphere"
            x1="20"
            y1="12"
            x2="44"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function ObservatorioRepublicaPage() {
  const [activeTab, setActiveTab] = useState<TabId>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dossierFilter, setDossierFilter] = useState<
    "todos" | "PL" | "metodologico"
  >("todos");
  const [factCheckFilter, setFactCheckFilter] = useState<
    "todos" | "FALSO" | "ENGANOSO" | "VERDADEIRO"
  >("todos");

  // Estados da Calculadora / Simulador da Equação da Dívida Pública
  // Fórmula: Δd_t = ((r - g) / (1 + g)) * d_{t-1} - p_t
  const [simDebtPrev, setSimDebtPrev] = useState<number>(78.7);
  const [simRealRate, setSimRealRate] = useState<number>(7.0);
  const [simGdpGrowth, setSimGdpGrowth] = useState<number>(3.0);
  const [simPrimaryBalance, setSimPrimaryBalance] = useState<number>(-0.43);

  const debtSimulation = useMemo(() => {
    const rDecimal = simRealRate / 100;
    const gDecimal = simGdpGrowth / 100;

    const snowBallTerm =
      ((rDecimal - gDecimal) / (1 + gDecimal)) * simDebtPrev;
    const deltaDebt = snowBallTerm - simPrimaryBalance;
    const nextDebt = simDebtPrev + deltaDebt;
    const stabilizingPrimary = snowBallTerm;

    return {
      snowBallTerm,
      deltaDebt,
      nextDebt,
      stabilizingPrimary,
    };
  }, [simDebtPrev, simRealRate, simGdpGrowth, simPrimaryBalance]);

  const applyPreset = (
    preset: "lula1_2" | "bolsonaro" | "lula3" | "ajuste2027"
  ) => {
    if (preset === "lula1_2") {
      setSimDebtPrev(68.4);
      setSimRealRate(6.5);
      setSimGdpGrowth(4.0);
      setSimPrimaryBalance(3.16);
    } else if (preset === "bolsonaro") {
      setSimDebtPrev(74.3);
      setSimRealRate(3.2);
      setSimGdpGrowth(1.4);
      setSimPrimaryBalance(-1.8);
    } else if (preset === "lula3") {
      setSimDebtPrev(78.7);
      setSimRealRate(7.0);
      setSimGdpGrowth(3.0);
      setSimPrimaryBalance(-0.43);
    } else if (preset === "ajuste2027") {
      setSimDebtPrev(78.7);
      setSimRealRate(4.5);
      setSimGdpGrowth(3.0);
      setSimPrimaryBalance(1.5);
    }
  };

  const filteredDossiers = useMemo(() => {
    return JUDICIAL_DOSSIERS.filter((item) => {
      const matchesCategory =
        dossierFilter === "todos"
          ? true
          : dossierFilter === "PL"
          ? item.partidoPolo === "PL"
          : item.severidade === "metodologico";

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const fullText = [
        item.nome,
        item.cargo,
        item.resumoExecutivo,
        item.valoresEnvolvidos || "",
        ...item.statusCurtos,
        ...item.detalhesProcessuais,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && fullText.includes(q);
    });
  }, [dossierFilter, searchQuery]);

  const filteredFactChecks = useMemo(() => {
    return DEBATE_FACT_CHECKS.filter((item) => {
      if (factCheckFilter === "todos") return true;
      if (factCheckFilter === "FALSO") return item.veredito === "FALSO";
      if (factCheckFilter === "ENGANOSO")
        return item.veredito === "ENGANOSO" || item.veredito === "IMPRECISO";
      return item.veredito === "VERDADEIRO";
    });
  }, [factCheckFilter]);

  const handleNavigateTab = (tabId: TabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      if (tabId === "todos") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const idMap: Record<Exclude<TabId, "todos">, string> = {
        modulo1: "modulo-1",
        modulo2: "modulo-2",
        simulador: "simulador-divida",
        modulo3: "modulo-3",
        modulo4: "modulo-4",
        modulo5: "modulo-5",
      };

      const targetId = idMap[tabId];
      const el = document.getElementById(targetId);
      if (el) {
        // scrollIntoView respeita nativamente a classe scroll-mt configurada nas seções
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Scroll Spy: atualiza a aba ativa conforme o usuário rola a página no PC ou celular
  useEffect(() => {
    const sectionIds: Array<{ id: string; tab: TabId }> = [
      { id: "modulo-1", tab: "modulo1" },
      { id: "modulo-2", tab: "modulo2" },
      { id: "simulador-divida", tab: "simulador" },
      { id: "modulo-3", tab: "modulo3" },
      { id: "modulo-4", tab: "modulo4" },
      { id: "modulo-5", tab: "modulo5" },
    ];

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveTab("todos");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const item = sectionIds[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveTab(item.tab);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrintDossier = () => {
    setActiveTab("todos");
    setDossierFilter("todos");
    setFactCheckFilter("todos");
    setSearchQuery("");
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.print();
      }, 150);
    }
  };

  const NAV_ITEMS = [
    {
      id: "todos" as TabId,
      label: "00 // VISÃO COMPLETA",
      shortLabel: "Tudo",
      icon: FileText,
    },
    {
      id: "modulo1" as TabId,
      label: "01 // SOCIEDADE & ECONOMIA",
      shortLabel: "Sociedade",
      icon: BarChart3,
    },
    {
      id: "modulo2" as TabId,
      label: "02 // MATRIZ DE RISCOS",
      shortLabel: "Riscos",
      icon: ShieldAlert,
    },
    {
      id: "simulador" as TabId,
      label: "LAB // EQUAÇÃO DA DÍVIDA",
      shortLabel: "Dívida",
      icon: Calculator,
    },
    {
      id: "modulo3" as TabId,
      label: "03 // SOBERANIA VS. VIRALATISMO",
      shortLabel: "Soberania",
      icon: Globe2,
    },
    {
      id: "modulo4" as TabId,
      label: "04 // RAIO-X DO PL & STF",
      shortLabel: "PL / STF",
      icon: Scale,
    },
    {
      id: "modulo5" as TabId,
      label: "05 // DEBATES, MENTIRAS & NOTÍCIAS",
      shortLabel: "Debates",
      icon: Activity,
    },
  ];

  return (
    <div className="min-h-screen text-zinc-900 flex flex-col urban-concrete-bg pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* =====================================================================
          BARRA DE TELEMETRIA URBANA SUPERIOR (DESLIZÁVEL NO CELULAR)
      ===================================================================== */}
      <div className="bg-zinc-900 text-zinc-200 border-b border-zinc-800 px-3 sm:px-4 py-1.5 text-[11px] font-mono print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">
              BR-REPÚBLICA // 2003–2026
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] shrink-0">
            <span>
              PIB 03–10:{" "}
              <strong className="text-emerald-400">+37,3%</strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span>
              DESEMPREGO 2025:{" "}
              <strong className="text-emerald-400">5,6%</strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span>
              DBGG 2025:{" "}
              <strong className="text-yellow-400">78,7% PIB</strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span>
              PRODES 2026:{" "}
              <strong className="text-emerald-400">3.335 km²</strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span>
              STF 2025:{" "}
              <strong className="text-rose-400">27A 3M</strong>
            </span>
          </div>
        </div>
      </div>

      {/* FAIXA DE SINALIZAÇÃO TRICOLOR (VERDE, AMARELO VIÁRIO E AZUL) */}
      <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-emerald-600 via-yellow-400 to-blue-700 print:hidden" />

      {/* =====================================================================
          HEADER COMPACTO NO CELULAR & COMPLETO NO DESKTOP (OCULTO NO PDF)
      ===================================================================== */}
      <header className="sticky top-0 z-40 border-b-2 border-zinc-900 bg-white/95 backdrop-blur-xl shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <BandeiraBrasilUrbanEmblem />
            <div className="min-w-0">
              <div className="hidden sm:flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-zinc-900 text-yellow-300">
                  DOC // BR-2003-2026
                </span>
                <span className="text-xs text-emerald-700 font-mono font-bold">
                  • ARQUITETURA DE DADOS PÚBLICOS
                </span>
              </div>
              <h1 className="text-sm sm:text-xl md:text-2xl font-display font-bold tracking-tight text-zinc-950 uppercase leading-tight">
                <span className="block truncate sm:whitespace-normal">
                  Observatório Quantitativo da República
                </span>
                <span className="block text-xs sm:text-base md:text-lg text-emerald-700 underline decoration-yellow-400 decoration-2 sm:decoration-4 underline-offset-2 sm:underline-offset-4 mt-0.5">
                  (2003–2026)
                </span>
              </h1>
              <div className="sm:hidden text-[10px] font-mono text-zinc-500 truncate">
                Dossiê Oficial Auditado • IBGE • BCB • STF • INPE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/instagram-posts.html"
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir Gerador de Cards e Carrossel para Instagram (Foco em Eleitores Indecisos)"
              className="touch-manipulation select-none active:scale-95 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] sm:shadow-[4px_4px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4 stroke-[2.5] shrink-0 text-yellow-300" />
              <span className="hidden lg:inline">Cards p/ Instagram</span>
              <span className="lg:hidden font-mono font-extrabold">INSTA</span>
            </a>

            <button
              onClick={handlePrintDossier}
              type="button"
              title="Baixar Dossiê Completo em PDF (Formato A4 Organizado)"
              className="touch-manipulation select-none active:scale-95 inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-display font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] sm:shadow-[4px_4px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="hidden sm:inline">
                Baixar Dossiê Completo em PDF
              </span>
              <span className="sm:hidden font-mono font-extrabold">
                BAIXAR PDF
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          CONTEÚDO PRINCIPAL
      ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 print:py-0 print:px-0 space-y-6 sm:space-y-10 print:space-y-5">
        {/* ===================================================================
            CABEÇALHO EDITORIAL EXCLUSIVO PARA O PDF (CAPA OFICIAL A4)
        =================================================================== */}
        <section className="hidden print:block border-2 border-zinc-900 rounded-2xl p-4 bg-white print-avoid-break">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-yellow-400 to-blue-700 rounded-full mb-3" />
          <div className="flex items-center justify-between gap-4 border-b border-zinc-300 pb-3">
            <div className="flex items-center gap-3">
              <BandeiraBrasilUrbanEmblem className="w-14 h-11" />
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-800">
                  REPÚBLICA FEDERATIVA DO BRASIL • RELATÓRIO TÉCNICO INTEGRAL AUDITADO
                </div>
                <h1 className="text-xl font-display font-bold text-zinc-950 uppercase leading-tight">
                  <span className="block">Observatório Quantitativo da República</span>
                  <span className="block text-sm text-emerald-700 mt-0.5">(2003–2026)</span>
                </h1>
                <p className="text-[11px] font-mono text-zinc-600">
                  Comparação Empírica: Luiz Inácio Lula da Silva (2003–2010 / 2023–2026) vs. Jair Bolsonaro / Flávio Bolsonaro (2019–2022 / Plano 2026)
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-[10px] text-zinc-700 shrink-0 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2">
              <div className="font-bold text-zinc-950">DOC // BR-2003-2026</div>
              <div>EDIÇÃO INTEGRAL A4</div>
              <div className="text-emerald-800 font-bold">4 MÓDULOS + LAB FISCAL</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2.5 text-[10px] font-mono">
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-2">
              <strong className="text-emerald-900 block">MÓDULO 01 // SOCIEDADE</strong>
              PIB, Trabalho, Gini, Salário Mínimo e PRODES/Amazônia
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2">
              <strong className="text-amber-900 block">MÓDULO 02 // RISCOS & DÍVIDA</strong>
              Dominância Fiscal (r &gt; g) vs. Ruptura Institucional + Equação DBGG
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-2">
              <strong className="text-blue-900 block">MÓDULO 03 // SOBERANIA</strong>
              Petrobras/PPI, Semicondutores/FNDCT e Diplomacia Comercial
            </div>
            <div className="bg-rose-50 border border-rose-300 rounded-lg p-2">
              <strong className="text-rose-900 block">MÓDULO 04 // PL & STF</strong>
              Orçamento Público Eleitoral, 5 Dossiês do PL e Nota Metodológica
            </div>
          </div>
        </section>

        {/* ===================================================================
            HERO SECTION URBANA EM TEMA BRANCO (CALÇADÃO ORGÂNICO + 4 KPIs)
        =================================================================== */}
        <section className="space-y-4 sm:space-y-6 print-avoid-break">
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] sm:shadow-[6px_6px_0px_#18181b] p-4 sm:p-8 print:p-4 relative overflow-hidden">
            {/* Barra lateral esquerda tricolor estilo pilastra de concreto urbano */}
            <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-2.5 bg-gradient-to-b from-emerald-600 via-yellow-400 to-blue-700" />

            {/* Arte Vetorial Urbana + Ondas Orgânicas do Calçadão Brasileiro no fundo */}
            <svg
              className="hidden sm:block print:hidden absolute right-0 top-0 w-[520px] h-full opacity-[0.08] pointer-events-none"
              viewBox="0 0 500 360"
              fill="none"
            >
              <path
                d="M0 280C80 230 160 330 240 280C320 230 400 330 480 280"
                stroke="#047857"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M0 325C80 275 160 375 240 325C320 275 400 375 480 325"
                stroke="#EAB308"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M330 20L470 130L330 240L190 130L330 20Z"
                stroke="#18181B"
                strokeWidth="4"
              />
              <circle
                cx="330"
                cy="130"
                r="60"
                stroke="#1D4ED8"
                strokeWidth="4"
              />
            </svg>

            <div className="relative z-10 max-w-4xl space-y-2.5 sm:space-y-3.5 pl-2 print:hidden">
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 bg-emerald-400 px-2.5 sm:px-3 py-1 rounded-md border border-zinc-900 shadow-[2px_2px_0px_#facc15]">
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span>
                  FONTES: IBGE • BCB • TESOURO • INPE • STF • STJ • TSE
                </span>
              </div>

              <h2 className="text-lg sm:text-3xl md:text-4xl font-display font-bold text-zinc-950 tracking-tight leading-snug sm:leading-tight uppercase">
                Comparação Empírica de Governos, Riscos Sistêmicos, Soberania
                Nacional e Responsabilização Judicial
              </h2>

              <p className="text-zinc-700 text-xs sm:text-base leading-relaxed">
                Dossiê urbano de transparência pública que contrasta, sem
                cortes ou omissões, os dados oficiais entre os governos de{" "}
                <strong className="text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300 inline-block my-0.5">
                  Luiz Inácio Lula da Silva (2003–2010 e 2023–2026)
                </strong>{" "}
                e{" "}
                <strong className="text-amber-900 font-bold bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-400 inline-block my-0.5">
                  Jair Bolsonaro / Flávio Bolsonaro (2019–2022 e Plano 2026)
                </strong>
                .
              </p>
            </div>

            {/* 4 KPIs de Impacto Rápido Estilo Painel Urbano Claro */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 print-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-7 print:mt-0 pl-2">
              {HERO_KPIS.map((kpi) => {
                const cardStyle =
                  kpi.tendencia === "positivo"
                    ? "border-l-4 border-l-emerald-600 border-zinc-200 bg-emerald-50/40"
                    : kpi.tendencia === "alerta"
                    ? "border-l-4 border-l-amber-500 border-zinc-200 bg-amber-50/50"
                    : "border-l-4 border-l-rose-600 border-zinc-200 bg-rose-50/50";

                const valueColor =
                  kpi.tendencia === "positivo"
                    ? "text-emerald-700"
                    : kpi.tendencia === "alerta"
                    ? "text-amber-700"
                    : "text-rose-700";

                const IconComponent =
                  kpi.tendencia === "positivo"
                    ? TrendingUp
                    : kpi.tendencia === "alerta"
                    ? AlertTriangle
                    : ShieldAlert;

                return (
                  <div
                    key={kpi.id}
                    className={`rounded-2xl border ${cardStyle} p-3.5 sm:p-4 print:p-2.5 flex flex-col justify-between transition-all duration-200 shadow-sm`}
                  >
                    <div className="space-y-1.5 sm:space-y-2 print:space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                          {kpi.codigo}
                        </span>
                        <IconComponent
                          className={`w-4 h-4 ${valueColor} shrink-0`}
                        />
                      </div>
                      <div className="text-xs font-bold text-zinc-800">
                        {kpi.titulo}
                      </div>
                      <div
                        className={`text-lg sm:text-xl print:text-sm font-extrabold font-mono ${valueColor}`}
                      >
                        {kpi.valorPrincipal}
                      </div>
                      <p className="text-xs print:text-[10px] text-zinc-700 leading-relaxed">
                        {kpi.subtitulo}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 print:mt-2 pt-2.5 print:pt-1.5 border-t border-zinc-200/80">
                      {kpi.fontes.map((f) => (
                        <SourceBadge key={f} source={f} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            BARRA DE NAVEGAÇÃO POR ABAS + FILTRO DE BUSCA RÁPIDA (SWIPE NO CELULAR)
        =================================================================== */}
        <section className="print:hidden space-y-3">
          <div className="rounded-2xl bg-white border-2 border-zinc-900 p-3 sm:p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-[3px_3px_0px_#18181b] sm:shadow-[4px_4px_0px_#18181b]">
            {/* Abas com Swipe Horizontal Suave no Celular */}
            <nav
              aria-label="Navegação por Setores"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap snap-x"
            >
              {NAV_ITEMS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleNavigateTab(tab.id)}
                    className={`touch-manipulation select-none active:scale-95 shrink-0 snap-start inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-emerald-500 text-zinc-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#facc15]"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950 border border-zinc-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Filtro de Busca Rápida */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar indicador, processo, valor..."
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-zinc-50 border-2 border-zinc-300 text-xs sm:text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  title="Limpar busca"
                  className="touch-manipulation active:scale-90 absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-700 hover:text-zinc-950 w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-200 border border-zinc-300 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================================
            MÓDULO 1: QUEM BENEFICIOU MAIS A SOCIEDADE? (DADOS MACROECONÔMICOS E SOCIAIS)
        =================================================================== */}
        <section
          id="modulo-1"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-5 sm:space-y-6 print:block"
        >
          {/* Cabeçalho Urbano de Setor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-zinc-900 pb-3 sm:pb-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-500 text-zinc-950 border-2 border-zinc-900 font-mono font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#facc15] shrink-0">
                SETOR 01
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 block">
                  Indicadores Empíricos Oficiais • Economia Real & Amazônia
                </span>
                <h2 className="text-lg sm:text-2xl font-display font-bold text-zinc-950 uppercase leading-snug">
                  Quem Beneficiou Mais a Sociedade? (Dados Macroeconômicos,
                  Sociais e Ambientais)
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <SourceBadge source="IBGE" />
              <SourceBadge source="DIEESE" />
              <SourceBadge source="INPE" />
            </div>
          </div>

          {/* 1.1 PIB Real Acumulado e Média Anual (IBGE) */}
          <div className="rounded-2xl sm:rounded-3xl urban-card p-4 sm:p-7 space-y-5 sm:space-y-6 print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    PIB Real Acumulado, Média Anual e PIB per Capita (IBGE)
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                  Total combinado Lula I e II (2003–2010):{" "}
                  <strong className="text-emerald-700 font-mono">
                    +37,3% acum. (+4,0% a.a.)
                  </strong>{" "}
                  | Bolsonaro (2019–2022):{" "}
                  <strong className="text-amber-700 font-mono">
                    +5,6% acum. (+1,4% a.a.)
                  </strong>{" "}
                  | Lula III (2023–2025):{" "}
                  <strong className="text-emerald-700 font-mono">
                    +9,2% no triênio (+3,0% a.a.)
                  </strong>
                </p>
              </div>
              <div className="self-start sm:self-auto">
                <SourceBadge source="IBGE" />
              </div>
            </div>

            {/* Gráfico Visual de Barras Proporcionais para o PIB */}
            <div className="grid grid-cols-1 lg:grid-cols-2 print-cols-2 gap-4 sm:gap-6">
              {GDP_DATA.map((item) => {
                const widthAcum = Math.min(
                  100,
                  Math.round((item.pibAcumulado / 20) * 100)
                );
                const widthPerCapita = Math.min(
                  100,
                  Math.round((item.pibPerCapita / 20) * 100)
                );

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl bg-zinc-50 border border-zinc-200 ${item.bordaLateral} p-4 sm:p-5 print:p-3.5 space-y-3.5 sm:space-y-4 print:space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                          {item.codigoUrbano}
                        </span>
                        <h4 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase">
                          {item.governo}{" "}
                          <span className="text-xs font-mono text-zinc-500 font-normal block sm:inline">
                            ({item.periodo})
                          </span>
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-base sm:text-lg font-mono font-extrabold ${item.corTexto}`}
                        >
                          {item.pibAcumuladoLabel}
                        </span>
                        <div className="text-xs font-mono text-zinc-600">
                          Média: {item.mediaAnualLabel}
                        </div>
                      </div>
                    </div>

                    {/* Barra PIB Acumulado */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs gap-2">
                        <span className="text-zinc-700 font-mono">
                          PIB Real Acumulado
                        </span>
                        <span
                          className={`font-mono font-bold shrink-0 ${item.corTexto}`}
                        >
                          {item.pibAcumuladoLabel} ({item.mediaAnualLabel})
                        </span>
                      </div>
                      <div className="w-full h-3.5 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                        <div
                          className={`h-full ${item.corBarra} transition-all duration-500`}
                          style={{ width: `${widthAcum}%` }}
                        />
                      </div>
                    </div>

                    {/* Barra PIB per Capita */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs gap-2">
                        <span className="text-zinc-700 font-mono">
                          PIB per Capita
                        </span>
                        <span className="font-mono font-bold text-blue-700 shrink-0">
                          {item.pibPerCapitaLabel}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                        <div
                          className="h-full bg-gradient-to-r from-blue-700 to-sky-500 transition-all duration-500"
                          style={{ width: `${widthPerCapita}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed pt-2 border-t border-zinc-200">
                      {item.observacao}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Faixa de Síntese Acumulada */}
            <div className="rounded-2xl bg-emerald-50/70 border-l-4 border-l-emerald-600 border border-emerald-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-[11px] sm:text-xs font-mono uppercase text-emerald-800 font-bold">
                  // SÍNTESE HISTÓRICA ACUMULADA (2003–2010 vs. 2019–2022 vs.
                  2023–2025)
                </div>
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                  No consolidado dos dois primeiros mandatos de Lula (2003–2010),
                  o PIB Real cresceu{" "}
                  <strong className="text-emerald-800 font-mono">
                    +37,3% acumulado
                  </strong>{" "}
                  (média de{" "}
                  <strong className="text-emerald-800 font-mono">
                    +4,0% a.a.
                  </strong>
                  ), contra{" "}
                  <strong className="text-amber-800 font-mono">
                    +5,6% acumulado (+1,4% a.a.)
                  </strong>{" "}
                  no governo Bolsonaro (2019–2022) e{" "}
                  <strong className="text-emerald-800 font-mono">
                    +9,2% no triênio 2023–2025 (+3,0% a.a.)
                  </strong>{" "}
                  em Lula III.
                </p>
              </div>
              <div className="self-start sm:self-auto">
                <SourceBadge source="IBGE" />
              </div>
            </div>
          </div>

          {/* 1.2 Mercado de Trabalho e Renda (IBGE / DIEESE) */}
          <div className="rounded-2xl sm:rounded-3xl urban-card p-4 sm:p-7 space-y-5 sm:space-y-6 print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-700 shrink-0" />
                  <span>
                    Mercado de Trabalho, Desigualdade (Gini) e Salário Mínimo
                    (IBGE / DIEESE)
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Comparativo direto da taxa de desocupação, distribuição de
                  renda domiciliar e valorização real do salário mínimo.
                </p>
              </div>
              <div className="flex gap-1.5 self-start sm:self-auto">
                <SourceBadge source="IBGE" />
                <SourceBadge source="DIEESE" />
              </div>
            </div>

            {/* VERSÃO CELULAR (CARDS EMPILHADOS SEM ROLAGEM HORIZONTAL) */}
            <div className="grid grid-cols-1 gap-4 md:hidden print:hidden">
              {LABOR_INCOME_DATA.map((row) => (
                <div
                  key={row.indicador}
                  className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-zinc-200 pb-2.5">
                    <div>
                      <h4 className="text-sm font-display font-bold text-zinc-950 uppercase">
                        {row.indicador}
                      </h4>
                      <div className="text-[11px] text-emerald-700 font-mono font-semibold mt-0.5">
                        ★ {row.destaque}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {row.fontes.map((f) => (
                        <SourceBadge key={f} source={f} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border-l-4 border-l-emerald-600 border border-zinc-200">
                      <span className="font-mono font-bold text-emerald-800 block uppercase text-[10px]">
                        Lula I e II (2003–2010)
                      </span>
                      <span className="text-zinc-800">{row.lula1e2}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border-l-4 border-l-amber-500 border border-zinc-200">
                      <span className="font-mono font-bold text-amber-800 block uppercase text-[10px]">
                        Bolsonaro (2019–2022)
                      </span>
                      <span className="text-zinc-800">{row.bolsonaro}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border-l-4 border-l-emerald-600 border border-emerald-200">
                      <span className="font-mono font-bold text-emerald-800 block uppercase text-[10px]">
                        Lula III (2023–2026)
                      </span>
                      <span className="text-emerald-950 font-semibold">
                        {row.lula3}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VERSÃO DESKTOP & IMPRESSÃO PDF (TABELA COMPLETA) */}
            <div className="hidden md:block print:block overflow-x-auto rounded-2xl border border-zinc-300">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900 text-white text-xs font-mono uppercase border-b border-zinc-300">
                    <th className="py-4 px-4">Indicador Social / Trabalhista</th>
                    <th className="py-4 px-4 text-emerald-300">
                      Lula I e II (2003–2010)
                    </th>
                    <th className="py-4 px-4 text-yellow-300">
                      Bolsonaro (2019–2022)
                    </th>
                    <th className="py-4 px-4 text-emerald-300">
                      Lula III (2023–2026)
                    </th>
                    <th className="py-4 px-4">Fontes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-sm">
                  {LABOR_INCOME_DATA.map((row) => (
                    <tr
                      key={row.indicador}
                      className="bg-white hover:bg-zinc-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-zinc-900">
                        <div>{row.indicador}</div>
                        <div className="text-xs text-emerald-700 font-mono mt-1">
                          ★ {row.destaque}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-800">{row.lula1e2}</td>
                      <td className="py-4 px-4 text-zinc-700">
                        {row.bolsonaro}
                      </td>
                      <td className="py-4 px-4 text-emerald-800 font-semibold">
                        {row.lula3}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {row.fontes.map((f) => (
                            <SourceBadge key={f} source={f} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Barras Visuais Comparativas: Desemprego e Salário Mínimo */}
            <div className="grid grid-cols-1 md:grid-cols-2 print-cols-2 gap-4 sm:gap-6 pt-1">
              {/* Gráfico Desemprego */}
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase font-mono">
                    Taxa de Desemprego (Menor = Melhor)
                  </h4>
                  <SourceBadge source="IBGE" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1 gap-2">
                      <span className="text-zinc-700">
                        Lula I/II (12,3% → 6,7% PME)
                      </span>
                      <span className="font-mono text-emerald-700 font-bold shrink-0">
                        6,7% (2010)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                        style={{ width: "45%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 gap-2">
                      <span className="text-zinc-700">
                        Bolsonaro (Média 12,1% | Fim 9,3%)
                      </span>
                      <span className="font-mono text-amber-700 font-bold shrink-0">
                        12,1% média
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-yellow-500"
                        style={{ width: "82%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 gap-2">
                      <span className="text-zinc-700">
                        Lula III (Média 6,7% | Mínima 2025)
                      </span>
                      <span className="font-mono text-emerald-700 font-bold shrink-0">
                        5,6% (Mín.)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-yellow-400"
                        style={{ width: "37%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico Valorização Real do Salário Mínimo */}
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase font-mono">
                    Valorização Real do Salário Mínimo
                  </h4>
                  <SourceBadge source="DIEESE" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-700">
                        Lula I e II (2003–2010)
                      </span>
                      <span className="font-mono text-emerald-700 font-bold">
                        +53,6% real
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-400"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-700">
                        Bolsonaro (2019–2022)
                      </span>
                      <span className="font-mono text-amber-700 font-bold">
                        +1,3% real
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: "4%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-700">
                        Lula III (2023–2026)
                      </span>
                      <span className="font-mono text-emerald-700 font-bold">
                        +8,8% real
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                        style={{ width: "22%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1.3 Meio Ambiente e Desmatamento na Amazônia (INPE / PRODES) */}
          <div className="rounded-2xl sm:rounded-3xl urban-card p-4 sm:p-7 space-y-5 sm:space-y-6 print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase flex items-center gap-2">
                  <Trees className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    Meio Ambiente e Desmatamento na Amazônia Legal (INPE /
                    PRODES)
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Monitoramento oficial por satélite (PRODES/DETER), governança
                  ambiental e fiscalização do Ibama.
                </p>
              </div>
              <div className="self-start sm:self-auto">
                <SourceBadge source="INPE" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 print-cols-3 gap-4 sm:gap-5">
              {ENVIRONMENT_DATA.map((env) => {
                const isPositivo = env.status === "positivo";
                const cardBorder = isPositivo
                  ? "border-l-4 border-l-emerald-600 border-zinc-200 bg-emerald-50/30"
                  : "border-l-4 border-l-rose-600 border-zinc-200 bg-rose-50/30";
                const badgeColor = isPositivo
                  ? "text-emerald-800 bg-emerald-100 border-emerald-300"
                  : "text-rose-800 bg-rose-100 border-rose-300";
                const barColor = isPositivo
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
                  : "bg-gradient-to-r from-rose-600 to-rose-500";
                const barWidth = Math.min(
                  100,
                  Math.round((env.kmAnoNumerico / 14000) * 100)
                );

                return (
                  <div
                    key={env.id}
                    className={`rounded-2xl border ${cardBorder} p-4 sm:p-5 flex flex-col justify-between space-y-4`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block">
                            {env.codigo}
                          </span>
                          <span className="text-sm font-display font-bold text-zinc-950 uppercase">
                            {env.ciclo}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border shrink-0 ${badgeColor}`}
                        >
                          {env.variacao}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-zinc-800 bg-white p-3 rounded-xl border border-zinc-200">
                        {env.taxaReferencia}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-zinc-600 font-mono">
                          <span>Patamar Anual</span>
                          <span>
                            {env.kmAnoNumerico.toLocaleString("pt-BR")} km²/ano
                          </span>
                        </div>
                        <div className="w-full h-3 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                          <div
                            className={`h-full ${barColor}`}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-zinc-700 leading-relaxed">
                        {env.marcosInstitucionais}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-500">
                        Série Histórica PRODES
                      </span>
                      <SourceBadge source="INPE" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            MÓDULO 2: QUAL É O MAIS PERIGOSO? (MATRIZ FRIA DE RISCOS SISTÊMICOS)
        =================================================================== */}
        <section
          id="modulo-2"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-5 sm:space-y-6 print:block print-page-break"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-zinc-900 pb-3 sm:pb-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-yellow-400 text-zinc-950 border-2 border-zinc-900 font-mono font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#f43f5e] shrink-0">
                SETOR 02
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block">
                  Diagnóstico Estrutural de Vulnerabilidades
                </span>
                <h2 className="text-lg sm:text-2xl font-display font-bold text-zinc-950 uppercase leading-snug">
                  Qual é o Mais Perigoso? (Matriz Fria de Riscos Sistêmicos)
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <SourceBadge source="BCB" />
              <SourceBadge source="TN" />
              <SourceBadge source="STF" />
              <SourceBadge source="TSE" />
            </div>
          </div>

          {/* Comparação Lado a Lado dos Dois Perigos Opostos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 print-cols-2 gap-5 sm:gap-6">
            {/* COLUNA 1: O PERIGO DO MODELO LULA (DOMINÂNCIA FISCAL) */}
            <div className="rounded-2xl sm:rounded-3xl urban-card-yellow overflow-hidden flex flex-col justify-between print-avoid-break">
              <div className="h-3 sm:h-3.5 w-full urban-Caution-stripe border-b border-amber-300" />

              <div className="p-4 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-yellow-400 text-zinc-950 border border-zinc-900">
                        <Flame className="w-3.5 h-3.5 shrink-0" />
                        VETOR 01 // RISCO MACRO-FISCAL
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-950 pt-1 uppercase leading-snug">
                        1. O Perigo do Modelo Lula: Risco de Dominância Fiscal e
                        &ldquo;Bola de Neve&rdquo;
                      </h3>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <SourceBadge source="BCB" />
                      <SourceBadge source="TN" />
                    </div>
                  </div>

                  {/* Contraste Histórico Fiscal 2003-2010 vs 2023-2025 */}
                  <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-3.5 sm:p-4 space-y-3">
                    <div className="text-xs font-mono uppercase text-amber-900 font-bold">
                      // Inversão do Regime Fiscal: Lula I/II vs. Lula III
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      Embora em{" "}
                      <strong className="text-emerald-700">2003–2010</strong>{" "}
                      tenha gerado superávits primários médios de{" "}
                      <strong className="text-emerald-700 font-mono">
                        +3,16% do PIB
                      </strong>{" "}
                      e reduzido a Dívida Bruta (DBGG) em{" "}
                      <strong className="text-emerald-700 font-mono">
                        11,9 p.p.
                      </strong>
                      , em{" "}
                      <strong className="text-amber-800">
                        Lula III (2023–2025)
                      </strong>{" "}
                      houve déficits primários consecutivos:
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                      <div className="rounded-xl bg-white border border-amber-300 p-2 sm:p-2.5 text-center">
                        <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                          Primário 23
                        </div>
                        <div className="text-xs sm:text-base font-mono font-bold text-amber-800">
                          -2,29% PIB
                        </div>
                      </div>
                      <div className="rounded-xl bg-white border border-amber-300 p-2 sm:p-2.5 text-center">
                        <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                          Primário 24
                        </div>
                        <div className="text-xs sm:text-base font-mono font-bold text-amber-800">
                          -0,40% PIB
                        </div>
                      </div>
                      <div className="rounded-xl bg-white border border-amber-300 p-2 sm:p-2.5 text-center">
                        <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500">
                          Primário 25
                        </div>
                        <div className="text-xs sm:text-base font-mono font-bold text-amber-800">
                          -0,43% PIB
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dinâmica da Dívida Bruta e Carga Tributária */}
                  <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-3.5 sm:p-4 space-y-3">
                    <div className="text-xs font-mono uppercase text-amber-900 font-bold">
                      // Dinâmica Explosiva (r &gt; g) e Carga Tributária Recorde
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      Com juro real (
                      <strong className="font-mono text-amber-800">
                        r ≈ 7%
                      </strong>
                      ) muito maior que o crescimento do PIB (
                      <strong className="font-mono text-emerald-700">
                        g ≈ 3%
                      </strong>
                      ), a Dívida Bruta do Governo Geral (DBGG) saltou{" "}
                      <strong className="text-amber-800 font-mono">
                        +7,0 pontos percentuais em 3 anos
                      </strong>{" "}
                      (de <strong className="font-mono">71,7%</strong> em 2022
                      para{" "}
                      <strong className="font-mono text-amber-800">
                        78,7% do PIB
                      </strong>{" "}
                      em 2025), enquanto a{" "}
                      <strong className="text-amber-900">
                        Carga Tributária Bruta bateu recorde histórico de 32,40%
                        do PIB em 2025
                      </strong>
                      .
                    </p>

                    <div className="space-y-2 pt-1">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-zinc-600">DBGG em 2022</span>
                          <span className="text-zinc-900 font-semibold">
                            71,7% do PIB
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                          <div
                            className="h-full bg-zinc-500"
                            style={{ width: "71.7%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-amber-900">
                            DBGG em 2025 (+7,0 p.p.)
                          </span>
                          <span className="text-amber-800 font-bold">
                            78,7% do PIB
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-200 rounded-md overflow-hidden border border-zinc-300">
                          <div
                            className="h-full bg-gradient-to-r from-amber-600 to-yellow-500"
                            style={{ width: "78.7%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerta de Risco Crítico 2027 */}
                <div className="rounded-2xl bg-amber-100/80 border-l-4 border-l-amber-600 border border-amber-300 p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-amber-900 uppercase font-mono block mb-0.5">
                      Risco Crítico (Horizonte 2027):
                    </strong>
                    Sem corte estrutural de gastos obrigatórios e desindexação
                    orçamentária em 2027, há risco técnico de{" "}
                    <strong>Dominância Fiscal</strong> (estado em que aumentos da
                    taxa Selic pelo Banco Central elevam o custo da dívida e o
                    prêmio de risco a ponto de gerar perda de controle
                    inflacionário e cambial).
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA 2: O PERIGO DO MODELO BOLSONARO / FLÁVIO BOLSONARO */}
            <div className="rounded-2xl sm:rounded-3xl urban-card-rose overflow-hidden flex flex-col justify-between print-avoid-break">
              <div className="h-3 sm:h-3.5 w-full urban-danger-stripe border-b border-rose-300" />

              <div className="p-4 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-rose-600 text-white border border-zinc-900">
                        <Gavel className="w-3.5 h-3.5 shrink-0" />
                        VETOR 02 // RISCO DEMOCRÁTICO & PENAL
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-950 pt-1 uppercase leading-snug">
                        2. O Perigo do Modelo Bolsonaro / Flávio Bolsonaro:
                        Ruptura Democrática, Paralisia Institucional e Isolamento
                      </h3>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <SourceBadge source="STF" />
                      <SourceBadge source="TSE" />
                    </div>
                  </div>

                  {/* Condenação Criminal de Jair Bolsonaro */}
                  <div className="rounded-2xl bg-rose-50/50 border border-rose-200 p-3.5 sm:p-4 space-y-2.5">
                    <div className="text-xs font-mono uppercase text-rose-800 font-bold">
                      // Condenação Criminal por Tentativa de Golpe de Estado
                      (STF)
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      Condenação criminal de{" "}
                      <strong className="text-zinc-950">Jair Bolsonaro</strong>{" "}
                      pela{" "}
                      <strong className="text-rose-700">
                        1ª Turma do STF (2025) a 27 anos e 3 meses de prisão em
                        regime fechado
                      </strong>{" "}
                      por tentativa de golpe de Estado (
                      <span className="font-mono text-rose-800 font-semibold">
                        Art. 359-M CP
                      </span>
                      ), abolição violenta do Estado Democrático de Direito (
                      <span className="font-mono text-rose-800 font-semibold">
                        Art. 359-L CP
                      </span>
                      ) e organização criminosa, além de{" "}
                      <strong className="text-rose-700">
                        2 condenações à inelegibilidade no TSE
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Risco Flávio Bolsonaro (Plano 2026) */}
                  <div className="rounded-2xl bg-rose-50/50 border border-rose-200 p-3.5 sm:p-4 space-y-2.5">
                    <div className="text-xs font-mono uppercase text-rose-800 font-bold">
                      // Risco Flávio Bolsonaro (Plano 2026) & Baixa
                      Produtividade Legislativa
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      Propõe limitar poderes constitucionais do STF e anistiar
                      golpistas enquanto o próprio candidato é alvo de{" "}
                      <strong className="text-rose-700">
                        Inquérito ativo no STF (Caso Banco Master / Filme Dark
                        Horse)
                      </strong>{" "}
                      e teve{" "}
                      <strong className="text-rose-700 font-mono">
                        0 projetos de autoria individual sancionados como lei em
                        quase 8 anos de Senado
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Institucionalização do Orçamento Secreto */}
                  <div className="rounded-2xl bg-rose-50/50 border border-rose-200 p-3.5 sm:p-4 space-y-2.5">
                    <div className="text-xs font-mono uppercase text-rose-800 font-bold">
                      // Captura Orçamentária Opaca (&ldquo;Orçamento
                      Secreto&rdquo; — RP9)
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      Institucionalização do{" "}
                      <strong className="text-zinc-950">
                        &ldquo;Orçamento Secreto&rdquo; (emendas de relator RP9)
                      </strong>{" "}
                      que transferiu{" "}
                      <strong className="text-rose-700 font-mono">
                        mais de R$ 30 bilhões/ano sem transparência
                      </strong>{" "}
                      e sem critérios técnicos ao Centrão, esvaziando a
                      capacidade de planejamento do Executivo e gerando esquemas
                      de corrupção já condenados pelo STF.
                    </p>
                  </div>
                </div>

                {/* Alerta de Risco Crítico Institucional */}
                <div className="rounded-2xl bg-rose-100/80 border-l-4 border-l-rose-600 border border-rose-300 p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-rose-900 uppercase font-mono block mb-0.5">
                      Risco Crítico (Institucional & Geopolítico):
                    </strong>
                    Uma plataforma eleitoral centrada no confronto direto com o
                    Supremo Tribunal Federal para estancar inquéritos criminais e
                    anistiar crimes contra o Estado Democrático produz crise
                    constitucional permanente, insegurança jurídica extrema e fuga
                    de capitais.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CALCULADORA / SIMULADOR INTERATIVO DA EQUAÇÃO DA DÍVIDA PÚBLICA
        =================================================================== */}
        <section
          id="simulador-divida"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-5 sm:space-y-6 print:block print-avoid-break"
        >
          <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] sm:shadow-[6px_6px_0px_#18181b] p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-4 sm:pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase text-blue-700">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>
                    LABORATÓRIO FISCAL // EQUAÇÃO DA DÍVIDA PÚBLICA
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-display font-bold text-zinc-950 uppercase leading-snug">
                  Equação Canônica de Sustentabilidade da Dívida Bruta (DBGG)
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Entenda matematicamente por que a relação entre juro real (
                  <span className="font-mono font-bold text-amber-700">r</span>
                  ), crescimento do PIB (
                  <span className="font-mono font-bold text-emerald-700">
                    g
                  </span>
                  ) e resultado primário (
                  <span className="font-mono font-bold text-blue-700">p_t</span>
                  ) determina a estabilidade ou explosão da dívida pública.
                </p>
              </div>

              {/* Bloco da Equação Matemática Destacada */}
              <div className="rounded-2xl bg-zinc-900 border-2 border-zinc-950 px-4 sm:px-5 py-3 sm:py-3.5 text-center shrink-0 shadow-[3px_3px_0px_#facc15]">
                <div className="text-[10px] font-mono uppercase text-zinc-400 mb-1">
                  Fórmula Macroeconômica Oficial
                </div>
                <div className="text-sm sm:text-lg font-mono font-bold text-yellow-300 tracking-wide">
                  Δd<sub className="text-xs">t</sub> = ((r - g) / (1 + g)) · d
                  <sub className="text-xs">t-1</sub> - p
                  <sub className="text-xs">t</sub>
                </div>
              </div>
            </div>

            {/* Botões de Cenários Históricos Pré-Configurados */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 print:hidden">
              <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase">
                Toque para Carregar Cenário:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 sm:pb-0 sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => applyPreset("lula1_2")}
                  className="touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-400 transition cursor-pointer"
                >
                  Lula I/II (03–10: p=+3,16% | g=4%)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("bolsonaro")}
                  className="touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 transition cursor-pointer"
                >
                  Bolsonaro (19–22: g=1,4%)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("lula3")}
                  className="touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-400 transition cursor-pointer"
                >
                  Lula III (2025: r=7% | g=3% | p=-0,43%)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("ajuste2027")}
                  className="touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 transition cursor-pointer"
                >
                  Estabilização 2027 (r=4,5% | p=+1,5%)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("lula3")}
                  title="Restaurar valores padrão de 2025"
                  className="touch-manipulation select-none active:scale-95 shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Resetar
                </button>
              </div>
            </div>

            {/* Controles Sliders + Resultado Analítico */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 print-cols-2 gap-3.5 sm:gap-4">
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 print:p-2.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-semibold text-zinc-700">
                      Estoque Inicial (d<sub>t-1</sub>)
                    </label>
                    <span className="text-sm font-mono font-bold text-zinc-950">
                      {simDebtPrev.toFixed(1)}% do PIB
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={110}
                    step={0.1}
                    value={simDebtPrev}
                    onChange={(e) => setSimDebtPrev(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer print:hidden"
                  />
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Ref: 71,7% (2022) → 78,7% (2025)
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 print:p-2.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-semibold text-zinc-700">
                      Juro Real Implícito (r)
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-700">
                      {simRealRate.toFixed(1)}% a.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    step={0.1}
                    value={simRealRate}
                    onChange={(e) => setSimRealRate(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer print:hidden"
                  />
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Ref Lula III (2025): r ≈ 7,0% a.a.
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 print:p-2.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-semibold text-zinc-700">
                      Crescimento Real PIB (g)
                    </label>
                    <span className="text-sm font-mono font-bold text-emerald-700">
                      {simGdpGrowth.toFixed(1)}% a.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-4}
                    max={8}
                    step={0.1}
                    value={simGdpGrowth}
                    onChange={(e) => setSimGdpGrowth(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer print:hidden"
                  />
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Ref: +4,0% (03–10) | +1,4% (19–22) | +3,0% (23–25)
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 print:p-2.5 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-semibold text-zinc-700">
                      Resultado Primário (p<sub>t</sub>)
                    </label>
                    <span
                      className={`text-sm font-mono font-bold ${
                        simPrimaryBalance >= 0
                          ? "text-emerald-700"
                          : "text-rose-700"
                      }`}
                    >
                      {simPrimaryBalance > 0 ? "+" : ""}
                      {simPrimaryBalance.toFixed(2)}% do PIB
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-4}
                    max={4.5}
                    step={0.05}
                    value={simPrimaryBalance}
                    onChange={(e) =>
                      setSimPrimaryBalance(parseFloat(e.target.value))
                    }
                    className="w-full accent-blue-600 cursor-pointer print:hidden"
                  />
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Ref: +3,16% (03–10) | -2,29% (23) | -0,43% (25)
                  </div>
                </div>
              </div>

              {/* Painel de Resultado da Equação */}
              <div className="lg:col-span-5 rounded-2xl bg-zinc-50 border-2 border-zinc-900 p-4 sm:p-5 print:p-3.5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-600">
                    Resultado Simulado (Δd<sub>t</sub>)
                  </span>
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${
                      debtSimulation.deltaDebt > 0.3
                        ? "bg-amber-100 text-amber-900 border-amber-400"
                        : debtSimulation.deltaDebt < -0.3
                        ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                        : "bg-blue-100 text-blue-900 border-blue-400"
                    }`}
                  >
                    {debtSimulation.deltaDebt > 0.3
                      ? "Alta (Bola de Neve)"
                      : debtSimulation.deltaDebt < -0.3
                      ? "Queda da Dívida"
                      : "Estabilidade"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white border border-zinc-200 p-3">
                    <div className="text-[11px] font-mono text-zinc-500">
                      Variação Anual (Δd<sub>t</sub>)
                    </div>
                    <div
                      className={`text-xl sm:text-2xl font-mono font-extrabold mt-0.5 flex items-center gap-1 ${
                        debtSimulation.deltaDebt > 0
                          ? "text-amber-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {debtSimulation.deltaDebt > 0 ? (
                        <ArrowUpRight className="w-5 h-5 shrink-0" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 shrink-0" />
                      )}
                      {debtSimulation.deltaDebt > 0 ? "+" : ""}
                      {debtSimulation.deltaDebt.toFixed(2)} p.p.
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-zinc-200 p-3">
                    <div className="text-[11px] font-mono text-zinc-500">
                      Dívida Projetada (d<sub>t</sub>)
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-extrabold text-zinc-950 mt-0.5">
                      {debtSimulation.nextDebt.toFixed(1)}%{" "}
                      <span className="text-xs font-normal text-zinc-500">
                        PIB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-mono bg-white p-3 rounded-xl border border-zinc-200">
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-600">
                      Efeito Juros vs. PIB:
                    </span>
                    <span
                      className={
                        debtSimulation.snowBallTerm > 0
                          ? "text-amber-700 font-bold shrink-0"
                          : "text-emerald-700 font-bold shrink-0"
                      }
                    >
                      {debtSimulation.snowBallTerm > 0 ? "+" : ""}
                      {debtSimulation.snowBallTerm.toFixed(2)} p.p.
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-600">
                      Primário p/ Estabilizar (Δd = 0):
                    </span>
                    <span className="text-blue-700 font-bold shrink-0">
                      {debtSimulation.stabilizingPrimary > 0 ? "+" : ""}
                      {debtSimulation.stabilizingPrimary.toFixed(2)}% PIB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quadro Comparativo dos 4 Cenários Fiscais (Visível na Tela e no PDF) */}
            <div className="pt-3 border-t border-zinc-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-zinc-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                  Comparativo Direto dos 4 Regimes Fiscais na Equação da Dívida
                </span>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                  Clique em qualquer card para carregar no simulador
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 print-cols-4 gap-3 text-xs font-mono">
                <div
                  onClick={() => applyPreset("lula1_2")}
                  className="rounded-xl bg-emerald-50/70 border border-emerald-300 p-3 cursor-pointer hover:bg-emerald-100/70 transition"
                >
                  <div className="font-bold text-emerald-900 uppercase">
                    1. Lula I e II (2003–2010)
                  </div>
                  <div className="text-[11px] text-zinc-600 mt-1">
                    r=6,5% | g=+4,0% | p=+3,16%
                  </div>
                  <div className="text-emerald-800 font-extrabold mt-1.5">
                    DBGG: -11,9 p.p. no ciclo
                  </div>
                </div>
                <div
                  onClick={() => applyPreset("bolsonaro")}
                  className="rounded-xl bg-zinc-50 border border-zinc-300 p-3 cursor-pointer hover:bg-zinc-100 transition"
                >
                  <div className="font-bold text-zinc-900 uppercase">
                    2. Bolsonaro (2019–2022)
                  </div>
                  <div className="text-[11px] text-zinc-600 mt-1">
                    r=3,2% | g=+1,4% | choque 2020
                  </div>
                  <div className="text-zinc-800 font-extrabold mt-1.5">
                    Fechou 2022 em 71,7% PIB
                  </div>
                </div>
                <div
                  onClick={() => applyPreset("lula3")}
                  className="rounded-xl bg-amber-50/70 border border-amber-300 p-3 cursor-pointer hover:bg-amber-100/70 transition"
                >
                  <div className="font-bold text-amber-900 uppercase">
                    3. Lula III (2023–2025)
                  </div>
                  <div className="text-[11px] text-zinc-600 mt-1">
                    r≈7,0% | g=+3,0% | p=-0,43%
                  </div>
                  <div className="text-amber-800 font-extrabold mt-1.5">
                    DBGG: 78,7% (+7,0 p.p.)
                  </div>
                </div>
                <div
                  onClick={() => applyPreset("ajuste2027")}
                  className="rounded-xl bg-blue-50/70 border border-blue-300 p-3 cursor-pointer hover:bg-blue-100/70 transition"
                >
                  <div className="font-bold text-blue-900 uppercase">
                    4. Meta Estabilização 2027
                  </div>
                  <div className="text-[11px] text-zinc-600 mt-1">
                    r=4,5% | g=+3,0% | p=+1,50%
                  </div>
                  <div className="text-blue-800 font-extrabold mt-1.5">
                    Δd ≈ -0,36 p.p./ano (Queda)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            MÓDULO 3: ANÁLISE TÉCNICA DO "VIRALATISMO" (SUBORDINAÇÃO EXTERNA VS. SOBERANIA NACIONAL)
        =================================================================== */}
        <section
          id="modulo-3"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-5 sm:space-y-6 print:block print-page-break"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-zinc-900 pb-3 sm:pb-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-blue-700 text-white border-2 border-zinc-900 font-mono font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#facc15] shrink-0">
                SETOR 03
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-blue-700 block">
                  Geopolítica, Energia e Política Industrial
                </span>
                <h2 className="text-lg sm:text-2xl font-display font-bold text-zinc-950 uppercase leading-snug">
                  Análise Técnica do &ldquo;Viralatismo&rdquo; (Subordinação
                  Externa vs. Soberania Nacional)
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <SourceBadge source="CGU" />
              <SourceBadge source="MCTI" />
              <SourceBadge source="MDIC" />
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {SOVEREIGNTY_DATA.map((item) => {
              const Icon =
                item.icone === "fuel"
                  ? Fuel
                  : item.icone === "cpu"
                  ? Cpu
                  : Handshake;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl sm:rounded-3xl urban-card p-4 sm:p-7 space-y-4 sm:space-y-5 print-avoid-break"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3.5 sm:pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-yellow-400 text-zinc-950 border-2 border-zinc-900 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                          {item.codigoSetor}
                        </span>
                        <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase leading-snug">
                          {item.eixo}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.fontes.map((f) => (
                        <SourceBadge key={f} source={f} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 print-cols-2 gap-4 sm:gap-6">
                    {/* Lado Subordinação Passiva (2019-2022) */}
                    <div className="rounded-2xl bg-rose-50/40 border-l-4 border-l-rose-600 border border-rose-200 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                            {item.subordinacao.periodo}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-rose-700 uppercase">
                            // Subordinação Passiva
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-display font-bold text-zinc-950 uppercase">
                          {item.subordinacao.titulo}
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                          {item.subordinacao.pontos.map((ponto, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-600 font-bold mt-0.5">
                                ■
                              </span>
                              <span className="leading-relaxed">{ponto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-rose-200 text-xs text-rose-900 font-mono">
                        <strong>Impacto Estrutural:</strong>{" "}
                        {item.subordinacao.impactoCritico}
                      </div>
                    </div>

                    {/* Lado Soberania Nacional (2003-2010 / 2023-2026) */}
                    <div className="rounded-2xl bg-emerald-50/40 border-l-4 border-l-emerald-600 border border-emerald-200 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {item.soberania.periodo}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase">
                            // Soberania Nacional
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-display font-bold text-zinc-950 uppercase">
                          {item.soberania.titulo}
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                          {item.soberania.pontos.map((ponto, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold mt-0.5">
                                ■
                              </span>
                              <span className="leading-relaxed">{ponto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-emerald-200 text-xs text-emerald-900 font-mono">
                        <strong>Resultado Estratégico:</strong>{" "}
                        {item.soberania.impactoPositivo}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            MÓDULO 4: RAIO-X DO PARTIDO LIBERAL (PL) — ORÇAMENTO PÚBLICO E FICHA CRIMINAL
        =================================================================== */}
        <section
          id="modulo-4"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-5 sm:space-y-6 print:block print-page-break"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-zinc-900 pb-3 sm:pb-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-rose-600 text-white border-2 border-zinc-900 font-mono font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#facc15] shrink-0">
                SETOR 04
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-rose-700 block">
                  Auditoria Partidária, Orçamentária e Processual
                </span>
                <h2 className="text-lg sm:text-2xl font-display font-bold text-zinc-950 uppercase leading-snug">
                  Raio-X do Partido Liberal (PL) — Orçamento Público e Ficha
                  Criminal + Nota de Equilíbrio Metodológico
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <SourceBadge source="STF" />
              <SourceBadge source="STJ" />
              <SourceBadge source="TSE" />
            </div>
          </div>

          {/* Destaque: Máquina Pública e Fundo Eleitoral/Partidário do PL */}
          <div className="rounded-2xl sm:rounded-3xl urban-card border-l-4 border-l-amber-500 p-4 sm:p-7 space-y-4 sm:space-y-5 print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-amber-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase leading-snug">
                  Máquina Pública: O Maior Absorvedor de Recursos Públicos
                  Eleitorais do País
                </h3>
              </div>
              <div className="self-start sm:self-auto">
                <SourceBadge source="TSE" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              O Partido Liberal (PL) consolidou a{" "}
              <strong className="text-zinc-950">
                maior bancada eleita na Câmara dos Deputados em outubro/2026
                (121 deputados federais)
              </strong>{" "}
              e opera como o maior recebedor individual de dinheiro público
              eleitoral e partidário do Brasil, tendo ainda sofrido punição
              histórica do TSE por litigância de má-fé ao atacar as urnas sem
              provas:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 print-cols-4 gap-3 sm:gap-4">
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4">
                <div className="text-xs font-mono text-zinc-500">
                  Bancada Câmara (Out/2026)
                </div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-zinc-950 mt-1">
                  121 Deputados
                </div>
                <div className="text-xs text-zinc-600 mt-1">
                  Maior bancada eleita na Câmara Federal
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-3.5 sm:p-4">
                <div className="text-xs font-mono font-bold text-amber-800">
                  Fundo Eleitoral (2024 e 2026)
                </div>
                <div className="text-lg sm:text-xl font-mono font-extrabold text-amber-900 mt-1">
                  R$ 886,8 mi → &gt;R$ 900 mi
                </div>
                <div className="text-xs text-zinc-600 mt-1">
                  R$ 886,8 milhões em 2024 e mais de R$ 900 milhões em 2026
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50/70 border border-amber-300 p-3.5 sm:p-4">
                <div className="text-xs font-mono font-bold text-amber-800">
                  Fundo Partidário Anual
                </div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-900 mt-1">
                  ~R$ 220 mi/ano
                </div>
                <div className="text-xs text-zinc-600 mt-1">
                  Fluxo contínuo de recursos públicos para custeio da legenda
                </div>
              </div>

              <div className="rounded-2xl bg-rose-50/70 border border-rose-300 p-3.5 sm:p-4">
                <div className="text-xs font-mono font-bold text-rose-800">
                  Multa no TSE (Litigância de Má-fé)
                </div>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-rose-700 mt-1">
                  R$ 22,9 milhões
                </div>
                <div className="text-xs text-zinc-600 mt-1">
                  Condenação por atacar as urnas eletrônicas sem qualquer prova
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Filtro das Fichas Jurídicas Individuais */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 print:hidden">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-700">
              <Filter className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                FILTRAR FICHAS ({filteredDossiers.length} DE{" "}
                {JUDICIAL_DOSSIERS.length} EXIBIDAS):
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 sm:pb-0 sm:flex-wrap">
              <button
                type="button"
                onClick={() => setDossierFilter("todos")}
                className={`touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  dossierFilter === "todos"
                    ? "bg-yellow-400 text-zinc-950 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b]"
                    : "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-100"
                }`}
              >
                Todos os Dossiês (6)
              </button>
              <button
                type="button"
                onClick={() => setDossierFilter("PL")}
                className={`touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  dossierFilter === "PL"
                    ? "bg-rose-600 text-white border-2 border-zinc-900"
                    : "bg-white text-rose-700 border border-rose-300 hover:bg-rose-50"
                }`}
              >
                Cúpula e Bancada do PL (5)
              </button>
              <button
                type="button"
                onClick={() => setDossierFilter("metodologico")}
                className={`touch-manipulation select-none active:scale-95 shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  dossierFilter === "metodologico"
                    ? "bg-blue-700 text-white border-2 border-zinc-900"
                    : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50"
                }`}
              >
                Nota de Equilíbrio — Lula (1)
              </button>
            </div>
          </div>

          {/* Cards Detalhados das Fichas Jurídicas Individuais (Sempre exibe todos os 6 no PDF) */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 print:gap-3.5">
            {JUDICIAL_DOSSIERS.map((dossier, index) => {
              const isVisibleOnScreen = filteredDossiers.some(
                (item) => item.id === dossier.id
              );
              const isMetodologico = dossier.severidade === "metodologico";
              const borderCard = isMetodologico
                ? "border-l-4 border-l-blue-600 border-zinc-300 bg-white"
                : "border-l-4 border-l-rose-600 border-zinc-300 bg-white";

              return (
                <div
                  key={dossier.id}
                  className={`${
                    isVisibleOnScreen ? "block" : "hidden"
                  } print:block rounded-2xl sm:rounded-3xl border ${borderCard} p-4 sm:p-7 print:p-4 space-y-4 print:space-y-2.5 print-avoid-break transition-all duration-200 shadow-md`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-zinc-200 pb-3.5 sm:pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span
                          className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${
                            isMetodologico
                              ? "bg-blue-100 text-blue-900 border-blue-300"
                              : "bg-rose-100 text-rose-900 border-rose-300"
                          }`}
                        >
                          {isMetodologico
                            ? `6. NOTA DE EQUILÍBRIO E RIGOR METODOLÓGICO // ${dossier.protocolo}`
                            : `FICHA JURÍDICA #0${index + 1} // ${dossier.protocolo}`}
                        </span>
                        {dossier.fontes.map((f) => (
                          <SourceBadge key={f} source={f} />
                        ))}
                      </div>
                      <h3 className="text-base sm:text-xl font-display font-bold text-zinc-950 pt-1 uppercase leading-snug">
                        {dossier.nome}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-mono">
                        {dossier.cargo}
                      </p>
                    </div>

                    {dossier.valoresEnvolvidos && (
                      <div className="rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-300 px-3.5 py-2 text-xs font-mono font-semibold text-amber-900 break-words">
                        <span className="text-zinc-500 block text-[10px] uppercase">
                          Cifras Auditadas nos Autos:
                        </span>
                        {dossier.valoresEnvolvidos}
                      </div>
                    )}
                  </div>

                  {/* Badges de Status Processual */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {dossier.statusCurtos.map((st) => (
                      <span
                        key={st}
                        className={`text-[11px] sm:text-xs font-mono font-semibold px-2.5 sm:px-3 py-1 rounded-md border ${
                          isMetodologico
                            ? "bg-blue-50 text-blue-900 border-blue-200"
                            : "bg-rose-50 text-rose-900 border-rose-200"
                        }`}
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  {/* Resumo Executivo */}
                  <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed bg-zinc-50 p-3.5 sm:p-4 rounded-2xl border border-zinc-200">
                    {dossier.resumoExecutivo}
                  </p>

                  {/* Detalhamento Técnico dos Processos */}
                  <div className="space-y-2.5 pt-1">
                    <div className="text-xs font-mono uppercase text-zinc-600 font-bold">
                      // Histórico Processual e Fundamentação nos Autos:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                      {dossier.detalhesProcessuais.map((detalhe, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 sm:gap-2.5 bg-zinc-50/80 p-3 sm:p-3.5 rounded-2xl border border-zinc-200"
                        >
                          <span
                            className={`font-mono font-bold mt-0.5 shrink-0 ${
                              isMetodologico ? "text-blue-700" : "text-rose-600"
                            }`}
                          >
                            0{idx + 1}.
                          </span>
                          <span className="leading-relaxed">{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            MÓDULO 5: CREDIBILIDADE DOS CANDIDATOS, DEBATES (QUEM MENTIU VS.
            QUEM NÃO MENTIU) E ÚLTIMAS NOTÍCIAS (OUTUBRO DE 2026)
        =================================================================== */}
        <section
          id="modulo-5"
          className="scroll-mt-20 sm:scroll-mt-24 space-y-6 sm:space-y-8 print:block"
        >
          {/* Cabeçalho do Módulo 5 */}
          <div className="border-b-2 border-zinc-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-950 font-bold bg-purple-100 px-3 py-1 rounded-md border border-purple-400 mb-2">
                <Activity className="w-3.5 h-3.5 text-purple-700" />
                MÓDULO 05 // AUDITORIA DE CREDIBILIDADE, DEBATES & NOTÍCIAS (OUT/2026)
              </div>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-zinc-950 uppercase tracking-tight">
                Credibilidade dos Candidatos, Quem Mentiu nos Debates & Reta Final 2026
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-mono">
              Verificação factual independente do Debate do 2º Turno (Band — 18/10/2026), índice de precisão estatística e radar atualizado das pesquisas e notícias de outubro de 2026.
            </p>
          </div>

          {/* 5.1 TERMÔMETRO DE CREDIBILIDADE E CONSISTÊNCIA DOS CANDIDATOS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase tracking-wide flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-700 shrink-0" />
                5.1 Índice de Credibilidade Factual e Consistência de Gestão (Lula vs. Flávio Bolsonaro)
              </h3>
              <div className="flex items-center gap-1.5">
                <SourceBadge source="LUPA" />
                <SourceBadge source="AOSFATOS" />
                <SourceBadge source="TSE" />
                <SourceBadge source="IBGE" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 print-cols-2 gap-6">
              {CANDIDATE_CREDIBILITY.map((prof) => {
                const isLula = prof.id === "cred-lula";
                return (
                  <div
                    key={prof.id}
                    className={`rounded-3xl bg-white border-2 border-zinc-900 p-4 sm:p-6 shadow-[3px_3px_0px_#18181b] sm:shadow-[6px_6px_0px_#18181b] flex flex-col justify-between space-y-5 print-avoid-break ${
                      isLula
                        ? "border-t-8 border-t-emerald-600"
                        : "border-t-8 border-t-rose-600"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Topo do Card de Credibilidade */}
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-3.5">
                        <div>
                          <span
                            className={`inline-block text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                              isLula
                                ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                                : "bg-rose-100 text-rose-900 border-rose-400"
                            }`}
                          >
                            {prof.partido}
                          </span>
                          <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-950 uppercase mt-1">
                            {prof.candidato}
                          </h4>
                          <p className="text-xs text-zinc-600 font-medium">
                            {prof.cargoAtual}
                          </p>
                        </div>

                        <div className="bg-zinc-900 text-white rounded-2xl px-3.5 py-2 text-right font-mono shrink-0">
                          <div className="text-[10px] text-yellow-300 uppercase font-bold">
                            1º Turno Oficial [TSE]
                          </div>
                          <div className="text-sm sm:text-base font-extrabold text-white">
                            {prof.resultado1TurnoTSE}
                          </div>
                          <div className="text-[10px] text-zinc-300">
                            {prof.votos1TurnoTSE}
                          </div>
                        </div>
                      </div>

                      {/* Barra de Aderência Factual nos Debates */}
                      <div className="bg-zinc-50 rounded-2xl p-3.5 border border-zinc-200 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-zinc-700 uppercase">
                            Taxa de Precisão Factual nos Debates:
                          </span>
                          <span
                            className={`text-sm font-extrabold ${
                              isLula ? "text-emerald-700" : "text-rose-700"
                            }`}
                          >
                            {prof.indicePrecisaoDebates}%
                          </span>
                        </div>
                        <div className="w-full h-3.5 bg-zinc-200 rounded-lg overflow-hidden border border-zinc-300 p-0.5">
                          <div
                            className={`h-full rounded-sm ${
                              isLula ? "bg-emerald-600" : "bg-rose-600"
                            }`}
                            style={{ width: `${prof.indicePrecisaoDebates}%` }}
                          />
                        </div>
                        <div className="text-[11px] font-mono text-zinc-600">
                          {prof.indicePrecisaoLabel}
                        </div>

                        {/* Mini Placar da Checagem (10 falas auditadas) */}
                        <div className="grid grid-cols-3 gap-2 pt-1.5 text-center font-mono text-[11px]">
                          <div className="bg-emerald-50 border border-emerald-300 rounded-xl py-1.5 px-2">
                            <span className="block text-sm font-extrabold text-emerald-800">
                              {prof.placarChecagem.verdadeiro}
                            </span>
                            <span className="text-[10px] text-emerald-900 font-bold uppercase">
                              ✅ Verdadeiras
                            </span>
                          </div>
                          <div className="bg-amber-50 border border-amber-300 rounded-xl py-1.5 px-2">
                            <span className="block text-sm font-extrabold text-amber-800">
                              {prof.placarChecagem.impreciso}
                            </span>
                            <span className="text-[10px] text-amber-900 font-bold uppercase">
                              ⚠️ Imprecisas
                            </span>
                          </div>
                          <div className="bg-rose-50 border border-rose-300 rounded-xl py-1.5 px-2">
                            <span className="block text-sm font-extrabold text-rose-800">
                              {prof.placarChecagem.falsoEnganoso}
                            </span>
                            <span className="text-[10px] text-rose-900 font-bold uppercase">
                              ❌ Falsas/Engan.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pilares de Credibilidade */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold uppercase text-emerald-800">
                          ✅ Pontos de Credibilidade e Consistência Comprovada:
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-700">
                          {prof.pilaresCredibilidade.map((pilar, i) => (
                            <li
                              key={i}
                              className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 leading-relaxed"
                            >
                              {pilar}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Passivos e Desgastes de Credibilidade */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold uppercase text-rose-800">
                          ⚠️ Passivos de Credibilidade, Deslizes e Contradições:
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-700">
                          {prof.passivosCredibilidade.map((passivo, i) => (
                            <li
                              key={i}
                              className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200 leading-relaxed"
                            >
                              {passivo}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">
                        Fontes da Auditoria:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {prof.fontes.map((f) => (
                          <SourceBadge key={f} source={f} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5.2 QUEM MENTIU E QUEM NÃO MENTIU NOS DEBATES (FACT-CHECKING OFICIAL) */}
          <div className="rounded-3xl bg-white border-2 border-zinc-900 p-4 sm:p-6 shadow-[4px_4px_0px_#18181b] space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-rose-800 bg-rose-50 border border-rose-300 px-2.5 py-0.5 rounded">
                  Detector de Mentiras • Debate da Band (18/10/2026) & Sabatinas
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-950 uppercase">
                  5.2 Resultado dos Debates: Quem Mentiu vs. Quem Falou a Verdade
                </h3>
                <p className="text-xs text-zinc-600">
                  Checagem cruzada de <strong>Agência Lupa, Aos Fatos, Estadão Verifica e Fato ou Fake</strong> confrontada diretamente com as bases do IBGE, BCB, CGU e STF:
                </p>
              </div>

              {/* Botões de Filtro por Veredito */}
              <div className="flex flex-wrap gap-1.5 print:hidden">
                <button
                  type="button"
                  onClick={() => setFactCheckFilter("todos")}
                  className={`touch-manipulation select-none active:scale-95 px-3 py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    factCheckFilter === "todos"
                      ? "bg-zinc-900 text-yellow-300 border-zinc-900"
                      : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:border-zinc-900"
                  }`}
                >
                  TODAS ({DEBATE_FACT_CHECKS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFactCheckFilter("FALSO")}
                  className={`touch-manipulation select-none active:scale-95 px-3 py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    factCheckFilter === "FALSO"
                      ? "bg-rose-600 text-white border-zinc-900"
                      : "bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-600"
                  }`}
                >
                  ❌ FALSO / MENTIRA
                </button>
                <button
                  type="button"
                  onClick={() => setFactCheckFilter("ENGANOSO")}
                  className={`touch-manipulation select-none active:scale-95 px-3 py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    factCheckFilter === "ENGANOSO"
                      ? "bg-amber-400 text-zinc-950 border-zinc-900"
                      : "bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-600"
                  }`}
                >
                  ⚠️ ENGANOSO / IMPRECISO
                </button>
                <button
                  type="button"
                  onClick={() => setFactCheckFilter("VERDADEIRO")}
                  className={`touch-manipulation select-none active:scale-95 px-3 py-2 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    factCheckFilter === "VERDADEIRO"
                      ? "bg-emerald-600 text-white border-zinc-900"
                      : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-600"
                  }`}
                >
                  ✅ VERDADEIRO
                </button>
              </div>
            </div>

            {/* Grid de Cards de Checagem */}
            <div className="grid grid-cols-1 md:grid-cols-2 print-cols-2 gap-4">
              {filteredFactChecks.map((fc) => {
                const badgeStyles =
                  fc.veredito === "FALSO"
                    ? "bg-rose-600 text-white border-zinc-900"
                    : fc.veredito === "VERDADEIRO"
                    ? "bg-emerald-600 text-white border-zinc-900"
                    : "bg-amber-400 text-zinc-950 border-zinc-900";

                const cardBorder =
                  fc.veredito === "FALSO"
                    ? "border-rose-300 bg-rose-50/30"
                    : fc.veredito === "VERDADEIRO"
                    ? "border-emerald-300 bg-emerald-50/30"
                    : "border-amber-300 bg-amber-50/30";

                return (
                  <div
                    key={fc.id}
                    className={`rounded-2xl border-2 p-4 flex flex-col justify-between space-y-3 print-avoid-break ${cardBorder}`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-zinc-900 text-yellow-300 font-mono text-[10px] font-bold">
                            {fc.candidato}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {fc.eventoData}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] font-extrabold uppercase border ${badgeStyles}`}
                        >
                          {fc.veredito === "FALSO"
                            ? "❌ FALSO / MENTIRA"
                            : fc.veredito === "VERDADEIRO"
                            ? "✅ VERDADEIRO"
                            : `⚠️ ${fc.veredito}`}
                        </span>
                      </div>

                      {/* Frase dita no debate */}
                      <blockquote className="p-3 rounded-xl bg-white border border-zinc-300 text-xs sm:text-sm font-display font-bold text-zinc-900 italic leading-snug">
                        {fc.declaracao}
                      </blockquote>

                      {/* Resumo do Veredito */}
                      <div className="text-xs font-bold text-zinc-900 leading-snug">
                        🔎 Veredito: {fc.resumoVeredito}
                      </div>

                      {/* Explicação Técnica */}
                      <p className="text-xs text-zinc-700 leading-relaxed">
                        {fc.auditoriaTecnica}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-zinc-500">
                        {fc.protocolo}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {fc.fontes.map((s) => (
                          <SourceBadge key={s} source={s} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5.3 RADAR DE ÚLTIMAS NOTÍCIAS E PESQUISAS DO 2º TURNO (OUTUBRO 2026) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-display font-bold text-zinc-950 uppercase tracking-wide flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600 shrink-0" />
                5.3 Radar de Últimas Notícias e Pesquisas da Reta Final (Outubro/2026)
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg">
                ATUALIZADO EM 22/10/2026 • VÉSPERA DO 2º TURNO (25/10)
              </span>
            </div>

            {/* Painel Rápido de Pesquisas de Outubro/2026 */}
            <div className="rounded-3xl bg-zinc-950 text-white border-2 border-zinc-900 p-4 sm:p-6 shadow-[4px_4px_0px_#059669] space-y-4 print-avoid-break">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400 text-zinc-950">
                    TERMÔMETRO ELEITORAL // OUTUBRO DE 2026
                  </span>
                  <h4 className="text-base sm:text-lg font-display font-bold uppercase text-white mt-1">
                    Resultado do 1º Turno (TSE) e Pesquisas do 2º Turno (21 e 22/10/2026)
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  Cenário de empate técnico dentro da margem de erro em todos os institutos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 print-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-1">
                  <div className="text-[10px] text-sky-400 font-bold uppercase">
                    1º Turno Oficial [TSE — 04/10]
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Flávio 47,03% vs. Lula 45,16%
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Diferença de 1,87 p.p. (56,10 mi a 53,87 mi de votos válidos)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-1">
                  <div className="text-[10px] text-yellow-300 font-bold uppercase">
                    Quaest / Globo [21/10/2026]
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Flávio 45% vs. Lula 44% (Totais)
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Votos válidos: ~50,5% a 49,4% (Empate técnico • Margem: 2 p.p.)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-1">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">
                    PoderData / Aya [22/10/2026]
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Flávio 51% vs. Lula 49% (Válidos)
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Votos totais: 49% a 48% (Empate técnico • Margem: 1,6 p.p.)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-1">
                  <div className="text-[10px] text-amber-400 font-bold uppercase">
                    Indexa / Broadcast [22/10/2026]
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Flávio 50,6% vs. Lula 49,4%
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Votos totais: 45,2% a 44,0% (Empate técnico • Margem: 2,2 p.p.)
                  </div>
                </div>
              </div>
            </div>

            {/* Cards das Últimas Notícias de Outubro de 2026 */}
            <div className="grid grid-cols-1 md:grid-cols-2 print-cols-2 gap-4">
              {OCTOBER_2026_NEWS.map((news) => {
                const tagStyle =
                  news.destaqueCor === "emerald"
                    ? "bg-emerald-100 text-emerald-900 border-emerald-400"
                    : news.destaqueCor === "amber"
                    ? "bg-amber-100 text-amber-950 border-amber-400"
                    : news.destaqueCor === "blue"
                    ? "bg-blue-100 text-blue-900 border-blue-400"
                    : "bg-rose-100 text-rose-900 border-rose-400";

                return (
                  <article
                    key={news.id}
                    className="rounded-3xl bg-white border-2 border-zinc-900 p-4 sm:p-5 shadow-[3px_3px_0px_#18181b] flex flex-col justify-between space-y-3 print-avoid-break"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-zinc-500">
                          {news.data}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded border ${tagStyle}`}
                        >
                          {news.categoria}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-display font-bold text-zinc-950 leading-snug">
                        {news.manchete}
                      </h4>

                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {news.resumo}
                      </p>

                      <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800">
                        <strong className="font-mono uppercase text-zinc-950 block mb-0.5">
                          📌 O que isso significa para o eleitor indeciso:
                        </strong>
                        {news.impactoEleitoral}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Referências da Notícia:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {news.fontes.map((f) => (
                          <SourceBadge key={f} source={f} />
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          BARRA DE NAVEGAÇÃO INFERIOR FIXA PARA CELULAR (ESTILO APP NATIVO)
      ===================================================================== */}
      <nav
        aria-label="Menu Rápido Mobile"
        className="md:hidden print:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-zinc-900 px-1.5 pt-1.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      >
        <div className="grid grid-cols-7 gap-0.5 max-w-md mx-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigateTab(item.id)}
                className={`touch-manipulation select-none active:scale-95 flex flex-col items-center justify-center min-h-[46px] py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-zinc-950 font-bold border-2 border-zinc-900 shadow-[1px_1px_0px_#facc15]"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-mono font-bold tracking-tight mt-0.5 truncate max-w-full">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =====================================================================
          RODAPÉ METODOLÓGICO E AUDITORIA DE FONTES OFICIAIS
      ===================================================================== */}
      <footer className="border-t-2 border-zinc-900 bg-white mt-8 sm:mt-12 py-8 sm:py-10 print-avoid-break">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-3">
              <BandeiraBrasilUrbanEmblem className="w-11 h-8" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
                <h3 className="text-sm sm:text-base font-display font-bold text-zinc-950 uppercase tracking-wide">
                  Nota Metodológica e Protocolo de Auditoria das Métricas
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(SOURCE_STYLES) as SourceBadgeType[]).map((s) => (
                <SourceBadge key={s} source={s} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 print-cols-3 gap-5 sm:gap-6 text-xs text-zinc-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="text-emerald-800 font-bold font-mono flex items-center gap-1.5 uppercase">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                1. Contas Nacionais, Trabalho e Desigualdade ([IBGE] / [DIEESE])
              </h4>
              <p>
                As taxas de crescimento real do PIB e do PIB per capita provêm
                do Sistema de Contas Nacionais Trimestrais e Anuais do IBGE. Os
                dados de desocupação de 2003–2010 seguem a Pesquisa Mensal de
                Emprego (PME/IBGE), vigente à época, enquanto os ciclos
                2019–2022 e 2023–2025 utilizam a série histórica da PNAD
                Contínua (IBGE). O Índice de Gini é calculado a partir da
                PNAD/PNAD-C (rendimento domiciliar per capita), e o ganho real
                do Salário Mínimo é deflacionado pelo INPC/IBGE conforme
                metodologia técnica do DIEESE.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-amber-800 font-bold font-mono flex items-center gap-1.5 uppercase">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                2. Estatísticas Fiscais, Monetárias e Ambientais ([BCB] / [TN] /
                [INPE])
              </h4>
              <p>
                A Dívida Bruta do Governo Geral (DBGG) segue a metodologia do
                Banco Central do Brasil (conceito FMI/BCB em % do PIB), e o
                Resultado Primário do Setor Público Consolidado e a Carga
                Tributária Bruta (32,40% do PIB em 2025) provêm dos Boletins do
                Tesouro Nacional e do BCB. As taxas anuais de desmatamento na
                Amazônia Legal referem-se ao calendário oficial PRODES/INPE
                (agosto a julho do ano subsequente), auditadas por
                sensoriamento orbital.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-blue-800 font-bold font-mono flex items-center gap-1.5 uppercase">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                3. Registros Processuais e Jurisprudência ([STF] / [STJ] /
                [TSE])
              </h4>
              <p>
                Os dados processuais e penais refletem acórdãos colegiados e
                inquéritos públicos tramitando no Supremo Tribunal Federal (AP
                470, Ações Penais da Trama Golpista de 2025, Condenação do
                Orçamento Secreto em 17/03/2026, Inquérito Set/2026 Rel. Min.
                Flávio Dino, HC 193.726 e HC 164.493), no Superior Tribunal de
                Justiça (RHC sobre anulação de quebras de sigilo por erro de
                foro na Alerj) e no Tribunal Superior Eleitoral (Ações de
                Investigação Judicial Eleitoral e prestação de contas do
                FEFC/Fundo Partidário).
              </p>
            </div>
          </div>

          {/* =================================================================
              BANNER DO KIT INSTAGRAM PARA ELEITORES INDECISOS
          ================================================================= */}
          <div className="print:hidden rounded-2xl border-2 border-zinc-900 bg-gradient-to-r from-emerald-950 via-zinc-900 to-blue-950 p-4 sm:p-6 text-white shadow-[4px_4px_0px_#18181b] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-yellow-400 text-zinc-950 font-mono font-extrabold text-[11px] uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                Ferramenta de Comunicação Cívica
              </div>
              <h4 className="text-base sm:text-lg font-display font-bold uppercase tracking-tight text-white">
                Quer compartilhar esses dados no Instagram para quem ainda está indeciso?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Preparamos um <strong>Card Único de Resumo em Alta Definição (PNG 1080×1350)</strong> com os 4 pilares do portal, checagem dos debates e o link direto <strong>https://qual-voto.vercel.app</strong> pronto para postar no Feed ou nos Stories.
              </p>
            </div>
            <a
              href="/instagram-posts.html"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-manipulation select-none active:scale-95 shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-display font-bold text-xs sm:text-sm uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_#059669] transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4 stroke-[2.5]" />
              Abrir Gerador de Posts p/ Instagram
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* =================================================================
              DIRETÓRIO COMPLETO DE LINKS E REFERÊNCIAS OFICIAIS AUDITÁVEIS
          ================================================================= */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-display font-bold text-zinc-950 uppercase tracking-wider flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-700 shrink-0" />
                Links Diretos das Fontes Primárias Oficiais (Clique para Auditar)
              </h4>
              <span className="text-[11px] font-mono text-zinc-500">
                Todas as tags [FONTE] ao longo do portal também são links clicáveis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 print-cols-3 gap-2.5">
              {(Object.keys(SOURCE_STYLES) as SourceBadgeType[]).map((key) => {
                const item = SOURCE_STYLES[key];
                return (
                  <a
                    key={key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between p-3 rounded-xl border border-zinc-200 hover:border-zinc-900 bg-zinc-50/70 hover:bg-white transition-all shadow-xs hover:shadow-[2px_2px_0px_#18181b]"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${item.bg} ${item.text} ${item.border}`}
                        >
                          [{key}]
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 group-hover:underline">
                          Acessar Portal
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                      <div className="text-xs font-bold text-zinc-900 leading-snug">
                        {item.nomeCompleto}
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        {item.descricao}
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-zinc-200/80 text-[10px] font-mono text-zinc-500 truncate">
                      {item.url}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500 text-center sm:text-left">
            <span>
              Observatório Quantitativo da República (2003–2026) •{" "}
              <a
                href="https://qual-voto.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:underline"
              >
                https://qual-voto.vercel.app
              </a>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 print:hidden">
              <a
                href="/instagram-posts.html"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-manipulation select-none active:scale-95 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono font-bold text-xs uppercase tracking-wider border border-zinc-950 cursor-pointer transition"
              >
                <Instagram className="w-3.5 h-3.5 text-yellow-300" />
                Kit Instagram (Eleitor Indeciso)
              </a>
              <button
                onClick={handlePrintDossier}
                type="button"
                className="touch-manipulation select-none active:scale-95 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-yellow-300 font-mono font-bold text-xs uppercase tracking-wider border border-zinc-950 cursor-pointer transition"
              >
                <Printer className="w-3.5 h-3.5" />
                Exportar Relatório Integral (PDF A4)
              </button>
            </div>
            <span className="hidden print:inline font-bold text-zinc-800">
              Dossiê Oficial Impresso Integralmente • Fontes Auditadas: IBGE • BCB • TN • INPE • STF • STJ • TSE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
