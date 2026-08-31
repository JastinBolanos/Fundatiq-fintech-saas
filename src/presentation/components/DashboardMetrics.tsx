import React from 'react';
import {
  Wallet,
  Flame,
  Hourglass,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';

export interface KPIMetricItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaDirection: 'positive' | 'negative' | 'neutral';
  deltaLabel: string;
  category: 'liquidity' | 'burn' | 'runway' | 'settlement';
  subText: string;
}

interface DashboardMetricsProps {
  metrics?: KPIMetricItem[];
  baseCurrency?: string;
}

const DEFAULT_METRICS: KPIMetricItem[] = [
  {
    id: 'kpi-liquidity',
    label: 'Total Consolidated Liquidity',
    value: '$148,420,000.00',
    delta: '+8.4%',
    deltaDirection: 'positive',
    deltaLabel: 'vs prior 30d',
    category: 'liquidity',
    subText: '12 Connected Corporate Accounts',
  },
  {
    id: 'kpi-burn',
    label: 'Monthly Net Burn Rate',
    value: '$3,180,450.00',
    delta: '-4.2%',
    deltaDirection: 'negative',
    deltaLabel: 'MoM expenditure',
    category: 'burn',
    subText: 'OpEx + CapEx & Global Payroll',
  },
  {
    id: 'kpi-runway',
    label: '30-Day Simulated Runway',
    value: '46.6 Months',
    delta: '+2.8 Mo',
    deltaDirection: 'positive',
    deltaLabel: 'confidence: 99.4%',
    category: 'runway',
    subText: 'Monte Carlo Stress Adjusted',
  },
  {
    id: 'kpi-settlement',
    label: 'Pending Settlement Pool',
    value: '$12,640,890.00',
    delta: '14 Batches',
    deltaDirection: 'neutral',
    deltaLabel: 'clearing < 4 hrs',
    category: 'settlement',
    subText: 'FedNow, SEPA & SWIFT Wire Inbound',
  },
];

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  metrics = DEFAULT_METRICS,
}) => {
  return (
    <div
      id="dashboard-metrics-grid"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 select-none"
    >
      {metrics.map((metric) => {
        // Render card specifics according to clean enterprise rules
        if (metric.category === 'liquidity') {
          return (
            <div
              key={metric.id}
              id={metric.id}
              className="relative p-5 rounded-xl bg-[#0e1628] border border-[#1d2b48] shadow-lg shadow-black/40 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-semibold text-slate-400 tracking-tight">
                  {metric.label}
                </span>
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Wallet size={16} />
                </div>
              </div>

              <div className="space-y-1.5 my-2">
                <div className="text-2xl lg:text-3xl font-semibold text-blue-400 font-mono tracking-tight">
                  {metric.value}
                </div>
              </div>

              <div className="pt-2 border-t border-[#18233c] flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 font-mono font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                  <ArrowUpRight size={12} />
                  <span>{metric.delta}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate ml-2">
                  {metric.deltaLabel}
                </span>
              </div>
            </div>
          );
        }

        if (metric.category === 'burn') {
          return (
            <div
              key={metric.id}
              id={metric.id}
              className="relative p-5 rounded-xl bg-[#0e1628] border border-[#1d2b48] shadow-lg shadow-black/40 hover:border-rose-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-semibold text-slate-400 tracking-tight">
                  {metric.label}
                </span>
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Flame size={16} />
                </div>
              </div>

              <div className="space-y-1.5 my-2">
                <div className="text-2xl lg:text-3xl font-semibold text-rose-400 font-mono tracking-tight">
                  {metric.value}
                </div>
              </div>

              <div className="pt-2 border-t border-[#18233c] flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 font-mono font-medium text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 text-[11px]">
                  <ArrowDownRight size={12} />
                  <span>{metric.delta}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate ml-2">
                  {metric.deltaLabel}
                </span>
              </div>
            </div>
          );
        }

        if (metric.category === 'runway') {
          return (
            <div
              key={metric.id}
              id={metric.id}
              className="relative p-5 rounded-xl bg-[#0e1628] border border-[#1d2b48] shadow-lg shadow-black/40 hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-semibold text-slate-400 tracking-tight">
                  {metric.label}
                </span>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Hourglass size={16} />
                </div>
              </div>

              <div className="space-y-1.5 my-2">
                <div className="text-2xl lg:text-3xl font-semibold text-emerald-400 font-mono tracking-tight">
                  {metric.value}
                </div>
              </div>

              <div className="pt-2 border-t border-[#18233c] flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 font-mono font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                  <ArrowUpRight size={12} />
                  <span>{metric.delta}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate ml-2">
                  {metric.deltaLabel}
                </span>
              </div>
            </div>
          );
        }

        // Pending Settlement
        return (
          <div
            key={metric.id}
            id={metric.id}
            className="relative p-5 rounded-xl bg-[#0e1628] border border-[#1d2b48] shadow-lg shadow-black/40 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-tight">
                {metric.label}
              </span>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Clock size={16} />
              </div>
            </div>

            <div className="space-y-1.5 my-2">
              <div className="text-2xl lg:text-3xl font-semibold text-white font-mono tracking-tight">
                {metric.value}
              </div>
            </div>

            <div className="pt-2 border-t border-[#18233c] flex items-center justify-between text-xs">
              <div className="inline-flex items-center gap-1 font-mono font-medium text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 text-[11px]">
                <Sparkles size={11} />
                <span>{metric.delta}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium truncate ml-2">
                {metric.deltaLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
