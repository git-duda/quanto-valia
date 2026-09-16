import React from 'react';
import { YearData } from '../types';
import { Landmark, User, Award, Calendar } from 'lucide-react';

interface PresidentCardProps {
  yearData: YearData;
  label: string;
}

export const PresidentCard: React.FC<PresidentCardProps> = ({ yearData, label }) => {
  const { president, year, contextSummary, ipcaAnnual } = yearData;

  const initials = president.name
    .split(' ')
    .filter((n) => !['de', 'da', 'do', 'dos'].includes(n.toLowerCase()))
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const isBase = label.toLowerCase().includes('base');

  return (
    <div className="bg-[#fdfbf7] rounded-[32px] p-6 sm:p-7 shadow-xl relative border-2 border-slate-200 flex flex-col justify-between min-h-[300px] transition-transform hover:-translate-y-1">
      {/* Faixa azul institucional no topo conforme design de referência */}
      <div className="absolute top-0 left-8 right-16 h-2 bg-blue-700 rounded-b-lg" />

      {/* Avatar circular flutuante do Presidente no canto superior direito */}
      <div className="absolute -top-5 right-5 sm:right-6">
        <div className="relative">
          {president.avatarUrl ? (
            <img
              src={president.avatarUrl}
              alt={president.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-xl bg-slate-200"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-black text-lg border-4 border-white shadow-xl">
              {initials}
            </div>
          )}
          <span className="absolute bottom-0 right-0 px-2 py-0.5 bg-blue-900 text-white text-[9px] font-black rounded-full border-2 border-white shadow-xs">
            {president.party}
          </span>
        </div>
      </div>

      <div className="pt-2">
        {/* Pílula do Período */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 text-xs font-black rounded-full shadow-xs ${
            isBase ? 'bg-[#ff5a36] text-white' : 'bg-[#0b663b] text-white'
          }`}>
            {label} • {year}
          </span>
        </div>

        {/* Nome do Presidente */}
        <div className="pr-16 mt-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
            Presidente da República
          </span>
          <h4 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
            {president.name}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Mandato: {president.term}</span>
          </div>
        </div>

        {/* Descrição histórica */}
        <p className="text-xs text-slate-700 mt-4 leading-relaxed bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {president.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">Inflação anual:</span>
          <strong className="text-slate-950 font-black px-2 py-0.5 bg-amber-100/70 rounded-md border border-amber-200">
            {ipcaAnnual.toFixed(2)}%
          </strong>
        </div>
        <span className="text-[11px] font-bold text-slate-500 truncate max-w-[170px]" title={contextSummary}>
          {contextSummary}
        </span>
      </div>
    </div>
  );
};
