import React, { useState, useRef, useEffect } from 'react';
import { PRESET_ITEMS } from '../data/presets';
import { HISTORICAL_DATA } from '../data/historicalData';
import { DIEESE_DATABASE, findDieeseMatches, DieeseItem } from '../data/dieeseDatabase';
import { PresetItem } from '../types';
import { 
  ArrowRightLeft, 
  Sparkles, 
  Calculator, 
  RefreshCw,
  CupSoda,
  Wheat,
  Fuel,
  UtensilsCrossed,
  Flame,
  ShoppingBasket,
  Car,
  Package,
  CircleDot,
  CheckCircle2,
  Database,
  Building2,
  Film,
  Lock,
  Unlock,
  SlidersHorizontal,
  AlertTriangle,
  Info,
  Search
} from 'lucide-react';

interface CalculatorFormProps {
  itemName: string;
  setItemName: (name: string) => void;
  baseYear: number;
  setBaseYear: (year: number) => void;
  basePrice: number;
  setBasePrice: (price: number) => void;
  targetYear: number;
  setTargetYear: (year: number) => void;
  targetPrice: number;
  setTargetPrice: (price: number) => void;
  onSelectPreset: (preset: PresetItem) => void;
  selectedPresetId: string;
  onApplyIpcaToTarget: () => void;
  onSwapYears: () => void;
  selectedPreset?: PresetItem | null;
  onSelectCustom?: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  itemName,
  setItemName,
  baseYear,
  setBaseYear,
  basePrice,
  setBasePrice,
  targetYear,
  setTargetYear,
  targetPrice,
  setTargetPrice,
  onSelectPreset,
  selectedPresetId,
  onApplyIpcaToTarget,
  onSwapYears,
  selectedPreset,
  onSelectCustom,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const suggestionContainerRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionContainerRef.current &&
        !suggestionContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Busca de correspondências na base oficial (PRESET_ITEMS e base expandida do DIEESE)
  const normalizedQuery = itemName.trim().toLowerCase();
  
  // 1. Matches nos presets gerais da barra superior
  const matchingPresets = (selectedPresetId === 'custom' && normalizedQuery.length >= 2)
    ? PRESET_ITEMS.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(normalizedQuery);
        const descMatch = item.description.toLowerCase().includes(normalizedQuery);
        const catMatch = item.category.toLowerCase().includes(normalizedQuery);
        const sourceMatch = (item.source || '').toLowerCase().includes(normalizedQuery);
        
        // Termos sinônimos comuns
        const synonyms: Record<string, string[]> = {
          'cesta-basica': ['cesta', 'alimento', 'dieese', 'comida', 'mercado', 'rancho'],
          'pao-frances': ['pao', 'pão', 'frances', 'francês', 'padaria', 'dieese', 'trigo'],
          'gasolina': ['gasolina', 'combustivel', 'combustível', 'posto', 'anp', 'litro', 'carro'],
          'botijao-gas': ['gas', 'gás', 'botijao', 'botijão', 'glp', 'cozinha', 'anp'],
          'imovel-padrao': ['imovel', 'imóvel', 'apartamento', 'casa', 'fipezap', 'aluguel', 'm2', 'secovi'],
          'carro-popular': ['carro', 'automovel', 'automóvel', 'popular', 'fipe', 'veiculo', 'veículo', 'gol', 'uno', 'mobi', 'kwid'],
          'cinema-ingresso': ['cinema', 'filme', 'ingresso', 'ancine', 'cultura', 'lazer']
        };

        const syns = synonyms[item.id] || [];
        const synMatch = syns.some((s) => normalizedQuery.includes(s) || s.includes(normalizedQuery));

        return nameMatch || descMatch || catMatch || sourceMatch || synMatch;
      })
    : [];

  // 2. Matches específicos na série histórica detalhada do DIEESE (feijão, açúcar, óleo, arroz, café, carne, leite, etc.)
  const matchingDieeseItems = (selectedPresetId === 'custom' && normalizedQuery.length >= 2)
    ? findDieeseMatches(normalizedQuery)
    : [];

  const handleSelectOfficialPresetFromSearch = (preset: PresetItem) => {
    setIsInputFocused(false);
    onSelectPreset(preset);
  };

  const handleSelectDieeseItemFromSearch = (item: DieeseItem) => {
    setIsInputFocused(false);
    const convertedPreset: PresetItem = {
      id: item.id,
      name: item.name,
      icon: 'ShoppingBasket',
      category: item.category,
      unit: item.unit,
      defaultPrice1994: item.prices[1994] || 1.0,
      defaultPriceCurrent: item.prices[2026] || 10.0,
      priceKey: 'cestaBasica',
      source: item.source,
      sourceBadge: item.sourceBadge,
      description: item.description,
    };
    onSelectPreset(convertedPreset);
  };

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'CupSoda':
        return <CupSoda className="w-3.5 h-3.5" />;
      case 'Wheat':
        return <Wheat className="w-3.5 h-3.5" />;
      case 'Fuel':
        return <Fuel className="w-3.5 h-3.5" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'Flame':
        return <Flame className="w-3.5 h-3.5" />;
      case 'ShoppingBasket':
        return <ShoppingBasket className="w-3.5 h-3.5" />;
      case 'Car':
        return <Car className="w-3.5 h-3.5" />;
      case 'Building2':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'Film':
        return <Film className="w-3.5 h-3.5" />;
      case 'Package':
        return <Package className="w-3.5 h-3.5" />;
      default:
        return <CircleDot className="w-3.5 h-3.5" />;
    }
  };

  const handleTriggerCustom = () => {
    if (onSelectCustom) {
      onSelectCustom();
    } else {
      onSelectPreset({
        id: 'custom',
        name: itemName || 'Item Personalizado',
        icon: 'SlidersHorizontal',
        category: 'Personalizado',
        unit: 'unidade',
        defaultPrice1994: basePrice,
        defaultPriceCurrent: targetPrice,
        priceKey: 'cestaBasica',
        source: 'Valores informados pelo usuário',
        sourceBadge: 'Manual',
        description: 'Item customizado pelo usuário'
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-md space-y-6">
      {/* Seção Superior: Séries Oficiais + Personalização de Busca Sempre Visível */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 font-display">
              Itens Oficiais Pré-Configurados
            </span>
          </div>

          {/* BOTÃO DE PERSONALIZAR BUSCA: SEMPRE VISÍVEL FORA DO CARROSSEL */}
          <button
            key="custom-search-permanent"
            id="btn-preset-custom-permanent"
            type="button"
            onClick={handleTriggerCustom}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shrink-0 ${
              selectedPresetId === 'custom'
                ? 'bg-slate-900 text-amber-300 ring-2 ring-slate-900 border border-slate-950 shadow-md'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-400 hover:border-amber-500'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Personalizar busca (Digitar outro item)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase ${
              selectedPresetId === 'custom' ? 'bg-amber-400 text-slate-950' : 'bg-amber-300 text-amber-950'
            }`}>
              {selectedPresetId === 'custom' ? 'Ativo' : 'Livre'}
            </span>
          </button>
        </div>

        {/* Carrossel de Itens Oficiais com Tooltips para as Fontes */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {PRESET_ITEMS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            const tooltipSource = preset.sourceBadge || preset.source || 'DIEESE';

            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => onSelectPreset(preset)}
                title={`Fonte oficial: ${preset.source || tooltipSource}`}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600/20 border border-emerald-700'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {getPresetIcon(preset.icon)}
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Notificação informativa */}
        {selectedPreset && selectedPresetId !== 'custom' ? (
          <div className="mt-2 py-2.5 px-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 flex-wrap">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Item selecionado: <strong className="font-semibold text-slate-900">{selectedPreset.name}</strong>
              </span>
              <span
                className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 px-2 py-0.5 rounded-md text-[11px] font-medium cursor-help"
                title={`Fonte oficial: ${selectedPreset.source}`}
              >
                <Info className="w-3 h-3 text-emerald-700" />
                <span>Fonte: {selectedPreset.sourceBadge || 'DIEESE'}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Valores oficiais travados.</span>
            </div>
          </div>
        ) : (
          <div className="mt-2 py-2.5 px-3.5 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Unlock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong className="font-bold">Modo "Personalizar busca" ativado:</strong> Preencha o nome do produto e os valores livremente nos campos destacados abaixo.
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
              Edição Livre
            </span>
          </div>
        )}
      </div>

      {/* PARTE PRINCIPAL DO SITE COM FUNDO #EEDD82: Nome do Produto, Ano Base, Preço e Comparar com o ano */}
      <div className="bg-[#EEDD82] rounded-2xl p-5 sm:p-6 lg:p-7 border-2 border-[#d6c466] shadow-md">
        {/* Grid com os 4 campos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Nome do Item com Autocomplete e Detecção DIEESE */}
          <div className="lg:col-span-4" ref={suggestionContainerRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="item-name-input"
                className="block text-xs font-black uppercase tracking-wider text-slate-950 font-display"
              >
                Nome do Produto / Serviço
              </label>
              {selectedPresetId === 'custom' ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-900 text-amber-300 rounded-md flex items-center gap-1">
                  <Unlock className="w-2.5 h-2.5" /> Editável
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#0c5934] text-white rounded-md flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-300" /> Oficial Travado
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="item-name-input"
                type="text"
                value={itemName}
                onChange={(e) => selectedPresetId === 'custom' && setItemName(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                readOnly={selectedPresetId !== 'custom'}
                disabled={selectedPresetId !== 'custom'}
                placeholder="Ex: Cesta Básica, Pão Francês, Gasolina..."
                className={`w-full px-3.5 py-3 rounded-xl border-2 text-sm transition-all font-semibold ${
                  selectedPresetId === 'custom'
                    ? 'border-slate-900 bg-white text-slate-900 shadow-sm focus:outline-hidden focus:ring-3 focus:ring-slate-950/20 focus:border-slate-950'
                    : 'border-slate-400/50 bg-white/90 text-slate-800 cursor-not-allowed select-none pr-9'
                }`}
                title={selectedPresetId !== 'custom' ? "Série oficial com valores travados." : undefined}
              />
              {selectedPresetId !== 'custom' && (
                <span className="absolute right-3 top-3.5 text-[#0c5934]" title="Item oficial travado">
                  <Lock className="w-4 h-4" />
                </span>
              )}

              {/* SUGESTÕES DE AUTOCOMPLETE PARA ITENS OFICIAIS (DIEESE, IBGE, ANP, FIPE) */}
              {selectedPresetId === 'custom' && isInputFocused && (matchingPresets.length > 0 || matchingDieeseItems.length > 0) && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border-2 border-slate-900 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 max-w-lg">
                  <div className="bg-[#0c5934] text-white px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-display">
                      <Database className="w-3.5 h-3.5 text-amber-300" />
                      <span>Disponível na Série Histórica Oficial</span>
                    </div>
                    <span className="text-[10px] bg-[#083c23] text-emerald-100 px-2 py-0.5 rounded-md font-bold">
                      Clique para Travar & Carregar
                    </span>
                  </div>

                  <div className="p-1 max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {/* Itens detalhados do DIEESE */}
                    {matchingDieeseItems.map((item) => (
                      <button
                        key={`dieese-${item.id}`}
                        type="button"
                        onClick={() => handleSelectDieeseItemFromSearch(item)}
                        className="w-full text-left p-2.5 hover:bg-emerald-50/80 transition-colors flex items-center justify-between gap-3 group rounded-xl"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                            <ShoppingBasket className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 truncate">
                              <span>{item.name}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate" title={`Fonte oficial: ${item.source}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-1 rounded-lg border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Lock className="w-3 h-3" />
                          <span>Carregar Série</span>
                        </div>
                      </button>
                    ))}

                    {/* Itens dos Presets Gerais */}
                    {matchingPresets.map((preset) => (
                      <button
                        key={`preset-${preset.id}`}
                        type="button"
                        onClick={() => handleSelectOfficialPresetFromSearch(preset)}
                        title={`Fonte oficial: ${preset.source || preset.sourceBadge}`}
                        className="w-full text-left p-2.5 hover:bg-emerald-50/80 transition-colors flex items-center justify-between gap-3 group rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                            {getPresetIcon(preset.icon)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-950 truncate">
                              <span>{preset.name}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate" title={`Fonte oficial: ${preset.source}`}>
                              {preset.description || preset.category}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-1 rounded-lg border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Lock className="w-3 h-3" />
                          <span>Carregar Série</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedPresetId !== 'custom' ? (
              <p className="text-[11px] text-slate-950 font-medium mt-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0c5934] shrink-0" />
                <span>Série oficial com valores históricos travados.</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-950 font-medium mt-1.5">
                Dica: Digite <strong className="font-bold">"Feijão"</strong>, <strong className="font-bold">"Açúcar"</strong>, <strong className="font-bold">"Óleo"</strong>, <strong className="font-bold">"Leite"</strong> ou <strong className="font-bold">"Arroz"</strong> para buscar no DIEESE.
              </p>
            )}
          </div>

          {/* Ano Base e Valor na Época */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="base-year-select"
                className="text-xs font-black uppercase tracking-wider text-slate-950 font-display"
              >
                Ano Base & Preço
              </label>
              {selectedPresetId === 'custom' ? (
                <span className="text-[10px] font-bold text-slate-900 bg-white/70 px-2 py-0.5 rounded-md">
                  Valor Manual
                </span>
              ) : (
                <span className="text-[10px] font-bold text-[#0c5934] bg-white/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Oficial {baseYear}
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              <select
                id="base-year-select"
                value={baseYear}
                onChange={(e) => setBaseYear(Number(e.target.value))}
                className="col-span-2 px-3 py-3 rounded-xl border-2 border-slate-700/30 text-slate-950 font-bold bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-slate-950/20 focus:border-slate-950 text-sm shadow-xs transition-all"
              >
                {HISTORICAL_DATA.map((d) => (
                  <option key={`base-${d.year}`} value={d.year}>
                    {d.year}
                  </option>
                ))}
              </select>

              <div className="col-span-3 relative">
                <span className="absolute left-3 top-3 text-slate-500 font-bold text-xs font-mono">
                  R$
                </span>
                <input
                  id="base-price-input"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={basePrice}
                  onChange={(e) => selectedPresetId === 'custom' && setBasePrice(Math.max(0, Number(e.target.value)))}
                  readOnly={selectedPresetId !== 'custom'}
                  disabled={selectedPresetId !== 'custom'}
                  className={`w-full pl-9 py-3 rounded-xl border-2 font-black font-mono text-sm transition-all shadow-xs ${
                    selectedPresetId === 'custom'
                      ? 'pr-3 border-slate-900 bg-white text-slate-950 focus:outline-hidden focus:ring-3 focus:ring-slate-950/20 focus:border-slate-950'
                      : 'pr-8 border-slate-400/50 bg-white/90 text-slate-800 cursor-not-allowed select-none'
                  }`}
                  title={selectedPresetId !== 'custom' ? "Valor oficial travado. Para alterar, escolha 'Personalizar busca'." : undefined}
                />
                {selectedPresetId !== 'custom' && (
                  <span className="absolute right-2.5 top-3.5 text-slate-500" title="Valor oficial travado">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Botão de Inverter Anos */}
          <div className="lg:col-span-1 flex justify-center pb-0.5">
            <button
              id="btn-swap-years"
              onClick={onSwapYears}
              title="Inverter anos da comparação"
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold transition-all active:scale-95 border-2 border-slate-950 cursor-pointer shadow-md flex items-center justify-center"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Ano de Destino e Valor */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="target-year-select"
                className="text-xs font-black uppercase tracking-wider text-slate-950 font-display"
              >
                Comparar com o Ano
              </label>
              {selectedPresetId === 'custom' ? (
                <button
                  id="btn-auto-ipca"
                  onClick={onApplyIpcaToTarget}
                  type="button"
                  className="text-[11px] font-black text-slate-950 hover:bg-white flex items-center gap-1 cursor-pointer bg-white/80 px-2.5 py-0.5 rounded-md border border-slate-950 shadow-xs transition-colors"
                  title="Ajusta o preço de destino usando estritamente a inflação acumulada (IPCA)"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Corrigir só pelo IPCA</span>
                </button>
              ) : (
                <span className="text-[10px] font-bold text-[#0c5934] bg-white/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Oficial {targetYear}
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              <select
                id="target-year-select"
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="col-span-2 px-3 py-3 rounded-xl border-2 border-slate-700/30 text-slate-950 font-bold bg-white focus:bg-white focus:outline-hidden focus:ring-3 focus:ring-slate-950/20 focus:border-slate-950 text-sm shadow-xs transition-all"
              >
                {HISTORICAL_DATA.map((d) => (
                  <option key={`target-${d.year}`} value={d.year}>
                    {d.year} {d.year === 2026 ? '(Hoje)' : ''}
                  </option>
                ))}
              </select>

              <div className="col-span-3 relative">
                <span className="absolute left-3 top-3 text-slate-500 font-bold text-xs font-mono">
                  R$
                </span>
                <input
                  id="target-price-input"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={targetPrice}
                  onChange={(e) => selectedPresetId === 'custom' && setTargetPrice(Math.max(0, Number(e.target.value)))}
                  readOnly={selectedPresetId !== 'custom'}
                  disabled={selectedPresetId !== 'custom'}
                  className={`w-full pl-9 py-3 rounded-xl border-2 font-black font-mono text-sm transition-all shadow-xs ${
                    selectedPresetId === 'custom'
                      ? 'pr-3 border-slate-900 bg-white text-slate-950 focus:outline-hidden focus:ring-3 focus:ring-slate-950/20 focus:border-slate-950'
                      : 'pr-8 border-slate-400/50 bg-white/90 text-slate-800 cursor-not-allowed select-none'
                  }`}
                  title={selectedPresetId !== 'custom' ? "Valor oficial travado. Para alterar, escolha 'Personalizar busca'." : undefined}
                />
                {selectedPresetId !== 'custom' && (
                  <span className="absolute right-2.5 top-3.5 text-slate-500" title="Valor oficial travado">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

