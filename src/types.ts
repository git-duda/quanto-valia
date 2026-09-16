export interface YearData {
  year: number;
  salary: number; // Salário mínimo nominal em R$
  ipcaAnnual: number; // Inflação IPCA no ano (%)
  ipcaIndex: number; // Número índice acumulado do IPCA (base Jul/1994 = 100)
  president: {
    name: string;
    term: string;
    party: string;
    description: string;
    avatarUrl?: string;
  };
  contextSummary: string; // Resumo econômico do ano
  historicalPrices?: {
    cocaCola2L?: number;
    paoFrancesKg?: number;
    gasolinaLitro?: number;
    bigMac?: number;
    botijaoGas?: number;
    cestaBasica?: number;
    arroz5Kg?: number;
    carroPopular?: number;
    imovelPadrao?: number;
    cinemaIngresso?: number;
  };
}

export interface PresetItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  unit: string;
  defaultPrice1994: number;
  defaultPriceCurrent: number;
  description: string;
  priceKey: string;
  source?: string;
  sourceBadge?: string;
}

export type CalculationMode = 'from_past_to_today' | 'from_today_to_past' | 'custom_years';

export type KpiLevel = 'excelente' | 'bom' | 'moderado' | 'desfavoravel' | 'critico';
export type PurchasingPowerStatus = 'expandido' | 'estavel' | 'comprimido';

export interface KpiEvaluation {
  level: KpiLevel;
  score: number; // 0 to 100
  title: string;
  badgeColor: string;
  badgeBg: string;
  textColor: string;
  status: PurchasingPowerStatus;
  statusLabel: string;
  statusDescription: string;
  whyScoreText: string;
  comparisonText: string;
  formulaDetails: {
    formula: string;
    description: string;
    itemPrice: number;
    salary: number;
    percentOfSalary: number;
    hoursOfWork: number;
  };
  summary: string;
  comparisonNarrative: string;
}

export interface ComparisonMetrics {
  year: number;
  salary: number;
  itemPrice: number;
  percentOfSalary: number;
  unitsPerSalary: number;
  hoursOfWork: number; // baseado em 220h/mês
  president: YearData['president'];
  adjustedPriceIpca?: number;
}
