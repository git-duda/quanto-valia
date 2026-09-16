import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  Bar,
  ComposedChart
} from 'recharts';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { PRESIDENT_AVATARS } from '../data/historicalData';
import { BarChart3, TrendingUp, Layers, HelpCircle } from 'lucide-react';

interface EvolutionChartProps {
  seriesData: Array<{
    year: number;
    salaryNominal: number;
    salaryRealToday: number;
    ipcaAnnual: number;
    estimatedPrice: number;
    unitsCanBuy: number;
    percentSalary: number;
    hoursNeeded: number;
    president: string;
    party: string;
  }>;
  itemName: string;
  baseYear: number;
  targetYear: number;
  isCustom?: boolean;
}

type ChartView = 'units' | 'salary' | 'inflation' | 'percentage';

export const EvolutionChart: React.FC<EvolutionChartProps> = ({
  seriesData,
  itemName,
  baseYear,
  targetYear,
  isCustom = false,
}) => {
  const [currentView, setCurrentView] = useState<ChartView>('units');

  // Custom Tooltip para Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-1.5">
            <span className="font-extrabold text-sm text-emerald-400">
              Ano de {label}
            </span>
            {!isCustom && (
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-semibold">
                {data.party}
              </span>
            )}
          </div>

          {!isCustom && (
            <div className="flex items-center gap-2 text-slate-200">
              {PRESIDENT_AVATARS[data.president] && (
                <img
                  src={PRESIDENT_AVATARS[data.president]}
                  alt={data.president}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-slate-600 shrink-0"
                />
              )}
              <div>
                <span className="text-slate-400">Presidente: </span>
                <strong className="text-white font-bold">{data.president}</strong>
              </div>
            </div>
          )}

          <div className="text-slate-200">
            <span className="text-slate-400">Salário Mínimo Nominal: </span>
            <strong className="text-white">{formatCurrency(data.salaryNominal)}</strong>
          </div>

          <div className="text-slate-200">
            <span className="text-slate-400">Salário Mínimo Real (valores de hoje): </span>
            <strong className="text-emerald-300">{formatCurrency(data.salaryRealToday)}</strong>
          </div>

          <div className="text-slate-200">
            <span className="text-slate-400">Inflação do Ano (IPCA): </span>
            <strong className={data.ipcaAnnual > 10 ? 'text-rose-400' : 'text-slate-200'}>
              {formatPercent(data.ipcaAnnual)}
            </strong>
          </div>

          <div className="pt-1.5 border-t border-slate-800 flex justify-between text-slate-300">
            <span>Preço est. de "{itemName}":</span>
            <strong className="text-white">{formatCurrency(data.estimatedPrice)}</strong>
          </div>

          <div className="flex justify-between text-slate-300">
            <span>Com 1 salário comprava:</span>
            <strong className="text-emerald-400 font-bold">
              {data.unitsCanBuy >= 10 
                ? Math.floor(data.unitsCanBuy).toLocaleString('pt-BR') 
                : data.unitsCanBuy >= 1 
                  ? data.unitsCanBuy.toFixed(2) 
                  : `${data.unitsCanBuy < 0.05 ? data.unitsCanBuy.toFixed(4) : data.unitsCanBuy.toFixed(3)} (${(1 / data.unitsCanBuy).toFixed(1)} sal.)`}{' '}
              unid.
            </strong>
          </div>

          <div className="flex justify-between text-slate-300">
            <span>Peso no salário:</span>
            <strong className="text-amber-300">
              {data.percentSalary >= 100 
                ? `${(data.percentSalary / 100).toFixed(1)} sal. (${formatPercent(data.percentSalary)})` 
                : formatPercent(data.percentSalary)}
            </strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Evolução Histórica Comparada (1994 – 2026)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            {isCustom
              ? "Acompanhe a trajetória histórica de preços e poder de compra (1994 – 2026)"
              : "Acompanhe o comportamento das variáveis ao longo dos últimos 33 anos e de cada mandato presidencial"}
          </p>
        </div>

        {/* Seletor de visualização do gráfico */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 overflow-x-auto border border-slate-200/80">
          <button
            id="chart-btn-units"
            onClick={() => setCurrentView('units')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'units'
                ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Poder de Compra (Unid.)
          </button>
          <button
            id="chart-btn-salary"
            onClick={() => setCurrentView('salary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'salary'
                ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Salário Nominal vs Real
          </button>
          <button
            id="chart-btn-inflation"
            onClick={() => setCurrentView('inflation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'inflation'
                ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inflação Anual (IPCA)
          </button>
          <button
            id="chart-btn-percentage"
            onClick={() => setCurrentView('percentage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'percentage'
                ? 'bg-white text-orange-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            % do Salário Mínimo
          </button>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO RECHARTS */}
      <div className="h-72 sm:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {currentView === 'units' ? (
            <AreaChart data={seriesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0b663b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0b663b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => {
                  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
                  if (v < 0.01) return v.toFixed(4);
                  if (v < 1) return v.toFixed(3);
                  return v;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="unitsCanBuy"
                name="Unidades por Salário"
                stroke="#0b663b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorUnits)"
              />
            </AreaChart>
          ) : currentView === 'salary' ? (
            <LineChart data={seriesData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `R$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
              <Line
                type="monotone"
                dataKey="salaryRealToday"
                name="Salário Real (Corrigido a valores de 2026)"
                stroke="#0b663b"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="salaryNominal"
                name="Salário Nominal da Época"
                stroke="#ff5a36"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          ) : currentView === 'inflation' ? (
            <ComposedChart data={seriesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="ipcaAnnual"
                name="IPCA Anual (%)"
                fill="#f5bf38"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="ipcaAnnual"
                stroke="#d97706"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          ) : (
            <AreaChart data={seriesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5a36" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ff5a36" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="percentSalary"
                name="% do Salário Mínimo"
                stroke="#ff5a36"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorPercent)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Linha do tempo de presidentes resumida abaixo do gráfico */}
      <div className="pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3">
        {!isCustom ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-700 text-xs font-display">Presidentes:</span>
            {[
              { name: 'Itamar', fullName: 'Itamar Franco', period: '1994' },
              { name: 'FHC', fullName: 'Fernando Henrique Cardoso', period: '1995-02' },
              { name: 'Lula', fullName: 'Luiz Inácio Lula da Silva', period: '2003-10' },
              { name: 'Dilma', fullName: 'Dilma Rousseff', period: '2011-16' },
              { name: 'Temer', fullName: 'Michel Temer', period: '2016-18' },
              { name: 'Bolsonaro', fullName: 'Jair Bolsonaro', period: '2019-22' },
              { name: 'Lula', fullName: 'Luiz Inácio Lula da Silva', period: '2023-26' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors">
                {PRESIDENT_AVATARS[item.fullName] && (
                  <img
                    src={PRESIDENT_AVATARS[item.fullName]}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover ring-1 ring-slate-300 shadow-2xs shrink-0"
                  />
                )}
                <span className="font-semibold text-slate-800 text-[11px]">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">({item.period})</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500">
            Série temporal 1994 – 2026 com projeção contínua de preços e salários.
          </div>
        )}
        <div className="text-emerald-700 font-medium text-[11px] shrink-0">
          Passe o cursor sobre os pontos para detalhes
        </div>
      </div>

      {isCustom && (
        <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-300/80 text-center text-xs font-semibold text-amber-900 shadow-2xs">
          “Os valores foram preenchidos pelo usuário e podem não corresponder à realidade dos fatos. Valide as informações em bases de dados oficiais.”
        </div>
      )}
    </div>
  );
};
