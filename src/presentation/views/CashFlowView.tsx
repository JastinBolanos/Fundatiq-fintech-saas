import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Filter,
  Download,
  Building2,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  Sparkles,
  Zap,
  Globe2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  CASH_FLOW_TREND_DATA,
  SUBSIDIARIES_DATA,
} from '../../infrastructure/mock/treasuryMockData';
import { SubsidiaryEntity } from '../../domain/entities/treasury.types';
import { useCashFlow } from '../hooks/useCashFlow';
import { useLanguage } from '../context/LanguageContext';

interface CashFlowViewProps {
  onNavigateToForecast?: () => void;
  onNavigateToTransactions?: () => void;
}

export const CashFlowView: React.FC<CashFlowViewProps> = ({
  onNavigateToForecast,
  onNavigateToTransactions,
}) => {
  const { t, language } = useLanguage();
  const { trendData } = useCashFlow();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30D' | '90D' | 'YTD' | '12M'>('30D');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);

  const totalInflow = 17880000;
  const totalOutflow = 9430000;
  const netOperatingCashFlow = totalInflow - totalOutflow;
  const cashConversionCycleDays = 28;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 800);
  };

  const filteredSubsidiaries =
    selectedSubsidiary === 'all'
      ? SUBSIDIARIES_DATA
      : SUBSIDIARIES_DATA.filter((s) => s.id === selectedSubsidiary);

  return (
    <div id="cash-flow-analysis-view" className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.cashFlow.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.cashFlow.realTimeFeed}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.cashFlow.headerSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {(['30D', '90D', 'YTD', '12M'] as const).map((tf) => (
              <button
                key={tf}
                id={`timeframe-btn-${tf.toLowerCase()}`}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            id="export-cashflow-report-btn"
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition-all cursor-pointer"
          >
            <Download size={14} className={isExporting ? 'animate-bounce text-blue-400' : ''} />
            <span>{isExporting ? (language === 'es' ? 'Generando Informe...' : 'Generating Report...') : (language === 'es' ? 'Exportar Excel / CSV' : 'Export Excel / CSV')}</span>
          </button>

          <button
            id="scenario-runway-btn"
            onClick={onNavigateToForecast}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
          >
            <Sparkles size={14} />
            <span>{t.cashFlow.openRunwaySim}</span>
          </button>
        </div>
      </div>

      {/* 1. Cash Flow Core Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inflows */}
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 shadow-xl shadow-black/40 transition-all">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
              {t.cashFlow.metric2Title}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="space-y-1 my-1">
            <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
              +${(totalInflow / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400">
              {t.cashFlow.metric2Sub}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1">
              <ArrowUpRight size={12} /> +14.2% {language === 'es' ? 'vs 30d prev' : 'vs Prior 30d'}
            </span>
            <span className="text-slate-400">99.9% {language === 'es' ? 'Liquidado' : 'Cleared'}</span>
          </div>
        </div>

        {/* Total Outflows */}
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-rose-500/40 shadow-xl shadow-black/40 transition-all">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
              {t.cashFlow.metric3Title}
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <TrendingDown size={16} />
            </div>
          </div>
          <div className="space-y-1 my-1">
            <div className="text-2xl font-black text-rose-400 font-mono tracking-tight">
              -${(totalOutflow / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400">
              {t.cashFlow.metric3Sub}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-rose-400 flex items-center gap-1">
              <ArrowDownRight size={12} /> -3.1% {language === 'es' ? 'Ajuste OpEx' : 'OpEx Trim'}
            </span>
            <span className="text-slate-400">{language === 'es' ? 'Programado' : 'Scheduled'}</span>
          </div>
        </div>

        {/* Net Cash Velocity */}
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-blue-500/40 shadow-xl shadow-black/40 transition-all">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
              {t.cashFlow.metric1Title}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Zap size={16} />
            </div>
          </div>
          <div className="space-y-1 my-1">
            <div className="text-2xl font-black text-blue-400 font-mono tracking-tight">
              +${(netOperatingCashFlow / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate-400">
              {t.cashFlow.metric1Sub}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1">
              <ArrowUpRight size={12} /> +$1.24M {language === 'es' ? 'Superávit' : 'Surplus'}
            </span>
            <span className="text-slate-400">100% {language === 'es' ? 'Retenido' : 'Retained'}</span>
          </div>
        </div>

        {/* Cash Conversion Cycle */}
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 shadow-xl shadow-black/40 transition-all">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
              {t.cashFlow.metric4Title}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Activity size={16} />
            </div>
          </div>
          <div className="space-y-1 my-1">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {cashConversionCycleDays} {language === 'es' ? 'Días' : 'Days'}
            </div>
            <div className="text-[11px] text-slate-400">
              DSO: 34d | DPO: 42d | DIO: 36d
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> {language === 'es' ? 'Líder del Sector SaaS' : 'Top Decile Benchmark'}
            </span>
            <span className="text-slate-400">SaaS High-Growth</span>
          </div>
        </div>
      </div>

      {/* 2. Visual Waterfall / Inflow vs Outflow Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{t.cashFlow.waterfallTitle}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {language === 'es' ? 'Agosto 2026' : 'August 2026'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {t.cashFlow.waterfallSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-emerald-500" />
                <span className="text-slate-300">{language === 'es' ? 'Ingreso' : 'Inflow'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-rose-500" />
                <span className="text-slate-300">{language === 'es' ? 'Egreso' : 'Outflow'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-blue-400" />
                <span className="text-slate-300">{language === 'es' ? 'Delta Neto' : 'Net Delta'}</span>
              </div>
            </div>
          </div>

          {/* Custom CSS Bar chart visualization */}
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-9 gap-2 h-48 items-end border-b border-slate-800/80 pb-2">
              {(trendData.length > 0 ? trendData : CASH_FLOW_TREND_DATA).map((item, idx) => {
                const maxVal = 4500000;
                const inflowHeightPercent = (item.inflow / maxVal) * 100;
                const outflowHeightPercent = (item.outflow / maxVal) * 100;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      +${(item.inflow / 1000000).toFixed(1)}M
                    </div>
                    <div className="w-full flex items-end justify-center gap-1 h-36">
                      {/* Inflow bar */}
                      <div
                        style={{ height: `${inflowHeightPercent}%` }}
                        className={`w-3.5 sm:w-5 rounded-t-sm transition-all duration-300 ${
                          item.forecast ? 'bg-emerald-500/50 border border-dashed border-emerald-400' : 'bg-emerald-500 shadow-sm shadow-emerald-950/50'
                        }`}
                        title={`Inflow: $${item.inflow.toLocaleString()}`}
                      />
                      {/* Outflow bar */}
                      <div
                        style={{ height: `${outflowHeightPercent}%` }}
                        className={`w-3.5 sm:w-5 rounded-t-sm transition-all duration-300 ${
                          item.forecast ? 'bg-rose-500/50 border border-dashed border-rose-400' : 'bg-rose-500 shadow-sm shadow-rose-950/50'
                        }`}
                        title={`Outflow: $${item.outflow.toLocaleString()}`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                      {item.date.split('-')[2]} {language === 'es' ? 'Ago' : 'Aug'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> {language === 'es' ? 'Histórico Conciliado (1 Ago - 19 Ago)' : 'Reconciled Historical (Aug 1 - Aug 19)'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 border border-dashed border-white" /> {language === 'es' ? 'Velocidad Simulada por IA (20 Ago - 31 Ago)' : 'AI Simulated Velocity (Aug 20 - Aug 31)'}
              </span>
            </div>
          </div>
        </div>

        {/* Currency & Rail Distribution */}
        <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">
              {t.cashFlow.multicurrencyTitle}
            </h3>
            <Globe2 size={16} className="text-blue-400" />
          </div>

          <div className="space-y-3.5">
            {[
              { currency: 'USD', share: '68.3%', amount: '$101,350,000.00', color: 'bg-blue-500' },
              { currency: 'EUR', share: '14.6%', amount: '€12,580,000.00', color: 'bg-indigo-500' },
              { currency: 'GBP', share: '9.8%', amount: '£13,200,000.00', color: 'bg-purple-500' },
              { currency: 'SGD', share: '5.6%', amount: 'S$10,800,000.00', color: 'bg-cyan-500' },
              { currency: 'CHF', share: '1.7%', amount: 'CHF 2,150,000.00', color: 'bg-emerald-500' },
            ].map((c) => (
              <div key={c.currency} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-200">{c.currency}</span>
                  <div className="space-x-2">
                    <span className="text-slate-400">{c.amount}</span>
                    <span className="font-bold text-white">{c.share}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: c.share }}
                    className={`h-full ${c.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              {language === 'es' ? 'Escudo de Cobertura Cambiaria Activo' : 'FX Hedging Shield Active'}
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'es' ? 'Los contratos forward continuos protegen el 94% de los ingresos en EUR/GBP frente a oscilaciones de tipo de cambio.' : 'Auto-balancing forward contracts lock 94% of EUR/GBP revenue against FX volatility.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Subsidiary Entity Contribution Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {t.cashFlow.subsidiaryTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.cashFlow.subsidiarySub}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">{language === 'es' ? 'Filtrar Entidad:' : 'Filter Entity:'}</span>
            <select
              value={selectedSubsidiary}
              onChange={(e) => setSelectedSubsidiary(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">{language === 'es' ? 'Las 6 Subsidiarias' : 'All 6 Subsidiaries'}</option>
              {SUBSIDIARIES_DATA.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/30">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/80 text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3 px-4">{t.cashFlow.colSubsidiary}</th>
                <th className="py-3 px-4">{t.cashFlow.colJurisdiction}</th>
                <th className="py-3 px-4">{t.cashFlow.colCurrency}</th>
                <th className="py-3 px-4">{language === 'es' ? 'Bancos Conectados' : 'Connected Banks'}</th>
                <th className="py-3 px-4 text-right">{language === 'es' ? 'Liquidez en Cuenta' : 'Holding Liquidity'}</th>
                <th className="py-3 px-4 text-right">{language === 'es' ? 'Consumo Mensual' : 'Monthly Burn'}</th>
                <th className="py-3 px-4 text-center">{t.cashFlow.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredSubsidiaries.map((sub: SubsidiaryEntity) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-800/30 transition-colors duration-150 group"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-200 group-hover:text-white">
                    <div className="flex items-center gap-2">
                      <Building2 size={15} className="text-blue-400 shrink-0" />
                      <div>
                        <div>{sub.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {language === 'es' ? 'Director de Tesorería:' : 'CFO Lead:'} {sub.cfoLead}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {sub.jurisdiction}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-slate-300">
                      {sub.primaryCurrency}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="text-blue-400 font-semibold">{sub.bankAccountCount}</span> {language === 'es' ? 'Cuentas' : 'Accounts'}
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-white">
                    ${sub.liquidityUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3.5 px-4 text-right font-semibold text-rose-400">
                    -${sub.monthlyBurnUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 size={11} /> {language === 'es' ? 'Conciliado' : 'Reconciled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
