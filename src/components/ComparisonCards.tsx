import React from 'react';
import { ComparisonMetrics } from '../types';
import { 
  formatCurrency, 
  formatPercent, 
  formatHours,
  calculateIpcaCorrection 
} from '../utils/calculations';
import { 
  Wallet, 
  Percent, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  User,
  Calendar,
  Sparkles,
  Trophy,
  CheckCircle2,
  Award
} from 'lucide-react';

interface ComparisonCardsProps {
  baseMetrics: ComparisonMetrics;
  targetMetrics: ComparisonMetrics;
  itemName: string;
  isCustom?: boolean;
}

export const ComparisonCards: React.FC<ComparisonCardsProps> = ({
  baseMetrics,
  targetMetrics,
  itemName,
  isCustom = false,
}) => {
  const ipcaEquivalentInTarget = calculateIpcaCorrection(
    baseMetrics.itemPrice,
    baseMetrics.year,
    targetMetrics.year
  );

  // Variação de unidades compradas com 1 salário
  const unitsRatio = (targetMetrics.unitsPerSalary - baseMetrics.unitsPerSalary) / (baseMetrics.unitsPerSalary || 1);
  const unitsRatioPct = unitsRatio * 100;

  // Variação do impacto no salário mínimo
  const effortReductionPct = ((baseMetrics.percentOfSalary - targetMetrics.percentOfSalary) / (baseMetrics.percentOfSalary || 1)) * 100;

  // Diferença percentual do preço de destino vs correção pura IPCA
  const diffFromIpcaPct = ipcaEquivalentInTarget > 0 
    ? ((targetMetrics.itemPrice - ipcaEquivalentInTarget) / ipcaEquivalentInTarget) * 100 
    : 0;

  // Análise de Desempenho (% do Salário Mínimo: menor percentual = melhor poder de compra)
  const basePercent = baseMetrics.percentOfSalary;
  const targetPercent = targetMetrics.percentOfSalary;
  const isSameYear = baseMetrics.year === targetMetrics.year;
  const isTie = Math.abs(basePercent - targetPercent) < 0.005;

  const isBaseWinner = !isSameYear && !isTie && basePercent < targetPercent;
  const isTargetWinner = !isSameYear && !isTie && targetPercent < basePercent;

  const winnerYear = isBaseWinner ? baseMetrics.year : isTargetWinner ? targetMetrics.year : null;
  const winnerPercent = isBaseWinner ? basePercent : isTargetWinner ? targetPercent : null;
  const loserYear = isBaseWinner ? targetMetrics.year : isTargetWinner ? baseMetrics.year : null;
  const loserPercent = isBaseWinner ? targetPercent : isTargetWinner ? basePercent : null;

  const ppDifference = (winnerPercent !== null && loserPercent !== null)
    ? Math.abs(loserPercent - winnerPercent)
    : 0;

  const relativeAdvantage = (winnerPercent !== null && loserPercent !== null && loserPercent > 0)
    ? ((loserPercent - winnerPercent) / loserPercent) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* BALÃO 1: CORREÇÃO OFICIAL PELA INFLAÇÃO (IPCA) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs text-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card Esquerdo: Correção Oficial pela Inflação (IPCA) */}
          <div className="lg:col-span-8 bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-emerald-100/80 text-emerald-800 rounded-xl shrink-0 border border-emerald-200/70">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                  Correção Oficial pela Inflação (IPCA)
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                  IBGE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                <strong className="text-slate-900 font-semibold">{formatCurrency(baseMetrics.itemPrice)}</strong> em{' '}
                <strong className="text-slate-900 font-semibold">{baseMetrics.year}</strong> corrigido estritamente pelo IPCA
                acumulado equivaleria a:{' '}
                <span className="font-bold text-slate-900 underline decoration-emerald-500 decoration-2 font-mono">
                  {formatCurrency(ipcaEquivalentInTarget)}
                </span>{' '}
                em <strong className="text-slate-900 font-semibold">{targetMetrics.year}</strong>.
              </p>
            </div>
          </div>

          {/* Card Direito: Preço Praticado no Ano Alvo */}
          <div className="lg:col-span-4 bg-emerald-50/70 rounded-xl p-4 sm:p-5 border border-emerald-200/80 flex flex-col justify-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 font-display">
              Preço de {itemName} em {targetMetrics.year}:
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                {formatCurrency(targetMetrics.itemPrice)}
              </span>
              {diffFromIpcaPct !== 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  diffFromIpcaPct > 0 
                    ? 'bg-amber-100 text-amber-800 border border-amber-300/60' 
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300/60'
                }`}>
                  {diffFromIpcaPct > 0 ? `+${diffFromIpcaPct.toFixed(0)}%` : `${diffFromIpcaPct.toFixed(0)}%`}
                  <span className="font-medium text-[10px] ml-1">
                    vs IPCA
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BALÃO 2: SINALIZAÇÃO DE MELHOR DESEMPENHO (MENOR % DO SALÁRIO MÍNIMO) */}
      {!isSameYear && !isTie && winnerYear !== null && winnerPercent !== null && loserYear !== null && loserPercent !== null && (
        <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-teal-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-500 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs shrink-0 ring-2 ring-emerald-400/40">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 font-display">
                  Melhor Desempenho na Comparação
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold text-xs rounded-full shadow-2xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ano de {winnerYear}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed">
                O ano de <strong className="text-slate-950 font-bold">{winnerYear}</strong> teve o melhor desempenho ao comprometer a <strong className="text-emerald-800 font-extrabold underline decoration-emerald-500 decoration-2">menor % do Salário Mínimo ({formatPercent(winnerPercent)})</strong>, contra <strong className="text-slate-900 font-bold">{formatPercent(loserPercent)}</strong> em {loserYear}.
                {relativeAdvantage > 0 && (
                  <span className="text-slate-700 ml-1">
                    Isso representou um custo relativo <strong className="text-emerald-800 font-bold">{relativeAdvantage.toFixed(0)}% menor</strong> para o trabalhador ({ppDifference.toFixed(1)} pontos percentuais a menos do salário).
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 bg-white/90 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-emerald-300 shadow-2xs self-stretch md:self-auto justify-between md:justify-start">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-500 font-display">Vencedor ({winnerYear})</div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono">
                {formatPercent(winnerPercent)} do salário
              </div>
            </div>
            <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          </div>
        </div>
      )}

      {!isSameYear && isTie && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-300 shadow-2xs flex items-center gap-3.5 text-slate-700">
          <div className="p-2.5 bg-slate-200 text-slate-700 rounded-xl">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-display">Desempenho Idêntico</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Em ambos os anos ({baseMetrics.year} e {targetMetrics.year}), o item representou rigorosamente a mesma fatia do salário mínimo ({formatPercent(basePercent)}).
            </p>
          </div>
        </div>
      )}

      {/* BALÃO 3: COMPARAÇÃO DAS DUAS ÉPOCAS (DUAL COLUMN COMPARISON) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs text-slate-900 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* COLUNA 1: ANO BASE */}
        <div className="flex flex-col">
          {/* Header do Ano Base */}
          <div className={`text-white py-3 px-5 rounded-xl flex items-center justify-between shadow-2xs transition-colors ${
            isBaseWinner ? 'bg-slate-900 ring-2 ring-emerald-500' : 'bg-slate-900'
          }`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-display">
                Ano Base Selecionado
              </span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                {baseMetrics.year}
              </span>
            </div>
            {isBaseWinner ? (
              <span className="text-xs font-bold px-3 py-1 bg-emerald-500 text-white rounded-lg shadow-xs flex items-center gap-1.5 ring-2 ring-emerald-300/40">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                Melhor Desempenho
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                Ponto de Partida
              </span>
            )}
          </div>

          {/* Card do Ano Base */}
          <div className={`w-full rounded-xl p-5 sm:p-6 mt-3 flex flex-col justify-between flex-1 space-y-4 transition-all ${
            isBaseWinner
              ? 'bg-emerald-50/40 border-2 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
              : 'bg-slate-50/70 border border-slate-200/80'
          }`}>
            {/* Destaque no topo do card quando for o vencedor */}
            {isBaseWinner && (
              <div className="flex items-center justify-between px-3.5 py-2 bg-emerald-600 text-white rounded-xl shadow-xs text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Ano com Menor % do Salário Mínimo
                </span>
                <span className="bg-emerald-700 px-2 py-0.5 rounded font-mono text-[11px]">
                  {formatPercent(basePercent)}
                </span>
              </div>
            )}

            {/* Presidente e Avatar ou Indicador Temporal */}
            {!isCustom ? (
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-3">
                  {baseMetrics.president.avatarUrl ? (
                    <img
                      src={baseMetrics.president.avatarUrl}
                      alt={baseMetrics.president.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-300 shadow-xs bg-slate-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-sm ring-2 ring-slate-300 shadow-xs">
                      {baseMetrics.president.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 font-display">
                        {baseMetrics.president.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 font-bold rounded-md">
                        {baseMetrics.president.party}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Mandato: {baseMetrics.president.term}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="p-2 bg-slate-200 rounded-lg text-slate-700">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-display">
                      Referência Base: {baseMetrics.year}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Salário Mínimo Oficial: {formatCurrency(baseMetrics.salary)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Preço do item no ano */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xs font-semibold text-slate-600 block">Preço de "{itemName}"</span>
                <span className="text-[10px] text-slate-600">Na época ({baseMetrics.year})</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                {formatCurrency(baseMetrics.itemPrice)}
              </span>
            </div>

            {/* Métricas Principais */}
            <div className="space-y-2">
              {/* Salário Mínimo */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Salário Mínimo Legal</div>
                    <div className="text-[10px] text-slate-600">Piso nacional na época</div>
                  </div>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                  {formatCurrency(baseMetrics.salary)}
                </div>
              </div>

              {/* % do Salário Mínimo (com sinalização de vencedor/menor % ou maior %) */}
              {isBaseWinner ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-100/70 border-2 border-emerald-500 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-2xs">
                      <Trophy className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-emerald-950">% do Salário Mínimo</span>
                        <span className="px-1.5 py-0.2 bg-emerald-700 text-white text-[9px] font-extrabold uppercase rounded tracking-wide">
                          Melhor
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-800 font-semibold">
                        Menor % do salário (melhor desempenho)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-emerald-800 font-mono">
                      {formatPercent(baseMetrics.percentOfSalary)}
                    </div>
                    {baseMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-emerald-900/80 font-medium">
                        {(baseMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              ) : isTargetWinner ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">% do Salário Mínimo</div>
                      <div className="text-[10px] text-amber-700 font-medium">
                        +{ppDifference.toFixed(1)} pp a mais que em {winnerYear}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-amber-700 font-mono">
                      {formatPercent(baseMetrics.percentOfSalary)}
                    </div>
                    {baseMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-amber-800/80 font-medium">
                        {(baseMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">% do Salário Mínimo</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Peso no orçamento mensal
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                      {formatPercent(baseMetrics.percentOfSalary)}
                    </div>
                    {baseMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-slate-600 font-medium">
                        {(baseMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Capacidade de Compra em Unidades */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Poder de Compra</div>
                    <div className="text-[10px] text-slate-600">Unidades com 1 salário</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {baseMetrics.unitsPerSalary >= 10
                      ? Math.floor(baseMetrics.unitsPerSalary).toLocaleString('pt-BR')
                      : baseMetrics.unitsPerSalary >= 1
                        ? baseMetrics.unitsPerSalary.toFixed(2)
                        : baseMetrics.unitsPerSalary < 0.05
                          ? baseMetrics.unitsPerSalary.toFixed(4)
                          : baseMetrics.unitsPerSalary.toFixed(3)}{' '}
                    <span className="text-xs font-normal text-slate-500 font-sans">unid.</span>
                  </div>
                  {baseMetrics.unitsPerSalary < 1 && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      {(1 / baseMetrics.unitsPerSalary).toFixed(1)} salários p/ 1 unid.
                    </div>
                  )}
                </div>
              </div>

              {/* Horas de Trabalho Necessárias */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Tempo de Trabalho</div>
                    <div className="text-[10px] text-slate-600">Base CLT de 220h/mês</div>
                  </div>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                  {formatHours(baseMetrics.hoursOfWork)}
                </div>
              </div>
            </div>

            {/* Contexto Resumido do Presidente */}
            {!isCustom && (
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 leading-relaxed italic">
                "{baseMetrics.president.description}"
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 2: ANO DE DESTINO */}
        <div className="flex flex-col">
          {/* Header do Ano de Destino */}
          <div className={`text-white py-3 px-5 rounded-xl flex items-center justify-between shadow-2xs transition-colors ${
            isTargetWinner ? 'bg-emerald-800 ring-2 ring-emerald-400' : 'bg-emerald-800'
          }`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block font-display">
                Ano Comparado {targetMetrics.year === 2026 ? '(Hoje)' : ''}
              </span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                {targetMetrics.year}
              </span>
            </div>
            {isTargetWinner ? (
              <span className="text-xs font-bold px-3 py-1 bg-emerald-400 text-emerald-950 rounded-lg shadow-xs flex items-center gap-1.5 ring-2 ring-white/30">
                <Trophy className="w-3.5 h-3.5 text-emerald-900" />
                Melhor Desempenho
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-900 text-emerald-200 rounded-lg border border-emerald-700">
                Cenário de Comparação
              </span>
            )}
          </div>

          {/* Card do Ano de Destino */}
          <div className={`w-full rounded-xl p-5 sm:p-6 mt-3 flex flex-col justify-between flex-1 space-y-4 transition-all ${
            isTargetWinner
              ? 'bg-emerald-50/40 border-2 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
              : 'bg-slate-50/70 border border-slate-200/80'
          }`}>
            {/* Destaque no topo do card quando for o vencedor */}
            {isTargetWinner && (
              <div className="flex items-center justify-between px-3.5 py-2 bg-emerald-600 text-white rounded-xl shadow-xs text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Ano com Menor % do Salário Mínimo
                </span>
                <span className="bg-emerald-700 px-2 py-0.5 rounded font-mono text-[11px]">
                  {formatPercent(targetPercent)}
                </span>
              </div>
            )}

            {/* Presidente e Avatar ou Indicador Temporal */}
            {!isCustom ? (
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-3">
                  {targetMetrics.president.avatarUrl ? (
                    <img
                      src={targetMetrics.president.avatarUrl}
                      alt={targetMetrics.president.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-400/50 shadow-xs bg-slate-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center font-bold text-sm ring-2 ring-emerald-400/50 shadow-xs">
                      {targetMetrics.president.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 font-display">
                        {targetMetrics.president.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-bold rounded-md">
                        {targetMetrics.president.party}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Mandato: {targetMetrics.president.term}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 font-display">
                      Referência Comparada: {targetMetrics.year}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Salário Mínimo Oficial: {formatCurrency(targetMetrics.salary)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Preço do item no ano */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xs font-semibold text-slate-600 block">Preço de "{itemName}"</span>
                <span className="text-[10px] text-slate-600">Praticado em {targetMetrics.year}</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono">
                {formatCurrency(targetMetrics.itemPrice)}
              </span>
            </div>

            {/* Métricas Principais */}
            <div className="space-y-2">
              {/* Salário Mínimo */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Salário Mínimo Vigente</div>
                    <div className="text-[10px] text-slate-600">Piso nacional legal</div>
                  </div>
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-800 font-mono">
                  {formatCurrency(targetMetrics.salary)}
                </div>
              </div>

              {/* % do Salário Mínimo (com sinalização de vencedor/menor % ou maior %) */}
              {isTargetWinner ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-100/70 border-2 border-emerald-500 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-2xs">
                      <Trophy className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-emerald-950">% do Salário Mínimo</span>
                        <span className="px-1.5 py-0.2 bg-emerald-700 text-white text-[9px] font-extrabold uppercase rounded tracking-wide">
                          Melhor
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-800 font-semibold">
                        Menor % do salário (melhor desempenho)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-emerald-800 font-mono">
                      {formatPercent(targetMetrics.percentOfSalary)}
                    </div>
                    {targetMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-emerald-900/80 font-medium">
                        {(targetMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              ) : isBaseWinner ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">% do Salário Mínimo</div>
                      <div className="text-[10px] text-amber-700 font-medium">
                        +{ppDifference.toFixed(1)} pp a mais que em {winnerYear}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-amber-700 font-mono">
                      {formatPercent(targetMetrics.percentOfSalary)}
                    </div>
                    {targetMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-amber-800/80 font-medium">
                        {(targetMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">% do Salário Mínimo</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        {effortReductionPct > 0 ? (
                          <span>-{effortReductionPct.toFixed(0)}% menos esforço</span>
                        ) : (
                          <span>+{Math.abs(effortReductionPct).toFixed(0)}% mais esforço</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-emerald-800 font-mono">
                      {formatPercent(targetMetrics.percentOfSalary)}
                    </div>
                    {targetMetrics.percentOfSalary >= 100 && (
                      <div className="text-[10px] text-emerald-800/80 font-medium">
                        {(targetMetrics.percentOfSalary / 100).toFixed(1)} salários mínimos
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Capacidade de Compra em Unidades */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Poder de Compra</div>
                    <div className="text-[10px] font-semibold">
                      {unitsRatioPct >= 0 ? (
                        <span className="text-emerald-700">+{unitsRatioPct.toFixed(0)}% poder</span>
                      ) : (
                        <span className="text-rose-700">{unitsRatioPct.toFixed(0)}% poder</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                    {targetMetrics.unitsPerSalary >= 10
                      ? Math.floor(targetMetrics.unitsPerSalary).toLocaleString('pt-BR')
                      : targetMetrics.unitsPerSalary >= 1
                        ? targetMetrics.unitsPerSalary.toFixed(2)
                        : targetMetrics.unitsPerSalary < 0.05
                          ? targetMetrics.unitsPerSalary.toFixed(4)
                          : targetMetrics.unitsPerSalary.toFixed(3)}{' '}
                    <span className="text-xs font-normal text-slate-500 font-sans">unid.</span>
                  </div>
                  {targetMetrics.unitsPerSalary < 1 && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      {(1 / targetMetrics.unitsPerSalary).toFixed(1)} salários p/ 1 unid.
                    </div>
                  )}
                </div>
              </div>

              {/* Horas de Trabalho Necessárias */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Tempo de Trabalho</div>
                    <div className="text-[10px] text-slate-600">Base CLT de 220h/mês</div>
                  </div>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                  {formatHours(targetMetrics.hoursOfWork)}
                </div>
              </div>
            </div>

            {/* Contexto Resumido do Presidente */}
            {!isCustom && (
              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 leading-relaxed italic">
                "{targetMetrics.president.description}"
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Marca d'água / Alerta de busca personalizada */}
      {isCustom && (
        <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-300/80 text-center text-xs font-semibold text-amber-900 shadow-2xs">
          “Os valores foram preenchidos pelo usuário e podem não corresponder à realidade dos fatos. Valide as informações em bases de dados oficiais.”
        </div>
      )}
    </div>
  );
};
