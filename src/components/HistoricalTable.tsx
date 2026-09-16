import React, { useState } from 'react';
import { HISTORICAL_DATA, PRESIDENT_AVATARS, getPresetPriceForYear } from '../data/historicalData';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { Table, Search, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface HistoricalTableProps {
  basePrice: number;
  baseYear: number;
  itemName: string;
  isCustom?: boolean;
  selectedPresetId?: string;
}

export const HistoricalTable: React.FC<HistoricalTableProps> = ({
  basePrice,
  baseYear,
  itemName,
  isCustom = false,
  selectedPresetId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');

  const baseYearData = HISTORICAL_DATA.find((d) => d.year === baseYear) || HISTORICAL_DATA[0];

  const filteredData = HISTORICAL_DATA.filter((d) => {
    if (!filterText) return true;
    const term = filterText.toLowerCase();
    return (
      d.year.toString().includes(term) ||
      (!isCustom && (
        d.president.name.toLowerCase().includes(term) ||
        d.president.party.toLowerCase().includes(term)
      ))
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50/70 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Tabela Histórica Completa Ano a Ano (1994 – 2026)
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Consulte todos os 33 anos com salários nominais, IPCA anual{!isCustom && ', presidentes'} e poder de compra
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 px-3.5 py-1.5 rounded-lg transition-colors">
            {isOpen ? 'Ocultar Tabela' : 'Ver Todos os 33 Anos'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 max-w-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder={isCustom ? "Filtrar por ano..." : "Filtrar por ano ou presidente..."}
                className="w-full pl-10 pr-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-96 rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50/90 backdrop-blur-xs sticky top-0 text-slate-600 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5">Ano</th>
                  {!isCustom && <th className="py-2.5 px-3.5">Presidente</th>}
                  <th className="py-2.5 px-3.5 text-right">Salário Mínimo</th>
                  <th className="py-2.5 px-3.5 text-right">IPCA do Ano</th>
                  <th className="py-2.5 px-3.5 text-right">Preço Est. ({itemName})</th>
                  <th className="py-2.5 px-3.5 text-right">% do Salário</th>
                  <th className="py-2.5 px-3.5 text-right">Unidades com 1 Salário</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredData.map((d) => {
                  const estimatedPrice = (!isCustom && selectedPresetId)
                    ? getPresetPriceForYear(selectedPresetId, d.year)
                    : basePrice * (d.ipcaIndex / baseYearData.ipcaIndex);
                  const percentOfSalary = (estimatedPrice / d.salary) * 100;
                  const units = d.salary / estimatedPrice;

                  const isBase = d.year === baseYear;

                  return (
                    <tr
                      key={d.year}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isBase ? 'bg-emerald-50/60 font-semibold' : ''
                      }`}
                    >
                      <td className="py-2 px-3.5 font-bold text-slate-900">
                        {d.year}
                        {isBase && (
                          <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-emerald-600 text-white rounded font-bold">
                            BASE
                          </span>
                        )}
                      </td>
                      {!isCustom && (
                        <td className="py-2 px-3.5 text-slate-800">
                          <div className="flex items-center gap-2">
                            {PRESIDENT_AVATARS[d.president.name] ? (
                              <img
                                src={PRESIDENT_AVATARS[d.president.name]}
                                alt={d.president.name}
                                referrerPolicy="no-referrer"
                                className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200 shadow-2xs shrink-0"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shrink-0">
                                {d.president.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-medium text-slate-900">{d.president.name}</span>
                              <span className="text-[10px] font-normal px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                                {d.president.party}
                              </span>
                            </div>
                          </div>
                        </td>
                      )}
                      <td className="py-2 px-3.5 text-right font-medium text-slate-900 font-mono">
                        {formatCurrency(d.salary)}
                      </td>
                      <td className="py-2 px-3.5 text-right font-mono">
                        <span
                          className={`font-medium ${
                            d.ipcaAnnual > 10
                              ? 'text-rose-600'
                              : d.ipcaAnnual < 4
                              ? 'text-emerald-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {formatPercent(d.ipcaAnnual)}
                        </span>
                      </td>
                      <td className="py-2 px-3.5 text-right font-medium text-slate-900 font-mono">
                        {formatCurrency(estimatedPrice)}
                      </td>
                      <td className="py-2 px-3.5 text-right font-semibold text-orange-600 font-mono">
                        {percentOfSalary >= 100 
                          ? `${(percentOfSalary / 100).toFixed(1)} sal. (${formatPercent(percentOfSalary)})`
                          : formatPercent(percentOfSalary)}
                      </td>
                      <td className="py-2 px-3.5 text-right font-semibold text-slate-900 font-mono">
                        {units >= 10 
                          ? Math.floor(units).toLocaleString('pt-BR') 
                          : units >= 1 
                            ? units.toFixed(2) 
                            : `${units < 0.05 ? units.toFixed(4) : units.toFixed(3)} (${(1 / units).toFixed(1)} sal.)`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {isCustom && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-300/80 text-center text-xs font-semibold text-amber-900 shadow-2xs">
              “Os valores foram preenchidos pelo usuário e podem não corresponder à realidade dos fatos. Valide as informações em bases de dados oficiais.”
            </div>
          )}
        </div>
      )}
    </div>
  );
};
