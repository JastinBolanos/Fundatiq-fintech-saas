import React, { useState } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  ShieldCheck,
  Building2,
  Hourglass,
  Flame,
  Wallet,
  ArrowUpRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';
import { PredictiveRunwayChart } from '../components/sections/PredictiveRunwayChart';
import { useLanguage } from '../context/LanguageContext';
import { useCashFlow } from '../hooks/useCashFlow';

export const PredictiveRunwayView: React.FC = () => {
  const { t, language } = useLanguage();
  const { forecastChartData } = useCashFlow();
  // Simulation Parameter States
  const [arrGrowthRate, setArrGrowthRate] = useState<number>(28); // 28% ARR YoY
  const [headcountExpansion, setHeadcountExpansion] = useState<number>(15); // +15% headcount
  const [rateHikeBps, setRateHikeBps] = useState<number>(25); // +25 bps
  const [churnStressScenario, setChurnStressScenario] = useState<'base' | 'moderate' | 'severe'>('base');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Dynamic calculations based on parameters
  const baseLiquidity = 148420000;
  const baseBurn = 3180450;
  
  // Calculate adjusted burn and runway
  const growthMultiplier = 1 + (arrGrowthRate - 20) * 0.015;
  const opexMultiplier = 1 + headcountExpansion * 0.008;
  const churnPenalty = churnStressScenario === 'severe' ? 0.82 : churnStressScenario === 'moderate' ? 0.92 : 1.0;
  
  const simulatedMonthlyInflow = 4200000 * growthMultiplier * churnPenalty;
  const simulatedMonthlyOutflow = baseBurn * opexMultiplier;
  const simulatedNetBurn = Math.max(0, simulatedMonthlyOutflow - simulatedMonthlyInflow);
  
  const simulatedRunwayMonths = simulatedNetBurn > 0 ? (baseLiquidity / simulatedNetBurn).toFixed(1) : t.predictiveRunway.infiniteRunway;
  const zeroCashDate = language === 'es' ? 'Octubre 2029' : 'October 2029';
  const confidenceScore = churnStressScenario === 'severe' ? 92.4 : churnStressScenario === 'moderate' ? 96.8 : 99.4;

  const handleReset = () => {
    setIsSimulating(true);
    setArrGrowthRate(28);
    setHeadcountExpansion(15);
    setRateHikeBps(25);
    setChurnStressScenario('base');
    setTimeout(() => setIsSimulating(false), 400);
  };

  return (
    <div id="predictive-runway-view" className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.predictiveRunway.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-mono text-blue-400 font-medium">
              <Sparkles size={12} className="text-blue-400" />
              <span>{t.predictiveRunway.monteCarloVersion}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.predictiveRunway.headerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={isSimulating ? 'animate-spin text-blue-400' : ''} />
            <span>{t.predictiveRunway.resetBaseline}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Outputs from simulation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">
              {t.predictiveRunway.kpi1Title}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Hourglass size={16} />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono">
            {simulatedRunwayMonths} {typeof simulatedRunwayMonths === 'string' && !simulatedRunwayMonths.includes('Infinite') && !simulatedRunwayMonths.includes('Infinito') ? t.predictiveRunway.monthsLabel : ''}
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
            <span>{t.charts.confidenceScore}:</span>
            <span className="text-emerald-400 font-semibold">{confidenceScore}%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">
              {t.predictiveRunway.kpi2Title}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-blue-400 font-mono">
            +${(simulatedMonthlyInflow / 1000000).toFixed(2)}M
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
            <span>{language === 'es' ? 'Crecimiento ARR:' : 'ARR Growth:'}</span>
            <span className="text-blue-400 font-semibold">+{arrGrowthRate}% YoY</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">
              {t.predictiveRunway.kpi3Title}
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame size={16} />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-rose-400 font-mono">
            -${(simulatedMonthlyOutflow / 1000000).toFixed(2)}M
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
            <span>{language === 'es' ? 'Delta de Equipo:' : 'Headcount Delta:'}</span>
            <span className="text-rose-400 font-semibold">+{headcountExpansion}%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">
              {t.predictiveRunway.kpi4Title}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-white font-mono">
            {zeroCashDate}
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
            <span>{language === 'es' ? 'Suficiencia de Capital:' : 'Capital Sufficiency:'}</span>
            <span className="text-emerald-400 font-semibold">{language === 'es' ? 'Grado Alto' : 'High Tier'}</span>
          </div>
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Scenario Controls */}
        <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-blue-400" />
              <h2 className="text-sm font-bold text-white uppercase font-mono">
                {t.predictiveRunway.variablesTitle}
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {t.predictiveRunway.activeSimulator}
            </span>
          </div>

          {/* ARR Growth Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">{t.predictiveRunway.targetArrGrowth}</span>
              <span className="font-bold text-blue-400">+{arrGrowthRate}% YoY</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={arrGrowthRate}
              onChange={(e) => setArrGrowthRate(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{t.predictiveRunway.conservative} (+5%)</span>
              <span>{t.predictiveRunway.aggressive} (+60%)</span>
            </div>
          </div>

          {/* Headcount / OpEx Expansion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">{t.predictiveRunway.headcountScaling}</span>
              <span className="font-bold text-rose-400">+{headcountExpansion}% MoM</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={headcountExpansion}
              onChange={(e) => setHeadcountExpansion(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{t.predictiveRunway.hiringFreeze} (0%)</span>
              <span>{t.predictiveRunway.hypergrowth} (+40%)</span>
            </div>
          </div>

          {/* Fed Interest Rate Shift */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">{t.predictiveRunway.rateShift}</span>
              <span className="font-bold text-emerald-400">+{rateHikeBps} bps</span>
            </div>
            <input
              type="range"
              min="-100"
              max="150"
              step="25"
              value={rateHikeBps}
              onChange={(e) => setRateHikeBps(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-100 bps {t.predictiveRunway.rateCut}</span>
              <span>+150 bps {t.predictiveRunway.rateHike}</span>
            </div>
          </div>

          {/* Churn Stress Scenario */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-mono text-slate-300">
              {t.predictiveRunway.macroStressTest}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { key: 'base', label: t.predictiveRunway.modeBase },
                { key: 'moderate', label: t.predictiveRunway.modeModerate },
                { key: 'severe', label: t.predictiveRunway.modeSevere },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setChurnStressScenario(item.key as any)}
                  className={`py-2 rounded-lg capitalize border transition-all cursor-pointer ${
                    churnStressScenario === item.key
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500 font-semibold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Dynamic Interactive Predictive Chart */}
        <div className="lg:col-span-2 space-y-6">
          <PredictiveRunwayChart
            data={forecastChartData}
            currencySymbol="$"
            initialTimeframe="6M"
          />

          {/* AI Executive Intelligence Briefing Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-indigo-950/40 border border-blue-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                <Lightbulb size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                  {t.predictiveRunway.briefingTitle}
                </h3>
                <p className="text-xs text-blue-200/80">
                  {t.predictiveRunway.briefingSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>{t.predictiveRunway.rec1Title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.predictiveRunway.rec1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>{t.predictiveRunway.rec2Title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.predictiveRunway.rec2Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
