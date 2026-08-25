import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  LineChart,
  Sparkles,
  Layers,
  ArrowUpRight,
  Info,
  Calendar,
  SlidersHorizontal,
} from 'lucide-react';

export interface CashFlowDataPoint {
  period: string;
  monthName: string;
  inflow: number;
  outflow: number;
  netCashFlow: number;
  consolidatedLiquidity: number;
  isForecast?: boolean;
  confidenceLower?: number;
  confidenceUpper?: number;
}

const DEFAULT_CASH_FLOW_DATA: CashFlowDataPoint[] = [
  // 6 Months Historical
  {
    period: '2025-10',
    monthName: 'Oct 2025',
    inflow: 22.4,
    outflow: 18.2,
    netCashFlow: 4.2,
    consolidatedLiquidity: 132.8,
    isForecast: false,
  },
  {
    period: '2025-11',
    monthName: 'Nov 2025',
    inflow: 24.1,
    outflow: 19.0,
    netCashFlow: 5.1,
    consolidatedLiquidity: 137.9,
    isForecast: false,
  },
  {
    period: '2025-12',
    monthName: 'Dec 2025',
    inflow: 28.5,
    outflow: 22.4,
    netCashFlow: 6.1,
    consolidatedLiquidity: 144.0,
    isForecast: false,
  },
  {
    period: '2026-01',
    monthName: 'Jan 2026',
    inflow: 21.8,
    outflow: 18.9,
    netCashFlow: 2.9,
    consolidatedLiquidity: 146.9,
    isForecast: false,
  },
  {
    period: '2026-02',
    monthName: 'Feb 2026',
    inflow: 23.6,
    outflow: 19.5,
    netCashFlow: 4.1,
    consolidatedLiquidity: 151.0,
    isForecast: false,
  },
  {
    period: '2026-03',
    monthName: 'Mar 2026 (Actual)',
    inflow: 24.8,
    outflow: 20.2,
    netCashFlow: 4.6,
    consolidatedLiquidity: 148.4,
    isForecast: false,
  },
  // 3 Months Predictive Runway
  {
    period: '2026-04',
    monthName: 'Apr 2026 (Proj)',
    inflow: 26.2,
    outflow: 20.8,
    netCashFlow: 5.4,
    consolidatedLiquidity: 153.8,
    isForecast: true,
    confidenceLower: 150.2,
    confidenceUpper: 157.4,
  },
  {
    period: '2026-05',
    monthName: 'May 2026 (Proj)',
    inflow: 27.5,
    outflow: 21.3,
    netCashFlow: 6.2,
    consolidatedLiquidity: 160.0,
    isForecast: true,
    confidenceLower: 154.8,
    confidenceUpper: 165.2,
  },
  {
    period: '2026-06',
    monthName: 'Jun 2026 (Proj)',
    inflow: 29.0,
    outflow: 22.0,
    netCashFlow: 7.0,
    consolidatedLiquidity: 167.0,
    isForecast: true,
    confidenceLower: 159.5,
    confidenceUpper: 174.5,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomGlassmorphicTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) return null;

  const currentItem = DEFAULT_CASH_FLOW_DATA.find((d) => d.monthName === label);
  const isForecast = currentItem?.isForecast;

  return (
    <div className="p-4 rounded-xl bg-[#0c1322]/95 backdrop-blur-xl border border-slate-700/70 shadow-2xl shadow-black/90 text-xs min-w-[240px] space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-semibold text-slate-200 font-mono">{label}</span>
        {isForecast ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            <Sparkles size={10} /> AI Proj.
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700">
            Reconciled
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const isLiquidity = entry.dataKey === 'consolidatedLiquidity';
          const isInflow = entry.dataKey === 'inflow';
          const isOutflow = entry.dataKey === 'outflow';

          let displayLabel = entry.name;
          if (isLiquidity) displayLabel = 'Total Liquidity Pool';
          if (isInflow) displayLabel = 'Operating Inflow';
          if (isOutflow) displayLabel = 'Total Burn / Outflow';

          return (
            <div
              key={`tooltip-item-${index}`}
              className="flex items-center justify-between gap-4 font-mono text-[11px]"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-400">{displayLabel}</span>
              </div>
              <span className="font-bold text-slate-100">
                ${entry.value.toFixed(1)}M
              </span>
            </div>
          );
        })}
      </div>

      {currentItem && (
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Net Delta:</span>
          <span
            className={`font-bold ${
              currentItem.netCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {currentItem.netCashFlow >= 0 ? '+' : ''}
            ${currentItem.netCashFlow.toFixed(1)}M / mo
          </span>
        </div>
      )}
    </div>
  );
};

export const CashFlowChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'all' | 'liquidity' | 'net'>('all');

  return (
    <div
      id="cashflow-chart-container"
      className="p-6 rounded-2xl bg-[#0e1628] border border-[#1d2b48] shadow-xl shadow-black/40 relative select-none space-y-6"
    >
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Cash Flow Velocity & Runway Trajectory
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25">
              6M Actual • 3M Predictive
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Consolidated treasury balance projections across all 6 corporate entities.
          </p>
        </div>

        {/* Legend & Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-400 bg-[#090e1b] px-3 py-1.5 rounded-lg border border-[#1b2640]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-xs shadow-blue-500/50" />
              <span>Consolidated Liquidity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400 shadow-xs shadow-emerald-400/50" />
              <span>Inflows</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-rose-400 shadow-xs shadow-rose-400/50" />
              <span>Burn / Outflows</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#090d16] p-1 rounded-lg border border-[#1b2740]">
            <button
              onClick={() => setViewMode('all')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                viewMode === 'all'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Stack
            </button>
            <button
              onClick={() => setViewMode('liquidity')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                viewMode === 'liquidity'
                  ? 'bg-blue-600/30 text-blue-300 font-semibold border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Liquidity Only
            </button>
          </div>
        </div>
      </div>

      {/* Main Recharts Area */}
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={DEFAULT_CASH_FLOW_DATA}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Electric Blue Gradient for Consolidated Liquidity */}
              <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>

              {/* Emerald Gradient for Positive Inflows */}
              <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>

              {/* Crimson Gradient for Outflows / Burn */}
              <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Faint Slate-800 Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
              opacity={0.8}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="monthName"
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
            />

            {/* Y-Axis in Millions ($M) */}
            <YAxis
              stroke="#475569"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}M`}
              domain={[0, 'auto']}
            />

            {/* Custom Glassmorphic Tooltip */}
            <Tooltip content={<CustomGlassmorphicTooltip />} />

            {/* Reference Line marking boundary between Historical & Forecast */}
            <ReferenceLine
              x="Mar 2026 (Actual)"
              stroke="#38bdf8"
              strokeDasharray="4 4"
              label={{
                value: 'AI Predictive Horizon',
                fill: '#38bdf8',
                fontSize: 10,
                position: 'top',
                fontFamily: 'monospace',
              }}
            />

            {/* Area Layers */}
            {(viewMode === 'all' || viewMode === 'liquidity') && (
              <Area
                type="monotone"
                dataKey="consolidatedLiquidity"
                name="Consolidated Liquidity"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#liquidityGradient)"
                activeDot={{ r: 6, fill: '#3B82F6', stroke: '#ffffff', strokeWidth: 2 }}
              />
            )}

            {viewMode === 'all' && (
              <>
                <Area
                  type="monotone"
                  dataKey="inflow"
                  name="Inflows"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#inflowGradient)"
                  activeDot={{ r: 5, fill: '#10B981', stroke: '#090d16', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  name="Outflows"
                  stroke="#F43F5E"
                  strokeWidth={1.75}
                  strokeDasharray="2 2"
                  fillOpacity={1}
                  fill="url(#outflowGradient)"
                  activeDot={{ r: 5, fill: '#F43F5E', stroke: '#090d16', strokeWidth: 2 }}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-3 border-t border-[#18233c] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Average Monthly Surplus:</span>
          <span className="font-bold text-white">+$4.48M</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Projected Q2 2026 Liquidity:</span>
          <span className="font-bold text-blue-400">$167.0M</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 sm:justify-end">
          <Sparkles size={13} className="text-cyan-400" />
          <span>Forecast Confidence:</span>
          <span className="font-bold text-emerald-400">98.2%</span>
        </div>
      </div>
    </div>
  );
};
