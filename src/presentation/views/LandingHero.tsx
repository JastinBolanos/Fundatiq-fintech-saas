import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  Globe,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Play,
  Building2,
  Landmark,
  Languages,
  RefreshCw,
  SlidersHorizontal,
  Coins,
  Shield,
  PieChart,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LandingHeroProps {
  onGetStarted?: () => void;
  onExploreDemo?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onGetStarted,
  onExploreDemo,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'liquidity' | 'forecast' | 'multientity'>('liquidity');
  const isLight = theme === 'light';

  return (
    <div
      id="landing-hero-root"
      className={`relative min-h-screen transition-colors duration-250 overflow-hidden select-none flex flex-col justify-between ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#090d16] text-slate-100'
      }`}
    >
      {/* Dynamic Background Glowing Orbs & Ambient Radial Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] w-[580px] h-[580px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-[-10%] left-[30%] w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Corporate Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Public Header Navigation */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white shadow-lg shadow-blue-950/60 border border-blue-400/30">
            <Layers className="w-5 h-5 text-blue-100" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg tracking-tight font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                FUNDATIQ
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded">
                v2.4 Live
              </span>
            </div>
            <span className={`text-[10px] font-mono tracking-wide ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {language === 'es' ? 'Flujo de Caja y Tesorería Corporativa' : 'Corporate Cash Flow & Treasury'}
            </span>
          </div>
        </div>

        {/* Public Navigation Links */}
        <nav className={`hidden md:flex items-center gap-8 text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {language === 'es' ? 'Motor de Tesorería' : 'Treasury Engine'}
          </a>
          <a
            href="#forecast"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {language === 'es' ? 'Pista Predictiva' : 'Predictive Runway'}
          </a>
          <a
            href="#security"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck size={14} className="text-emerald-500 dark:text-emerald-400" />
            <span>SOC 2 Type II</span>
          </a>
        </nav>

        {/* Header Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Language Toggle */}
          <button
            id="landing-language-toggle-btn"
            onClick={toggleLanguage}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer shadow-xs ${
              isLight
                ? 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-800'
                : 'bg-[#121929] hover:bg-[#19243b] border border-[#1e2a42] text-slate-200'
            }`}
          >
            <Languages size={13} className="text-blue-500 dark:text-blue-400" />
            <span>{language === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="landing-theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? t.nav.lightModeLabel : t.nav.darkModeLabel}
            aria-label={t.nav.toggleThemeTooltip}
            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium whitespace-nowrap transition-all cursor-pointer shadow-xs ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-700 hover:border-slate-400'
                : 'bg-[#121929] hover:bg-[#19243b] border-[#1e2a42] hover:border-slate-500 text-slate-200'
            }`}
          >
            <span>{theme === 'dark' ? t.nav.lightModeLabel : t.nav.darkModeLabel}</span>
          </button>

          <button
            id="header-live-demo-btn"
            onClick={onExploreDemo || onGetStarted}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                : 'bg-transparent text-slate-300 hover:text-white hover:bg-[#121929] border border-[#1e2a42]'
            }`}
          >
            <span>{language === 'es' ? 'Demostración en Vivo' : 'Live Demo'}</span>
            <ArrowUpRight size={13} className="text-blue-500 dark:text-blue-400" />
          </button>

          <button
            id="header-client-portal-btn"
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] shadow-md shadow-blue-900/40 hover:shadow-blue-500/20 transition-all cursor-pointer border border-blue-400/30 text-white-force"
          >
            <Lock size={13} className="text-amber-300" />
            <span>{language === 'es' ? 'Portal de Clientes' : 'Client Portal'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-8 pb-16 flex-1 flex flex-col justify-center">
        {/* Trust Eyebrow Badge */}
        <div className="flex items-center justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-md transition-all ${
              isLight
                ? 'bg-white border border-blue-200 text-slate-700 shadow-sm'
                : 'bg-[#0f172a]/90 border border-blue-500/30 text-slate-300 shadow-lg shadow-black/40 hover:border-blue-500/50'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
              Fundatiq Treasury OS
            </span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>•</span>
            <span className={`text-[11px] ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
              {t.landing.badge}
            </span>
          </div>
        </div>

        {/* 1. Giant Slogan / The Hook & 2. Sub-headline */}
        <div className="text-center mt-6 max-w-4xl mx-auto space-y-6">
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t.landing.headlinePart1}{' '}
            <span
              className={`bg-clip-text text-transparent underline-offset-8 decoration-blue-500/40 ${
                isLight
                  ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-600'
                  : 'bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400'
              }`}
            >
              {t.landing.headlineGradient}
            </span>{' '}
            {t.landing.headlinePart2}
          </h1>

          <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-normal leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t.landing.subheadline}
          </p>

          {/* 3. The Call to Action (CTA) & Value Triggers */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-primary-cta"
              onClick={onGetStarted}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-600 hover:from-blue-500 hover:via-blue-400 hover:to-emerald-500 shadow-xl shadow-blue-900/50 hover:shadow-blue-500/30 hover:scale-105 active:scale-[0.98] transition-all duration-300 border border-blue-400/30 cursor-pointer text-white-force"
            >
              <Lock size={16} className="text-amber-300 group-hover:scale-110 transition-transform duration-300" />
              <span>{t.landing.enterApp}</span>
              <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onExploreDemo || onGetStarted}
              className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold shadow-md transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-800'
                  : 'bg-[#0e1628]/80 hover:bg-[#15223e] border border-[#1e2e4f] hover:border-slate-500 text-slate-200'
              }`}
            >
              <Play size={14} className="text-blue-500 dark:text-blue-400 fill-blue-400/20" />
              <span>{t.landing.exploreDemo}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className={`pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-medium ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
              <span>{t.landing.activeCashMonitored}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
              <span>{t.landing.fedNowSettlement}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
              <span>{t.landing.liquidityPrecision}</span>
            </div>
          </div>
        </div>

        {/* 4 & 5. Visual Dynamism: Live Interactive Treasury UI Preview Card */}
        <div className="mt-12 max-w-5xl mx-auto w-full">
          <div className={`relative rounded-2xl p-2 sm:p-4 backdrop-blur-xl transition-all ${
            isLight
              ? 'bg-white border border-slate-200 shadow-xl'
              : 'bg-[#0c1322]/90 border border-slate-700/60 shadow-2xl shadow-black/80'
          }`}>
            {/* Terminal Window Chrome */}
            <div className={`flex items-center justify-between pb-3 px-3 border-b ${
              isLight ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className={`ml-2 text-[11px] font-mono font-medium hidden sm:inline ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  fundatiq.treasury.console/live-feed
                </span>
              </div>

              {/* Interactive Preview Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#090d16] border-slate-800'
              }`}>
                <button
                  onClick={() => setActiveTab('liquidity')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium transition-all ${
                    activeTab === 'liquidity'
                      ? isLight
                        ? 'bg-white text-blue-700 shadow-xs border border-slate-200 font-bold'
                        : 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.landing.featureTabs.liquidity}
                </button>
                <button
                  onClick={() => setActiveTab('forecast')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium transition-all ${
                    activeTab === 'forecast'
                      ? isLight
                        ? 'bg-white text-emerald-700 shadow-xs border border-slate-200 font-bold'
                        : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.landing.featureTabs.forecast}
                </button>
                <button
                  onClick={() => setActiveTab('multientity')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium transition-all ${
                    activeTab === 'multientity'
                      ? isLight
                        ? 'bg-white text-cyan-700 shadow-xs border border-slate-200 font-bold'
                        : 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.landing.featureTabs.multientity}
                </button>
              </div>
            </div>

            {/* Simulated Live FinTech Metrics & Live Breakdown Panels for all 3 tabs */}
            <div className={`p-4 sm:p-6 space-y-5 rounded-xl mt-3 border transition-all duration-300 ${
              isLight
                ? 'bg-slate-50/70 border-slate-200'
                : 'bg-[#090e1b]/80 border-[#141e33]'
            }`}>
              {/* TAB 1: GLOBAL LIQUIDITY */}
              {activeTab === 'liquidity' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Metric 1 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-blue-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{t.dashboard.kpi1Title}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                          +8.4% MoM
                        </span>
                      </div>
                      <div className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        $148,420,000.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Building2 size={12} className="text-blue-500 dark:text-blue-400" />
                        <span>{language === 'es' ? '6 Divisas Globales (Base USD)' : '6 Global Currencies (USD Base)'}</span>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-emerald-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{t.cashFlow.metric2Title}</span>
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">
                          {language === 'es' ? 'Alta Velocidad' : 'High Velocity'}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                        +$24,815,900.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Activity size={12} className="text-emerald-500 dark:text-emerald-400" />
                        <span>{language === 'es' ? '99.8% Tasa de Cobranza Automatizada' : '99.8% Automated Collection Rate'}</span>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-amber-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Rendimiento por Barrido Nocturno' : 'Overnight Yield Swept'}</span>
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">
                          +5.25% APY
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                        +$1,420,500.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Coins size={12} className="text-amber-500 dark:text-amber-400" />
                        <span>{language === 'es' ? 'Captura Automática de Fondos Federales' : 'Fed Funds Rate Real-Time Capture'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Bank Currency Breakdown Feed */}
                  <div className={`p-3.5 rounded-xl border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#0b1220] border-[#18263f]'
                  }`}>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>JPMorgan Chase (USD)</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>$68.42M <span className="text-[10px] text-slate-500">(46%)</span></div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>HSBC London (GBP)</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>£28.30M <span className="text-[10px] text-slate-500">($35.8M)</span></div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>BNP Paribas (EUR)</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>€24.10M <span className="text-[10px] text-slate-500">($26.2M)</span></div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>DBS Singapore (SGD)</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>$17.97M <span className="text-[10px] text-slate-500">(12%)</span></div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                    </div>
                  </div>

                  {/* Banner 1 */}
                  <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                    isLight ? 'bg-blue-50/50 border-blue-100' : 'bg-[#0a0f1d] border-[#162238]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {language === 'es' ? 'Agrupación Global Multidivisa en Tiempo Real Activa' : 'Real-Time Global Multi-Currency Pooling Active'}
                        </div>
                        <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'es' ? 'Consolidación continua en JPMorgan, HSBC, Citi y BNP Paribas con compensación automática.' : 'Continuous aggregation across JPMorgan, HSBC, Citi, and BNP Paribas with automated netting.'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onExploreDemo || onGetStarted}
                      className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer text-white-force"
                    >
                      <span>{language === 'es' ? 'Explorar Liquidez Global' : 'Explore Global Liquidity'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PREDICTIVE RUNWAY (FORECAST) */}
              {activeTab === 'forecast' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Forecast Metric 1 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-blue-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Pista Financiera Predictiva' : 'Predictive Cash Runway'}</span>
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">
                          {language === 'es' ? 'Confianza 98%' : 'Confidence 98%'}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight">
                        {language === 'es' ? '24.8 Meses' : '24.8 Months'}
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Sparkles size={12} className="text-amber-500 dark:text-amber-400" />
                        <span>{language === 'es' ? 'Modelado con ChatGPT-5.6 sol & Claude sonnet 4.5' : 'Powered by ChatGPT-5.6 sol & Claude sonnet 4.5'}</span>
                      </div>
                    </div>

                    {/* Forecast Metric 2 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-emerald-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Tasa de Quema Neta Mensual' : 'Net Monthly Burn Rate'}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {language === 'es' ? 'Optimizado' : 'Optimized'}
                        </span>
                      </div>
                      <div className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        $5,980,000.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <TrendingUp size={12} className="text-emerald-500 dark:text-emerald-400" />
                        <span>{language === 'es' ? '-14.2% Varianza en OPEX' : '-14.2% OPEX Variance'}</span>
                      </div>
                    </div>

                    {/* Forecast Metric 3 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-emerald-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Margen de Seguridad de Choque' : 'Stress Scenario Buffer'}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {language === 'es' ? 'Ultra Seguro' : 'Ultra Resilient'}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                        +$38,500,000.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Shield size={12} className="text-emerald-500 dark:text-emerald-400" />
                        <span>{language === 'es' ? 'Resistencia a Shocks de Tasas +250bps' : 'Rates +250bps Shock Proof'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scenario Stress-Test Breakdown Matrix */}
                  <div className={`p-3.5 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#0b1220] border-[#18263f]'
                  }`}>
                    <div className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div className={`flex items-center justify-between text-[10px] font-mono mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>{language === 'es' ? 'Escenario Base' : 'Baseline Scenario'}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">98.4% Prob</span>
                      </div>
                      <div className={`text-sm font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{language === 'es' ? '24.8 Meses' : '24.8 Months'}</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{language === 'es' ? 'Crecimiento nominal estandarizado' : 'Standard nominal trajectory'}</div>
                    </div>

                    <div className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div className={`flex items-center justify-between text-[10px] font-mono mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>{language === 'es' ? 'Choque Macroeconómico (+250bps)' : 'Macro Rate Shock (+250bps)'}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">95.1% Prob</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-amber-600 dark:text-amber-300">{language === 'es' ? '21.3 Meses' : '21.3 Months'}</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{language === 'es' ? 'Rendimientos de tesorería compensan' : 'Yield sweeps offset OPEX rise'}</div>
                    </div>

                    <div className={`p-2.5 rounded-lg border ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div className={`flex items-center justify-between text-[10px] font-mono mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>{language === 'es' ? 'Demora de Clientes (60 días)' : 'Client Collection Delay (60d)'}</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">92.8% Prob</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-300">{language === 'es' ? '18.6 Meses' : '18.6 Months'}</div>
                      <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{language === 'es' ? 'Línea de crédito dinámica activada' : 'Dynamic credit buffer triggered'}</div>
                    </div>
                  </div>

                  {/* Banner 2 */}
                  <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                    isLight ? 'bg-emerald-50/50 border-emerald-100' : 'bg-[#0a0f1d] border-[#162238]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {language === 'es' ? 'Motor de Inteligencia Predictiva con ChatGPT-5.6 sol, Claude sonnet 4.5 & Perplexity Activo' : 'Frontier AI Predictive Engine with ChatGPT-5.6 sol, Claude sonnet 4.5 & Perplexity Active'}
                        </div>
                        <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'es' ? 'Análisis en tiempo real de choques de tasas, demoras de clientes y volatilidad FX asistido por modelos de frontera.' : 'Real-time simulation of interest rate shifts, supply delays, and FX volatility assisted by frontier models.'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onExploreDemo || onGetStarted}
                      className="w-full md:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer text-white-force"
                    >
                      <span>{language === 'es' ? 'Explorar Pista Predictiva' : 'Explore Predictive Runway'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: MULTI-ENTITY SWEEPS */}
              {activeTab === 'multientity' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Sweeps Metric 1 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-cyan-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-cyan-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Barridos Diarios Automatizados' : 'Automated Daily Sweeps'}</span>
                        <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 font-bold">
                          100% {language === 'es' ? 'Ejecutado' : 'Executed'}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono tracking-tight">
                        $42,150,000.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Building2 size={12} className="text-cyan-500 dark:text-cyan-400" />
                        <span>{language === 'es' ? '14 Subsidiarias Operativas' : '14 Operating Subsidiaries'}</span>
                      </div>
                    </div>

                    {/* Sweeps Metric 2 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-emerald-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Ahorro en Fricción Intercompañía' : 'Intercompany Friction Saved'}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {language === 'es' ? 'Cero Fricción FX' : 'Zero FX Wire Fees'}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                        +$840,000.00
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <RefreshCw size={12} className="text-emerald-500 dark:text-emerald-400" />
                        <span>{language === 'es' ? 'Compensación Multilateral Diaria' : 'Daily Multilateral Netting'}</span>
                      </div>
                    </div>

                    {/* Sweeps Metric 3 */}
                    <div className={`p-4 rounded-xl space-y-1.5 transition-colors border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
                        : 'bg-[#0e1628] border-[#1b2a47] hover:border-blue-500/40'
                    }`}>
                      <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-medium">{language === 'es' ? 'Varianza de Saldo ZBA' : 'ZBA Target Balance Variance'}</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                          {language === 'es' ? 'Precisión Óptima' : 'Optimal'}
                        </span>
                      </div>
                      <div className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        &lt; 0.01%
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <SlidersHorizontal size={12} className="text-blue-500 dark:text-blue-400" />
                        <span>{language === 'es' ? 'Reglas de Saldo Cero Automatizadas' : 'Zero-Balance Account Rules (ZBA)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subsidiary Sweep Live Pipeline Execution List */}
                  <div className={`p-3.5 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#0b1220] border-[#18263f]'
                  }`}>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Fundatiq Americas LLC ➔ Vault</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>$18,500,000.00</div>
                        <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">21:00 EST • ZBA Swept</div>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                    </div>

                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Fundatiq Europe B.V. ➔ Vault</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>€12,300,000.00</div>
                        <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">18:00 CET • ZBA Swept</div>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                    </div>

                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#080d17] border-slate-800'
                    }`}>
                      <div>
                        <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Fundatiq APAC Pte Ltd ➔ Vault</div>
                        <div className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>$11,350,000.00</div>
                        <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">00:00 SGT • ZBA Swept</div>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                    </div>
                  </div>

                  {/* Banner 3 */}
                  <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                    isLight ? 'bg-cyan-50/50 border-cyan-100' : 'bg-[#0a0f1d] border-[#162238]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-600/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">
                        <RefreshCw size={20} />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {language === 'es' ? 'Balance de Tesorería Multi-Entidad Activo' : 'Instant Multi-Entity Treasury Balancing Active'}
                        </div>
                        <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {language === 'es' ? 'Barridos de saldo cero (ZBA) configurados para Norteamérica, EMEA y APAC.' : 'Zero-balance accounts (ZBA) sweeps configured for North America, EMEA, and APAC.'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onExploreDemo || onGetStarted}
                      className="w-full md:w-auto px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer text-white-force"
                    >
                      <span>{language === 'es' ? 'Explorar Barridos Multi-Entidad' : 'Explore Multi-Entity Sweeps'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Global Enterprise Trust & Banking Network Footer Bar */}
      <footer className={`relative z-10 border-t backdrop-blur-md py-6 px-6 ${
        isLight
          ? 'border-slate-200 bg-white text-slate-600'
          : 'border-slate-800/80 bg-[#070b14]/80 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500 dark:text-emerald-400" />
            <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}>
              Enterprise Grade: ISO 27001 • SOC 2 Type II • FedNow Ready
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>{language === 'es' ? 'Cifrado AES-256 GCM' : 'Encrypted AES-256 GCM'}</span>
            <span>{language === 'es' ? 'Hub Global Multidivisa' : 'Global Multi-Currency Hub'}</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">© 2026 Fundatiq Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
