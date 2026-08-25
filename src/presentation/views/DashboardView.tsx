import React, { useState } from 'react';
import {
  Wallet,
  Flame,
  Hourglass,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Building2,
  Search,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TransactionRecord } from '../../domain/entities/treasury.types';
import { PredictiveRunwayChart } from '../components/sections/PredictiveRunwayChart';
import { useLanguage } from '../context/LanguageContext';
import { useCashFlow } from '../hooks/useCashFlow';
import { useTreasury } from '../hooks/useTreasury';

interface DashboardViewProps {
  onNavigateToSimulations?: () => void;
  onNavigateToLedger?: () => void;
  onInitiateTransfer?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToSimulations,
  onNavigateToLedger,
  onInitiateTransfer,
}) => {
  const { t, language } = useLanguage();
  const { forecastChartData, kpiMetrics, refreshCashFlow } = useCashFlow();
  const { transactions, refreshData: refreshTreasury } = useTreasury();

  const [activeTab, setActiveTab] = useState<'live' | 'skeleton'>('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshCashFlow(), refreshTreasury()]);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.counterparty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.subsidiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      id="executive-treasury-dashboard"
      className="min-h-screen bg-[#070b14] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 select-none"
    >
      {/* Top Bar / Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.dashboard.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.dashboard.liveModeBadge}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.dashboard.headerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dashboard-refresh-btn"
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-200 cursor-pointer"
            title={language === 'es' ? 'Actualizar Feeds de Tesorería' : 'Refresh Treasury Feeds'}
          >
            <RefreshCw
              size={16}
              className={`${isRefreshing ? 'animate-spin text-blue-400' : ''}`}
            />
          </button>

          <button
            id="export-treasury-report-btn"
            onClick={onNavigateToSimulations}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono font-medium text-slate-300 transition-all duration-200 cursor-pointer"
          >
            <Sparkles size={14} className="text-blue-400" />
            <span>{language === 'es' ? 'Lab de Escenarios IA' : 'AI Scenario Lab'}</span>
          </button>

          <button
            id="dashboard-primary-transfer-btn"
            onClick={onInitiateTransfer}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 transition-all duration-200 cursor-pointer"
          >
            <Zap size={14} />
            <span>{language === 'es' ? 'Despachar Liquidez' : 'Dispatch Liquidity'}</span>
          </button>
        </div>
      </div>

      {/* 1. TOP SECTION: 4 Premium KPI Stat Cards */}
      <section
        id="dashboard-kpi-grid"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 transition-all duration-500 ease-out"
      >
        {/* KPI 1: Liquidity */}
        <div
          id="kpi-total-liquidity"
          className="group relative p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-blue-500/50 shadow-xl shadow-black/40 hover:shadow-blue-950/20 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-tight">
              {t.dashboard.kpi1Title}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform duration-200">
              <Wallet size={16} />
            </div>
          </div>

          <div className="space-y-1.5 my-2">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-400 font-mono tracking-tight group-hover:text-blue-300 transition-colors">
              $148,420,000.00
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {t.dashboard.kpi1Sub}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
            <div className="inline-flex items-center gap-1 font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 text-[11px]">
              <ArrowUpRight size={12} />
              <span>+8.4%</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {language === 'es' ? 'vs. mes anterior' : 'vs. last month'}
            </span>
          </div>
        </div>

        {/* KPI 2: Burn Rate */}
        <div
          id="kpi-monthly-burn"
          className="group relative p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-rose-500/40 shadow-xl shadow-black/40 hover:shadow-rose-950/20 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-tight">
              {t.dashboard.kpi2Title}
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform duration-200">
              <Flame size={16} />
            </div>
          </div>

          <div className="space-y-1.5 my-2">
            <div className="text-2xl lg:text-3xl font-extrabold text-rose-400 font-mono tracking-tight group-hover:text-rose-300 transition-colors">
              $3,180,000.00
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {t.dashboard.kpi2Sub}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
            <div className="inline-flex items-center gap-1 font-mono font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/25 text-[11px]">
              <ArrowDownRight size={12} />
              <span>-3.2%</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {language === 'es' ? 'Consumo optimizado' : 'Optimized burn'}
            </span>
          </div>
        </div>

        {/* KPI 3: Runway */}
        <div
          id="kpi-cash-runway"
          className="group relative p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 shadow-xl shadow-black/40 hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-tight">
              {t.dashboard.kpi3Title}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform duration-200">
              <Hourglass size={16} />
            </div>
          </div>

          <div className="space-y-1.5 my-2">
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight group-hover:text-emerald-300 transition-colors">
              {language === 'es' ? '24.8 Meses' : '24.8 Months'}
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {t.dashboard.kpi3Sub}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
            <div className="inline-flex items-center gap-1 font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 text-[11px]">
              <ArrowUpRight size={12} />
              <span>+2.1 Mo</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {language === 'es' ? 'Pista en expansión' : 'Expanding horizon'}
            </span>
          </div>
        </div>

        {/* KPI 4: Yield APY */}
        <div
          id="kpi-treasury-yield"
          className="group relative p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 shadow-xl shadow-black/40 hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-tight">
              {t.dashboard.kpi4Title}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform duration-200">
              <Clock size={16} />
            </div>
          </div>

          <div className="space-y-1.5 my-2">
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
              5.28% APY
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {t.dashboard.kpi4Sub}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
            <div className="inline-flex items-center gap-1 font-mono font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/25 text-[11px]">
              <Sparkles size={11} />
              <span>+18 bps</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {language === 'es' ? 'Barrido MMF activo' : 'MMF sweep active'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE SECTION: The Chart Area / Predictive Runway Chart */}
      <section
        id="dashboard-predictive-chart-section"
        className="transition-all duration-700 ease-out"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
              {t.charts.interactiveForecastTitle}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>

          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3 py-1 rounded transition-all cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'es' ? 'Motor Interactivo' : 'Interactive Engine'}
            </button>
            <button
              onClick={() => setActiveTab('skeleton')}
              className={`px-3 py-1 rounded transition-all cursor-pointer ${
                activeTab === 'skeleton'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'es' ? 'Vista de Carga' : 'Stream Stub'}
            </button>
          </div>
        </div>

        {activeTab === 'live' ? (
          <PredictiveRunwayChart
            data={forecastChartData}
            currencySymbol="$"
            initialTimeframe="6M"
          />
        ) : (
          /* Sleek Loading Skeleton / Stub State */
          <div
            id="chart-skeleton-placeholder"
            className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 shadow-2xl shadow-black/50 space-y-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-5 w-64 rounded bg-slate-800/80 animate-pulse" />
                <div className="h-3.5 w-96 rounded bg-slate-800/50 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 rounded-lg bg-slate-800/80 animate-pulse" />
                <div className="h-8 w-32 rounded-lg bg-slate-800/80 animate-pulse" />
              </div>
            </div>

            <div className="h-[280px] w-full rounded-xl border border-dashed border-slate-800/80 bg-slate-950/40 flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 animate-bounce">
                <Sparkles size={24} />
              </div>
              <div className="text-center space-y-1 font-mono">
                <p className="text-sm font-semibold text-slate-300">
                  {language === 'es' ? 'Sintetizando Vectores de Velocidad de Caja...' : 'Synthesizing High-Frequency Cash Velocity Vectors...'}
                </p>
                <p className="text-xs text-slate-400">
                  {language === 'es' ? 'Conciliando flujos SWIFT, FedNow y SEPA en 12 fondos de liquidez.' : 'Reconciling live SWIFT, FedNow, and SEPA ledger streams across 12 liquidity pools.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="h-4 rounded bg-slate-800/60 animate-pulse" />
              <div className="h-4 rounded bg-slate-800/60 animate-pulse" />
              <div className="h-4 rounded bg-slate-800/60 animate-pulse" />
            </div>
          </div>
        )}
      </section>

      {/* 3. BOTTOM SECTION: Transaction Ledger Data Table */}
      <section
        id="dashboard-ledger-section"
        className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl shadow-black/50 space-y-5 transition-all duration-700 ease-out"
      >
        {/* Table Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                {t.dashboard.recentTransTitle}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {filteredTransactions.length} {language === 'es' ? 'Registros' : 'Cleared Events'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.dashboard.recentTransSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="transaction-ledger-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'es' ? 'Buscar contraparte, ref, filial...' : 'Search counterparty, ref, subsidiary...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-mono text-slate-200 placeholder-slate-400 outline-hidden transition-colors"
              />
            </div>

            {/* Status Filter Chips */}
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono">
              {[
                { key: 'All', label: language === 'es' ? 'Todos' : 'All' },
                { key: 'Settled', label: language === 'es' ? 'Liquidado' : 'Settled' },
                { key: 'Pending', label: language === 'es' ? 'Pendiente' : 'Pending' },
                { key: 'Processing', label: language === 'es' ? 'En Proceso' : 'Processing' },
              ].map((s) => (
                <button
                  key={s.key}
                  id={`filter-status-${s.key.toLowerCase()}`}
                  onClick={() => setStatusFilter(s.key)}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                    statusFilter === s.key
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <button
              id="view-full-ledger-btn"
              onClick={onNavigateToLedger}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-all cursor-pointer"
            >
              <span>{t.dashboard.viewFullLedger}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/30">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/80 text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3 px-4">{t.transactions.tableColDescription}</th>
                <th className="py-3 px-4">{language === 'es' ? 'Subsidiaria' : 'Subsidiary'}</th>
                <th className="py-3 px-4">{language === 'es' ? 'Categoría' : 'Category'}</th>
                <th className="py-3 px-4">{t.transactions.tableColRail}</th>
                <th className="py-3 px-4 text-right">{t.transactions.tableColAmount}</th>
                <th className="py-3 px-4 text-center">{t.transactions.tableColStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    {language === 'es' ? 'No hay transacciones que coincidan con la búsqueda.' : 'No transactions match your search filter criteria.'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx: TransactionRecord) => {
                  const isInflow = tx.type === 'inflow';

                  return (
                    <tr
                      key={tx.id}
                      id={tx.id}
                      className="hover:bg-slate-800/40 transition-colors duration-150 group cursor-default"
                    >
                      {/* Counterparty & Reference */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg border ${
                              isInflow
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                            }`}
                          >
                            {isInflow ? (
                              <TrendingUp size={14} />
                            ) : (
                              <TrendingDown size={14} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                              {tx.counterparty.name}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                              <span>{tx.referenceId}</span>
                              <span>•</span>
                              <span>{tx.counterparty.accountMask}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subsidiary */}
                      <td className="py-3 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={12} className="text-slate-400" />
                          <span>{tx.subsidiary}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
                          {tx.category}
                        </span>
                      </td>

                      {/* Clearing Rail */}
                      <td className="py-3 px-4">
                        <span className="text-slate-300 font-medium">
                          {tx.clearingRail}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-bold text-sm ${
                            isInflow ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {isInflow ? '+' : '-'}
                          ${tx.amount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-4 text-center">
                        {tx.status === 'Settled' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                            <CheckCircle2 size={11} /> {language === 'es' ? 'Liquidado' : 'Settled'}
                          </span>
                        )}
                        {tx.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                            <Clock size={11} /> {language === 'es' ? 'Pendiente' : 'Pending'}
                          </span>
                        )}
                        {tx.status === 'Processing' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/25">
                            <RefreshCw size={11} className="animate-spin" /> {language === 'es' ? 'En Proceso' : 'Processing'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Ledger Bottom Summary */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 border-t border-slate-800/60">
          <div className="flex items-center gap-4">
            <span>
              {language === 'es' ? 'Mostrando' : 'Showing'} <strong className="text-slate-200">{filteredTransactions.length}</strong> {language === 'es' ? 'de' : 'of'}{' '}
              {transactions.length} {language === 'es' ? 'registros' : 'entries'}
            </span>
            <span>•</span>
            <span className="text-emerald-400">{language === 'es' ? 'Sin discrepancias de conciliación' : 'Zero Reconciliation Discrepancies'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-400" />
            <span>{language === 'es' ? 'Libro Mayor Multifirma Criptográficamente Verificado' : 'Cryptographically Verified Multi-Sig Ledger'}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
