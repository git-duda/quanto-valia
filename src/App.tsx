/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ComparisonCards } from './components/ComparisonCards';
import { KpiBadge } from './components/KpiBadge';
import { EvolutionChart } from './components/EvolutionChart';
import { HistoricalTable } from './components/HistoricalTable';
import { PRESET_ITEMS } from './data/presets';
import { getYearData, getPresetPriceForYear } from './data/historicalData';
import { 
  computeYearMetrics, 
  evaluatePurchasingPowerKpi, 
  generateEvolutionSeries,
  calculateIpcaCorrection,
  formatCurrency,
  formatPercent
} from './utils/calculations';
import { PresetItem } from './types';

export default function App() {
  // Preset inicial: Cesta Básica DIEESE ou Coca-Cola
  const defaultPreset = PRESET_ITEMS[0]; // Cesta Básica Completa DIEESE

  const [baseYear, setBaseYear] = useState<number>(1994);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPreset.id);
  const [itemName, setItemName] = useState<string>(defaultPreset.name);
  
  // Preços obtidos automaticamente da fonte DIEESE / IBGE para os anos iniciais
  const initialBasePrice = getPresetPriceForYear(defaultPreset.id, 1994);
  const initialTargetPrice = getPresetPriceForYear(defaultPreset.id, 2026);

  const [basePrice, setBasePrice] = useState<number>(initialBasePrice);
  const [targetPrice, setTargetPrice] = useState<number>(initialTargetPrice);

  // Rastreia o preset ativo selecionado
  const selectedPreset = useMemo(() => {
    return PRESET_ITEMS.find((p) => p.id === selectedPresetId) || null;
  }, [selectedPresetId]);

  // Ao clicar em um item, o valor atualiza sozinho conforme informação do DIEESE/oficial
  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedPresetId(preset.id);
    setItemName(preset.name);
    const newBase = getPresetPriceForYear(preset.id, baseYear);
    const newTarget = getPresetPriceForYear(preset.id, targetYear);
    setBasePrice(newBase);
    setTargetPrice(newTarget);
  };

  // Quando o usuário muda o ano (baseYear ou targetYear), se houver um item preset ativo,
  // atualiza automaticamente os preços para os novos anos escolhidos com base no DIEESE
  useEffect(() => {
    if (selectedPresetId && selectedPresetId !== 'custom') {
      const newBase = getPresetPriceForYear(selectedPresetId, baseYear);
      const newTarget = getPresetPriceForYear(selectedPresetId, targetYear);
      setBasePrice(newBase);
      setTargetPrice(newTarget);
    }
  }, [baseYear, targetYear, selectedPresetId]);

  // Se a própria pessoa alterar o nome do item ou o valor, desvincula do modo automático
  const handleManualItemNameChange = (name: string) => {
    setItemName(name);
    setSelectedPresetId('custom');
  };

  const handleManualBasePriceChange = (price: number) => {
    setBasePrice(price);
    setSelectedPresetId('custom');
  };

  const handleManualTargetPriceChange = (price: number) => {
    setTargetPrice(price);
    setSelectedPresetId('custom');
  };

  // Ajusta automaticamente o preço de destino pela inflação pura do IPCA
  const handleApplyIpcaToTarget = () => {
    const corrected = calculateIpcaCorrection(basePrice, baseYear, targetYear);
    setTargetPrice(Math.round(corrected * 100) / 100);
  };

  // Inverte os anos da comparação (ex: 2026 vs 1994)
  const handleSwapYears = () => {
    const prevBaseYear = baseYear;
    const prevBasePrice = basePrice;
    setBaseYear(targetYear);
    setBasePrice(targetPrice);
    setTargetYear(prevBaseYear);
    setTargetPrice(prevBasePrice);
  };

  const isCustom = selectedPresetId === 'custom';

  const handleSelectCustom = () => {
    setSelectedPresetId('custom');
  };

  // Métricas calculadas
  const baseMetrics = useMemo(() => {
    return computeYearMetrics(baseYear, basePrice);
  }, [baseYear, basePrice]);

  const targetMetrics = useMemo(() => {
    return computeYearMetrics(targetYear, targetPrice);
  }, [targetYear, targetPrice]);

  const kpi = useMemo(() => {
    return evaluatePurchasingPowerKpi(baseMetrics, targetMetrics, itemName, isCustom);
  }, [baseMetrics, targetMetrics, itemName, isCustom]);

  const seriesData = useMemo(() => {
    return generateEvolutionSeries(baseYear, basePrice, targetYear, targetPrice, selectedPresetId);
  }, [baseYear, basePrice, targetYear, targetPrice, selectedPresetId]);

  const baseYearData = useMemo(() => getYearData(baseYear), [baseYear]);
  const targetYearData = useMemo(() => getYearData(targetYear), [targetYear]);

  return (
    <div className="min-h-screen bg-[#ffbd59] text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white p-2.5 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl w-full mx-auto bg-[#107142] rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl overflow-hidden flex flex-col border border-emerald-900/30">
        <Header />

        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-7">
          {/* 1. Formulário da Calculadora com atualização automática DIEESE */}
          <CalculatorForm
            itemName={itemName}
            setItemName={handleManualItemNameChange}
            baseYear={baseYear}
            setBaseYear={setBaseYear}
            basePrice={basePrice}
            setBasePrice={handleManualBasePriceChange}
            targetYear={targetYear}
            setTargetYear={setTargetYear}
            targetPrice={targetPrice}
            setTargetPrice={handleManualTargetPriceChange}
            onSelectPreset={handleSelectPreset}
            selectedPresetId={selectedPresetId}
            selectedPreset={selectedPreset}
            onApplyIpcaToTarget={handleApplyIpcaToTarget}
            onSwapYears={handleSwapYears}
            onSelectCustom={handleSelectCustom}
          />

          {/* Seção de Resultados com Marca d'Água quando em modo Personalizar */}
          <div className="relative space-y-6 sm:space-y-7">
            {/* Marca d'água sob os resultados em modo Personalizar */}
            {isCustom && (
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-around opacity-20 select-none py-8"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="text-center transform -rotate-12 whitespace-nowrap text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-[#0000FF]"
                  >
                    “Os valores foram preenchidos pelo usuário e podem não corresponder à realidade dos fatos. Valide as informações em bases de dados oficiais.”
                  </div>
                ))}
              </div>
            )}

            {/* Banner destacado para conformidade e transparência na busca personalizada */}
            {isCustom && (
              <div className="relative z-10 p-4 sm:p-5 bg-blue-50/95 rounded-2xl border-2 border-[#0000FF] shadow-md text-[#0000FF] text-center space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-[#0000FF] text-white rounded-md text-[10px] uppercase font-black tracking-wider mb-1">
                  Busca Personalizada pelo Usuário
                </span>
                <p className="text-xs sm:text-sm md:text-base font-bold leading-snug">
                  “Os valores foram preenchidos pelo usuário e podem não corresponder à realidade dos fatos. Valide as informações em bases de dados oficiais.”
                </p>
              </div>
            )}

            <div className="relative z-10 space-y-6 sm:space-y-7">
              {/* 1. Cards de Comparação Detalhada (Comparativo de Anos) */}
              <ComparisonCards
                baseMetrics={baseMetrics}
                targetMetrics={targetMetrics}
                itemName={itemName}
                isCustom={isCustom}
              />

              {/* 2. Termômetro de Poder de Compra (após o comparativo de anos, antes dos gráficos) */}
              <KpiBadge kpi={kpi} baseYear={baseYear} targetYear={targetYear} />

              {/* 3. Gráfico Interativo de Evolução Histórica (Oculto em modo Personalizar) */}
              {!isCustom && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 font-display">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-white/30" />
                      Gráfico de Tendências e Histórico da Série
                    </h3>
                  </div>
                  <EvolutionChart
                    seriesData={seriesData}
                    itemName={itemName}
                    baseYear={baseYear}
                    targetYear={targetYear}
                    isCustom={isCustom}
                  />
                </div>
              )}

              {/* 5. Tabela Histórica Completa (Oculta em modo Personalizar) */}
              {!isCustom && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 font-display">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-white/30" />
                      Série Temporal Completa desde o Plano Real (1994 – 2026)
                    </h3>
                  </div>
                  <HistoricalTable
                    basePrice={basePrice}
                    baseYear={baseYear}
                    itemName={itemName}
                    isCustom={isCustom}
                    selectedPresetId={selectedPresetId}
                  />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Rodapé Informativo e Metodológico */}
        <footer className="border-t border-[#0d5f38] bg-[#0a4628] py-8 text-xs text-emerald-100/80">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <p className="font-bold text-white text-sm font-display">
                Calculadora de Poder de Compra e Salário Mínimo do Brasil (1994 – 2026)
              </p>
              <p className="text-[11px] text-emerald-200/70 mt-1">
                Metodologia e Fontes Confiáveis: Séries históricas oficiais do IPCA (IBGE), FipeZAP (Fipe / Secovi-SP), Tabela FIPE / Anfavea, OCA / ANCINE (Sistema de Bilheteria), ANP, DIEESE e Ministério do Trabalho (CLT).
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 text-[11px] font-medium">
              <span className="px-3 py-1 bg-[#07331d] text-emerald-200 rounded-lg border border-emerald-700/40">
                Jornada CLT padrão: 220h/mês
              </span>
              <span className="px-3 py-1 bg-white/15 text-white rounded-lg border border-white/20">
                Desde 01/07/1994 (Plano Real)
              </span>
            </div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-8 mt-6 pt-5 border-t border-[#0d5f38]/60 flex items-center justify-center text-center">
            <p className="text-xs text-emerald-100/90 font-medium tracking-wide">
              © 2026 Eduarda Saraiva. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
