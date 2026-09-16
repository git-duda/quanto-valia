import { getYearData, HISTORICAL_DATA, getPresetPriceForYear } from '../data/historicalData';
import { ComparisonMetrics, KpiEvaluation, PurchasingPowerStatus } from '../types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + '%';
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} min`;
  }
  if (hours < 24) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  }
  if (hours < 440) {
    const days = (hours / 8).toFixed(1); // 8h diárias de trabalho
    return `${days} dias de trabalho (${Math.round(hours)}h)`;
  }
  const months = hours / 220;
  if (months < 24) {
    return `${months.toFixed(1)} meses de trabalho CLT (${Math.round(hours).toLocaleString('pt-BR')}h)`;
  }
  const years = (months / 12).toFixed(1);
  return `${years} anos de trabalho CLT (${Math.round(months)} meses)`;
}

export function calculateIpcaCorrection(price: number, fromYear: number, toYear: number): number {
  const fromData = getYearData(fromYear);
  const toData = getYearData(toYear);
  if (!fromData || !toData || fromData.ipcaIndex === 0) {
    return price;
  }
  return price * (toData.ipcaIndex / fromData.ipcaIndex);
}

export function computeYearMetrics(
  year: number,
  price: number
): ComparisonMetrics {
  const yearData = getYearData(year);
  const salary = yearData.salary;
  const percentOfSalary = (price / salary) * 100;
  const unitsPerSalary = salary / price;
  // 220 horas de jornada padrão mensal pela CLT
  const hoursOfWork = (price / salary) * 220;

  return {
    year,
    salary,
    itemPrice: price,
    percentOfSalary,
    unitsPerSalary,
    hoursOfWork,
    president: yearData.president,
  };
}

export function evaluatePurchasingPowerKpi(
  baseMetrics: ComparisonMetrics,
  targetMetrics: ComparisonMetrics,
  itemName: string,
  _isCustom: boolean = false
): KpiEvaluation {
  // O Termômetro e o Índice de Acessibilidade referem-se SEMPRE ao ano mais recente da comparação
  const isTargetMoreRecent = targetMetrics.year >= baseMetrics.year;
  const recentMetrics = isTargetMoreRecent ? targetMetrics : baseMetrics;
  const olderMetrics = isTargetMoreRecent ? baseMetrics : targetMetrics;

  const recentYear = recentMetrics.year;
  const olderYear = olderMetrics.year;

  // Variação percentual de poder de compra do ano mais recente em relação ao ano comparado
  const unitDiffRatio = olderMetrics.unitsPerSalary > 0
    ? (recentMetrics.unitsPerSalary - olderMetrics.unitsPerSalary) / olderMetrics.unitsPerSalary
    : 0;

  // Analisa o comprometimento salarial no ano mais recente
  const pctSalary = recentMetrics.percentOfSalary;

  // Cálculo transparente e matemático do Índice de Acessibilidade (0 a 100%)
  let score: number;
  let formulaStr: string;
  let formulaDesc: string;

  if (pctSalary <= 100) {
    // Bem de consumo cujo preço está dentro de 1 salário mínimo:
    // O índice mede a folga orçamentária após adquirir 1 unidade (100% - comprometimento)
    score = Math.max(5, Math.min(99, Math.round(100 - pctSalary)));
    formulaStr = 'Índice = 100% - (Preço ÷ Salário Mínimo × 100)';
    formulaDesc = `Mede a proporção livre do salário mínimo após a compra de 1 unidade: 100% - (${formatCurrency(recentMetrics.itemPrice)} ÷ ${formatCurrency(recentMetrics.salary)} × 100) = ${score}%`;
  } else {
    // Bem durável ou de alto valor (preço maior que 1 salário mínimo):
    // Mede a facilidade relativa de aquisição em função do número de salários mínimos integrais
    const salariesNeeded = pctSalary / 100;
    score = Math.max(5, Math.min(60, Math.round(100 / (1 + salariesNeeded * 0.08))));
    formulaStr = 'Índice = 100 ÷ (1 + Salários Mínimos Necessários × 0,08)';
    formulaDesc = `Mede o esforço de amortização para bens duráveis (${salariesNeeded.toFixed(1)} salários mínimos integrais): 100 ÷ (1 + ${salariesNeeded.toFixed(1)} × 0,08) = ${score}%`;
  }

  // Classificação do nível com base no score
  let level: KpiEvaluation['level'];
  let badgeColor: string;
  let badgeBg: string;
  let textColor: string;
  let title: string;

  if (score >= 80) {
    level = 'excelente';
    badgeColor = 'text-emerald-700 border-emerald-300';
    badgeBg = 'bg-emerald-50';
    textColor = 'text-emerald-800';
    title = `Excelente Acessibilidade em ${recentYear}`;
  } else if (score >= 60) {
    level = 'bom';
    badgeColor = 'text-emerald-700 border-emerald-300';
    badgeBg = 'bg-emerald-50';
    textColor = 'text-emerald-800';
    title = `Boa Acessibilidade em ${recentYear}`;
  } else if (score >= 40) {
    level = 'moderado';
    badgeColor = 'text-amber-700 border-amber-300';
    badgeBg = 'bg-amber-50';
    textColor = 'text-amber-800';
    title = `Acessibilidade Moderada em ${recentYear}`;
  } else if (score >= 20) {
    level = 'desfavoravel';
    badgeColor = 'text-orange-700 border-orange-300';
    badgeBg = 'bg-orange-50';
    textColor = 'text-orange-800';
    title = `Acessibilidade Comprimida em ${recentYear}`;
  } else {
    level = 'critico';
    badgeColor = 'text-rose-700 border-rose-300';
    badgeBg = 'bg-rose-50';
    textColor = 'text-rose-800';
    title = `Alta Exigência Salarial em ${recentYear}`;
  }

  // Determina se o poder de compra foi comprimido, se manteve estável ou foi expandido
  let status: PurchasingPowerStatus;
  let statusLabel: string;
  let statusDescription: string;
  let comparisonText: string;

  if (recentYear === olderYear) {
    status = 'estavel';
    statusLabel = 'Poder de Compra Estável';
    statusDescription = 'Mesmo ano de referência selecionado na comparação.';
    comparisonText = `Os dois anos selecionados são idênticos (${recentYear}), não havendo variação temporal.`;
  } else if (unitDiffRatio > 0.02) {
    // Ganho superior a +2%
    status = 'expandido';
    statusLabel = 'Poder de Compra Expandido';
    const pctGain = (unitDiffRatio * 100).toFixed(1);
    const timesUnits = (recentMetrics.unitsPerSalary / olderMetrics.unitsPerSalary).toFixed(1);

    if (recentMetrics.percentOfSalary >= 100 || olderMetrics.percentOfSalary >= 100) {
      const salariesDiff = Math.abs(olderMetrics.percentOfSalary / 100 - recentMetrics.percentOfSalary / 100).toFixed(1);
      statusDescription = `O poder de compra foi expandido em relação a ${olderYear}: são necessários ${salariesDiff} salários a menos para comprar este item.`;
      comparisonText = `Em relação a ${olderYear}, o poder de compra foi EXPANDIDO (+${pctGain}%): em ${olderYear} exigiam-se ${(olderMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos, enquanto em ${recentYear} exigem-se ${(recentMetrics.percentOfSalary / 100).toFixed(1)} salários (economia de ${salariesDiff} salários integrais).`;
    } else {
      const hoursSaved = Math.abs(olderMetrics.hoursOfWork - recentMetrics.hoursOfWork).toFixed(1);
      statusDescription = `O poder de compra foi expandido em relação a ${olderYear}: 1 salário mínimo adquire ${timesUnits}x mais unidades, com economia de ${hoursSaved}h de trabalho.`;
      comparisonText = `Em relação a ${olderYear}, o poder de compra foi EXPANDIDO (+${pctGain}%): com 1 salário mínimo de ${recentYear} adquirem-se ${timesUnits}x mais unidades do item, economizando ${hoursSaved} horas de trabalho para adquiri-lo.`;
    }
  } else if (unitDiffRatio < -0.02) {
    // Perda superior a 2%
    status = 'comprimido';
    statusLabel = 'Poder de Compra Comprimido';
    const pctLoss = Math.abs(unitDiffRatio * 100).toFixed(1);
    const timesLoss = (olderMetrics.unitsPerSalary / recentMetrics.unitsPerSalary).toFixed(1);

    if (recentMetrics.percentOfSalary >= 100 || olderMetrics.percentOfSalary >= 100) {
      const extraSalaries = Math.abs(recentMetrics.percentOfSalary / 100 - olderMetrics.percentOfSalary / 100).toFixed(1);
      statusDescription = `O poder de compra foi comprimido em relação a ${olderYear}: são exigidos +${extraSalaries} salários adicionais para comprar o bem.`;
      comparisonText = `Em relação a ${olderYear}, o poder de compra foi COMPRIMIDO (-${pctLoss}%): em ${olderYear} eram necessários ${(olderMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos, contra ${(recentMetrics.percentOfSalary / 100).toFixed(1)} salários em ${recentYear} (+${extraSalaries} salários adicionais de esforço).`;
    } else {
      const extraHours = Math.abs(recentMetrics.hoursOfWork - olderMetrics.hoursOfWork).toFixed(1);
      statusDescription = `O poder de compra foi comprimido em relação a ${olderYear}: exige-se +${extraHours}h a mais de trabalho para comprar a mesma unidade.`;
      comparisonText = `Em relação a ${olderYear}, o poder de compra foi COMPRIMIDO (-${pctLoss}%): em ${olderYear} o salário mínimo comprava ${timesLoss}x mais unidades. São necessárias +${extraHours} horas a mais de trabalho em ${recentYear} para adquiri-lo.`;
    }
  } else {
    // Variação entre -2% e +2%
    status = 'estavel';
    statusLabel = 'Poder de Compra Estável';
    const diffPct = (unitDiffRatio * 100).toFixed(1);
    statusDescription = `O poder de compra manteve-se praticamente estável em relação a ${olderYear} (variação residual de ${diffPct}%).`;
    comparisonText = `Em relação a ${olderYear}, o poder de compra SE MANTEVE ESTÁVEL (variação marginal de ${diffPct}%): a quantidade de trabalho e a parcela do piso salarial exigidas permaneceram equivalentes entre os dois períodos.`;
  }

  // Explicação clara e direta do porquê do índice ter esse valor específico
  let whyScoreText: string;
  if (pctSalary <= 100) {
    whyScoreText = `O índice é de ${score}% porque em ${recentYear} o item "${itemName}" (custando ${formatCurrency(recentMetrics.itemPrice)}) consome ${formatPercent(recentMetrics.percentOfSalary)} do salário mínimo vigente (${formatCurrency(recentMetrics.salary)}), exigindo ${formatHours(recentMetrics.hoursOfWork)} de trabalho em uma jornada mensal padrão de 220 horas.`;
  } else {
    const salCount = (pctSalary / 100).toFixed(1);
    whyScoreText = `O índice é de ${score}% porque em ${recentYear} o item "${itemName}" custa ${formatCurrency(recentMetrics.itemPrice)}, exigindo ${salCount} salários mínimos integrais (${formatHours(recentMetrics.hoursOfWork)} de esforço de trabalho). Trata-se de um investimento de alto valor relativo.`;
  }

  // Resumo clássico simplificado para retrocompatibilidade
  const summary = whyScoreText;
  const comparisonNarrative = comparisonText;

  return {
    level,
    score,
    title,
    badgeColor,
    badgeBg,
    textColor,
    status,
    statusLabel,
    statusDescription,
    whyScoreText,
    comparisonText,
    formulaDetails: {
      formula: formulaStr,
      description: formulaDesc,
      itemPrice: recentMetrics.itemPrice,
      salary: recentMetrics.salary,
      percentOfSalary: recentMetrics.percentOfSalary,
      hoursOfWork: recentMetrics.hoursOfWork,
    },
    summary,
    comparisonNarrative,
  };
}

export function generateEvolutionSeries(
  baseYear: number,
  basePrice: number,
  targetYear: number,
  targetPrice: number,
  presetId?: string
) {
  // Retorna série anual de 1994 até 2026
  const baseYearData = getYearData(baseYear);
  const targetYearData = getYearData(targetYear);

  return HISTORICAL_DATA.map((d) => {
    // Se for um item de série oficial identificada, usa os dados anuais da série oficial
    let estimatedPrice: number;
    if (presetId && presetId !== 'custom') {
      estimatedPrice = getPresetPriceForYear(presetId, d.year);
    } else {
      // Estimativa para item customizado interpolando por IPCA
      estimatedPrice = basePrice * (d.ipcaIndex / baseYearData.ipcaIndex);
      if (targetPrice && targetYear !== baseYear) {
        const factorBase = d.ipcaIndex / baseYearData.ipcaIndex;
        const expectedTargetByIpca = basePrice * (targetYearData.ipcaIndex / baseYearData.ipcaIndex);
        const realTargetRatio = targetPrice / expectedTargetByIpca;
        
        const t = Math.min(1, Math.max(0, (d.year - baseYear) / (targetYear - baseYear)));
        const blendedRatio = 1 + (realTargetRatio - 1) * t;
        estimatedPrice = estimatedPrice * blendedRatio;
      }
    }

    const unitsCanBuy = estimatedPrice > 0 ? d.salary / estimatedPrice : 0;
    const percentSalary = estimatedPrice > 0 ? (estimatedPrice / d.salary) * 100 : 0;
    const hoursNeeded = (percentSalary / 100) * 220;

    // Salário mínimo real corrigido para a moeda de hoje (2026)
    const currentIpca = getYearData(2026).ipcaIndex;
    const salaryAdjustedToToday = d.salary * (currentIpca / d.ipcaIndex);

    return {
      year: d.year,
      salaryNominal: d.salary,
      salaryRealToday: Math.round(salaryAdjustedToToday * 100) / 100,
      ipcaAnnual: d.ipcaAnnual,
      estimatedPrice: Math.round(estimatedPrice * 100) / 100,
      unitsCanBuy: unitsCanBuy < 0.05 
        ? Math.round(unitsCanBuy * 10000) / 10000 
        : unitsCanBuy < 1 
          ? Math.round(unitsCanBuy * 1000) / 1000 
          : Math.round(unitsCanBuy * 10) / 10,
      percentSalary: Math.round(percentSalary * 100) / 100,
      hoursNeeded: Math.round(hoursNeeded * 10) / 10,
      president: d.president.name,
      party: d.president.party,
    };
  });
}
