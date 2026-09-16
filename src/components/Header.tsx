import React from 'react';
import { TrendingUp, CheckCircle2, Info } from 'lucide-react';

export const Header: React.FC = () => {
  const tooltipText = `Calculadora Histórica de Poder de Compra & Inflação
Fontes Oficiais: FipeZAP • FIPE • DIEESE • ANCINE • ANP • IBGE
Compare o preço de qualquer item entre dois anos para descobrir o impacto real no salário mínimo, o tempo de trabalho necessário para adquiri-lo e a evolução do custo de vida sob cada Presidente da República.`;

  return (
    <header className="border-b border-[#0e5c36] bg-[#0c5934] text-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#107142] flex items-center justify-center shadow-lg ring-3 ring-white/20 shrink-0">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-display">
                  Quanto valia?
                </h1>
                <span className="text-xs sm:text-sm uppercase font-black tracking-wider px-2.5 py-1 bg-white/20 text-emerald-100 rounded-lg border border-white/25 shadow-xs">
                  Brasil 1994 – 2026
                </span>
              </div>

              {/* Subtítulo com Tooltip Explicativo */}
              <div className="relative group inline-block mt-1">
                <p
                  className="text-xs sm:text-sm text-emerald-100/90 font-medium flex items-center gap-1.5 cursor-help hover:text-white transition-colors"
                  title={tooltipText}
                  tabIndex={0}
                >
                  <span className="border-b border-dashed border-emerald-300/60 pb-0.5">
                    Calculadora de Poder de Compra com Evolução do Salário Mínimo e Inflação (IPCA) por Ano
                  </span>
                  <Info className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                </p>

                {/* Tooltip flutuante estilizado */}
                <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[90vw] p-3.5 bg-slate-900 text-white text-xs rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 pointer-events-none">
                  <div className="font-bold text-emerald-300 text-sm mb-1 font-display">
                    Calculadora Histórica de Poder de Compra & Inflação
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-100/90 mb-2 py-0.5 px-2 bg-emerald-950/80 rounded border border-emerald-800/60 inline-block">
                    Fontes Oficiais: FipeZAP • FIPE • DIEESE • ANCINE • ANP • IBGE
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Compare o preço de qualquer item entre dois anos para descobrir o impacto real no salário mínimo, o tempo de trabalho necessário para adquiri-lo e a evolução do custo de vida sob cada Presidente da República.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges de credibilidade, período e piso salarial */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#094226] text-emerald-100 rounded-lg border border-[#148750]/50 font-medium text-[11px]" title="Salário Mínimo: R$ 64,79 (1994) → R$ 1.621,00 (2026)">
              <span className="text-emerald-300 font-bold">1994: R$ 64,79</span>
              <span className="text-emerald-400">→</span>
              <span className="text-white font-bold">2026: R$ 1.621,00</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#094226] text-emerald-100 rounded-lg border border-[#148750]/50 font-medium text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Séries Históricas Oficiais</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

