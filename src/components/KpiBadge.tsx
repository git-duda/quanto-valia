import React, { useState, useRef, useEffect } from 'react';
import { KpiEvaluation } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Scale,
  Calculator,
  X,
} from 'lucide-react';
import { formatCurrency, formatHours, formatPercent } from '../utils/calculations';

interface KpiBadgeProps {
  kpi: KpiEvaluation;
  baseYear: number;
  targetYear: number;
}

export const KpiBadge: React.FC<KpiBadgeProps> = ({ kpi, baseYear, targetYear }) => {
  const recentYear = Math.max(baseYear, targetYear);
  const olderYear = Math.min(baseYear, targetYear);
  const isSameYear = baseYear === targetYear;

  const [showFormulaTooltip, setShowFormulaTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Fecha o tooltip ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowFormulaTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusBadge = () => {
    switch (kpi.status) {
      case 'expandido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-2xs font-display">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            Poder de Compra Expandido
          </span>
        );
      case 'comprimido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300/80 shadow-2xs font-display">
            <TrendingDown className="w-3.5 h-3.5 text-rose-700" />
            Poder de Compra Comprimido
          </span>
        );
      case 'estavel':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300/80 shadow-2xs font-display">
            <Scale className="w-3.5 h-3.5 text-slate-600" />
            Poder de Compra Estável
          </span>
        );
    }
  };

  const getMainIcon = () => {
    if (kpi.status === 'expandido') {
      return <TrendingUp className="w-5 h-5 text-emerald-700" />;
    }
    if (kpi.status === 'comprimido') {
      return <TrendingDown className="w-5 h-5 text-rose-700" />;
    }
    switch (kpi.level) {
      case 'excelente':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case 'bom':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'moderado':
        return <Scale className="w-5 h-5 text-amber-600" />;
      case 'desfavoravel':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'critico':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
    }
  };

  const getMeterColor = () => {
    if (kpi.score >= 80) return 'bg-emerald-500';
    if (kpi.score >= 60) return 'bg-emerald-500';
    if (kpi.score >= 40) return 'bg-amber-500';
    if (kpi.score >= 20) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5 text-slate-900">
      {/* 1. TOPO: TÍTULO, STATUS E MEDIDOR COM TOOLTIP DA FÓRMULA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className={`p-3 rounded-xl border shadow-2xs ${kpi.badgeBg} ${kpi.badgeColor} shrink-0`}>
            {getMainIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
                Termômetro de Poder de Compra ({recentYear})
              </span>
              {getStatusBadge()}
            </div>
            <h3 className={`text-base sm:text-lg font-bold font-display mt-0.5 ${kpi.textColor}`}>
              {kpi.title}
            </h3>
          </div>
        </div>

        {/* Medidor visual de acessibilidade com Tooltip interativo */}
        <div className="relative" ref={tooltipRef}>
          <div
            className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 px-4 py-2.5 rounded-xl border border-slate-200/80 cursor-pointer transition-colors select-none"
            onClick={() => setShowFormulaTooltip(!showFormulaTooltip)}
            onMouseEnter={() => setShowFormulaTooltip(true)}
            title="Clique ou passe o mouse para ver a fórmula de cálculo"
          >
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-600 font-bold uppercase tracking-wider font-display">
                <span>Índice de Acessibilidade</span>
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="text-base font-bold text-slate-900 font-mono">
                {kpi.score}%
              </div>
            </div>

            <div className="w-24 sm:w-28 bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-300/60 shrink-0">
              <div
                className={`h-full ${getMeterColor()} transition-all duration-500 rounded-full`}
                style={{ width: `${kpi.score}%` }}
              />
            </div>
          </div>

          {/* BALÃO / TOOLTIP DA FÓRMULA DO ÍNDICE DE ACESSIBILIDADE */}
          {showFormulaTooltip && (
            <div
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowFormulaTooltip(false)}
            >
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-display">
                  <Calculator className="w-4 h-4" />
                  <span>Fórmula do Índice de Acessibilidade</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFormulaTooltip(false);
                  }}
                  className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-3 text-xs">
                <div>
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Equação Matemática:</div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 leading-relaxed font-semibold">
                    {kpi.formulaDetails.formula}
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 text-[11px]">
                  <div className="font-semibold text-slate-300 pb-1 border-b border-slate-800">
                    Valores em {recentYear}:
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Preço do Item:</span>
                    <span className="font-mono text-white font-medium">
                      {formatCurrency(kpi.formulaDetails.itemPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Salário Mínimo ({recentYear}):</span>
                    <span className="font-mono text-white font-medium">
                      {formatCurrency(kpi.formulaDetails.salary)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Comprometimento do Piso:</span>
                    <span className="font-mono text-amber-300 font-medium">
                      {formatPercent(kpi.formulaDetails.percentOfSalary)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Esforço em Horas:</span>
                    <span className="font-mono text-white font-medium">
                      {formatHours(kpi.formulaDetails.hoursOfWork)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800 text-xs">
                    <span>Resultado do Índice:</span>
                    <span className="font-mono">{kpi.score}%</span>
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-slate-400 leading-normal border-t border-slate-800/80">
                  <span className="text-slate-300 font-semibold">Classificação da Escala:</span>
                  <div className="grid grid-cols-2 gap-1 mt-1 font-mono text-[10px]">
                    <span className="text-emerald-400">≥ 80%: Excelente</span>
                    <span className="text-emerald-300">60% – 79%: Bom</span>
                    <span className="text-amber-400">40% – 59%: Moderado</span>
                    <span className="text-rose-400">&lt; 40%: Comprimido</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. CORPO OBJETIVO: POR QUE O ÍNDICE TEM ESSE VALOR & COMPARAÇÃO DIRETA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        {/* Bloco 1: Por que o índice é {score}% */}
        <div className="p-4 sm:p-5 bg-slate-50/90 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed flex flex-col justify-between">
          <div>
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-2 flex items-center gap-2 font-display">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Por que o índice é {kpi.score}% em {recentYear}?
            </span>
            <p className="text-slate-700 leading-relaxed">
              {kpi.whyScoreText}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Piso Salarial: <strong className="text-slate-800">{formatCurrency(kpi.formulaDetails.salary)}</strong></span>
            <span>Jornada Base: <strong className="text-slate-800">220h/mês</strong></span>
          </div>
        </div>

        {/* Bloco 2: Se o poder de compra foi comprimido, estável ou expandido */}
        <div className={`p-4 sm:p-5 rounded-xl border leading-relaxed flex flex-col justify-between ${
          kpi.status === 'expandido'
            ? 'bg-emerald-50/70 border-emerald-200/90 text-emerald-950'
            : kpi.status === 'comprimido'
            ? 'bg-rose-50/70 border-rose-200/90 text-rose-950'
            : 'bg-slate-50/90 border-slate-200/80 text-slate-800'
        }`}>
          <div>
            <span className="font-bold text-xs uppercase tracking-wider block mb-2 flex items-center gap-2 font-display">
              <span className={`w-2 h-2 rounded-full ${
                kpi.status === 'expandido'
                  ? 'bg-emerald-600'
                  : kpi.status === 'comprimido'
                  ? 'bg-rose-600'
                  : 'bg-slate-600'
              }`} />
              {isSameYear ? `Referência Temporal (${recentYear})` : `Poder de Compra vs ${olderYear}:`}
            </span>
            <p className="leading-relaxed">
              {kpi.comparisonText}
            </p>
          </div>

          {!isSameYear && (
            <div className={`mt-3 pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
              kpi.status === 'expandido'
                ? 'border-emerald-200 text-emerald-800'
                : kpi.status === 'comprimido'
                ? 'border-rose-200 text-rose-800'
                : 'border-slate-200 text-slate-600'
            }`}>
              <span>Diagnóstico Comparativo:</span>
              <span className="uppercase font-bold tracking-wide">
                {kpi.status === 'expandido' && '▲ Poder de Compra Expandido'}
                {kpi.status === 'comprimido' && '▼ Poder de Compra Comprimido'}
                {kpi.status === 'estavel' && '■ Poder de Compra Estável'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

