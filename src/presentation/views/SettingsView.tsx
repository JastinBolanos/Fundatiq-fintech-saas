import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Building2,
  Lock,
  Key,
  Globe2,
  Bell,
  CheckCircle2,
  Save,
  RefreshCw,
  Zap,
  SlidersHorizontal,
  User,
  Layers,
  Languages,
  Sun,
  Moon,
  Palette,
} from 'lucide-react';
import { UserProfile, OrganizationContext } from '../../domain/entities/navigation.types';
import { useLanguage, Language } from '../context/LanguageContext';
import { useTheme, Theme } from '../context/ThemeContext';

interface SettingsViewProps {
  organization?: OrganizationContext;
  user?: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [dualSignThreshold, setDualSignThreshold] = useState('500000');
  const [autoSweepEnabled, setAutoSweepEnabled] = useState(true);
  const [fxHedgingEnabled, setFxHedgingEnabled] = useState(true);
  const [openBankingSyncInterval, setOpenBankingSyncInterval] = useState('15');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 600);
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div id="treasury-settings-view" className="space-y-8 select-none max-w-5xl">
      {/* Top Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight font-mono uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t.settings.headerTitle}
            </h1>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
              isLight
                ? 'bg-blue-50 border border-blue-200 text-blue-700'
                : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
            }`}>
              <ShieldCheck size={13} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
              <span>{t.settings.enterpriseTier}</span>
            </div>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            {t.settings.headerSubtitle}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Language & Localization Selector (PRIMARY HIGHLIGHT) */}
        <div className={`p-6 rounded-2xl backdrop-blur-md shadow-xl space-y-5 transition-all ${
          isLight
            ? 'bg-white border-2 border-blue-400/40 shadow-slate-200/60'
            : 'bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-900/80 border-2 border-blue-500/40 shadow-2xl'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isLight
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
                <Languages size={20} />
              </div>
              <div>
                <h2 className={`text-sm font-bold font-mono uppercase tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {t.settings.languageSectionTitle}
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.languageSectionSub}</p>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full border text-xs font-mono flex items-center gap-1.5 font-bold ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}>
              <Globe2 size={13} />
              <span>{language === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English Card */}
            <div
              id="lang-option-en"
              onClick={() => handleSelectLanguage('en')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                language === 'en'
                  ? isLight
                    ? 'bg-blue-50/80 border-blue-500 shadow-md shadow-blue-100'
                    : 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-950/40'
                  : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇺🇸</div>
                  <div>
                    <div className={`text-sm font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {t.settings.languageEnglish}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.settings.languageEnglishDesc}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="systemLanguage"
                  checked={language === 'en'}
                  onChange={() => handleSelectLanguage('en')}
                  className="w-4 h-4 accent-blue-500 cursor-pointer mt-1"
                />
              </div>
              {language === 'en' && (
                <div className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border self-start ${
                  isLight
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <CheckCircle2 size={11} />
                  <span>{t.settings.languageActiveBadge}</span>
                </div>
              )}
            </div>

            {/* Spanish Card */}
            <div
              id="lang-option-es"
              onClick={() => handleSelectLanguage('es')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                language === 'es'
                  ? isLight
                    ? 'bg-blue-50/80 border-blue-500 shadow-md shadow-blue-100'
                    : 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-950/40'
                  : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇪🇸</div>
                  <div>
                    <div className={`text-sm font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {t.settings.languageSpanish}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.settings.languageSpanishDesc}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="systemLanguage"
                  checked={language === 'es'}
                  onChange={() => handleSelectLanguage('es')}
                  className="w-4 h-4 accent-blue-500 cursor-pointer mt-1"
                />
              </div>
              {language === 'es' && (
                <div className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border self-start ${
                  isLight
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <CheckCircle2 size={11} />
                  <span>{t.settings.languageActiveBadge}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Theme & Visual Appearance Selector (Light/Dark Mode) */}
        <div className={`p-6 rounded-2xl backdrop-blur-md shadow-xl space-y-5 transition-all ${
          isLight
            ? 'bg-white border-2 border-indigo-300/60 shadow-slate-200/60'
            : 'bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/30 shadow-2xl'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isLight
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                <Palette size={20} />
              </div>
              <div>
                <h2 className={`text-sm font-bold font-mono uppercase tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {t.settings.themeSectionTitle}
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.themeSectionSub}</p>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full border text-xs font-mono flex items-center gap-1.5 font-bold ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
            }`}>
              {theme === 'dark' ? <Moon size={13} className={isLight ? 'text-indigo-600' : 'text-indigo-400'} /> : <Sun size={13} className="text-amber-500" />}
              <span>{theme === 'dark' ? (language === 'es' ? '🌙 Modo Oscuro' : '🌙 Dark Mode') : (language === 'es' ? '☀️ Modo Claro' : '☀️ Light Mode')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dark Mode Card */}
            <div
              id="theme-option-dark"
              onClick={() => handleSelectTheme('dark')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                theme === 'dark'
                  ? isLight
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-md shadow-indigo-100 ring-1 ring-indigo-500/50'
                    : 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                  : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-slate-200/70 border-slate-300 text-indigo-700'
                      : 'bg-slate-900 border-slate-700 text-blue-400'
                  }`}>
                    <Moon size={22} className={isLight ? 'text-indigo-600' : 'text-indigo-400'} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold font-mono flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      <span>{t.settings.themeDark}</span>
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded border ${
                        isLight
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      }`}>DEFAULT</span>
                    </div>
                    <div className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.settings.themeDarkDesc}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="systemTheme"
                  checked={theme === 'dark'}
                  onChange={() => handleSelectTheme('dark')}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer mt-1"
                />
              </div>
              {theme === 'dark' && (
                <div className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border self-start ${
                  isLight
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <CheckCircle2 size={11} />
                  <span>{t.settings.themeActiveBadge}</span>
                </div>
              )}
            </div>

            {/* Light Mode Card */}
            <div
              id="theme-option-light"
              onClick={() => handleSelectTheme('light')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                theme === 'light'
                  ? isLight
                    ? 'bg-amber-50/70 border-amber-500 shadow-md shadow-amber-100 ring-1 ring-amber-500/50'
                    : 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/50'
                  : isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-amber-100/80 border-amber-300 text-amber-600'
                      : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                  }`}>
                    <Sun size={22} className="text-amber-500" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {t.settings.themeLight}
                    </div>
                    <div className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.settings.themeLightDesc}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="systemTheme"
                  checked={theme === 'light'}
                  onChange={() => handleSelectTheme('light')}
                  className="w-4 h-4 accent-amber-500 cursor-pointer mt-1"
                />
              </div>
              {theme === 'light' && (
                <div className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border self-start ${
                  isLight
                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}>
                  <CheckCircle2 size={11} />
                  <span>{t.settings.themeActiveBadge}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Executive Identity & Organization */}
        <div className={`p-6 rounded-2xl backdrop-blur-md border shadow-xl space-y-5 ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-200/60'
            : 'bg-slate-900/50 border-slate-800/80 shadow-2xl'
        }`}>
          <div className={`flex items-center gap-3 border-b pb-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div className={`p-2 rounded-lg border ${
              isLight
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            }`}>
              <User size={18} />
            </div>
            <div>
              <h2 className={`text-sm font-bold font-mono uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.settings.profileSectionTitle}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.profileSectionSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.officerName}
              </label>
              <input
                type="text"
                defaultValue="Eleanor Vance, CFA"
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
            </div>

            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.officerRole}
              </label>
              <input
                type="text"
                defaultValue={language === 'es' ? 'Vicepresidenta de Tesorería del Grupo y FP&A' : 'Group VP of Treasury & FP&A'}
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
            </div>

            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.orgName}
              </label>
              <input
                type="text"
                defaultValue="Apex Global Technologies Inc."
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
            </div>

            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.baseCurrency}
              </label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              >
                <option value="USD">USD ($) - US Dollar (Default)</option>
                <option value="EUR">EUR (€) - Eurozone</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CHF">CHF (Fr) - Swiss Franc</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Dual Control & Multi-Sig Policies */}
        <div className={`p-6 rounded-2xl backdrop-blur-md border shadow-xl space-y-5 ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-200/60'
            : 'bg-slate-900/50 border-slate-800/80 shadow-2xl'
        }`}>
          <div className={`flex items-center gap-3 border-b pb-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div className={`p-2 rounded-lg border ${
              isLight
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              <Lock size={18} />
            </div>
            <div>
              <h2 className={`text-sm font-bold font-mono uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.settings.governanceSectionTitle}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.governanceSectionSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.dualSignThreshold}
              </label>
              <input
                type="number"
                value={dualSignThreshold}
                onChange={(e) => setDualSignThreshold(e.target.value)}
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 font-bold ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
              <p className={`text-[10px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {t.settings.dualSignThresholdNotice}
              </p>
            </div>

            <div>
              <label className={`block uppercase font-semibold mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {t.settings.refreshFrequency}
              </label>
              <select
                value={openBankingSyncInterval}
                onChange={(e) => setOpenBankingSyncInterval(e.target.value)}
                className={`w-full p-2.5 rounded-lg border focus:border-blue-500 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              >
                <option value="5">{t.settings.freq5Min}</option>
                <option value="15">{t.settings.freq15Min}</option>
                <option value="60">{t.settings.freq60Min}</option>
              </select>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSweepEnabled}
                onChange={(e) => setAutoSweepEnabled(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
              />
              <span className={`text-xs font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {t.settings.optAutoSweep}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fxHedgingEnabled}
                onChange={(e) => setFxHedgingEnabled(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
              />
              <span className={`text-xs font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {t.settings.optFxHedging}
              </span>
            </label>
          </div>
        </div>

        {/* 5. API Keys & Webhooks */}
        <div className={`p-6 rounded-2xl backdrop-blur-md border shadow-xl space-y-5 ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-200/60'
            : 'bg-slate-900/50 border-slate-800/80 shadow-2xl'
        }`}>
          <div className={`flex items-center gap-3 border-b pb-3 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div className={`p-2 rounded-lg border ${
              isLight
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              <Key size={18} />
            </div>
            <div>
              <h2 className={`text-sm font-bold font-mono uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {t.settings.apiSectionTitle}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.apiSectionSub}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-950 border-slate-800/80'
            }`}>
              <div>
                <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.settings.connectorSwift}</div>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.connectorSwiftStatus}</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${
                isLight
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
              }`}>
                {t.settings.statusConnected}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-950 border-slate-800/80'
            }`}>
              <div>
                <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.settings.connectorPlaid}</div>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{t.settings.connectorPlaidStatus}</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] border ${
                isLight
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
              }`}>
                {t.settings.statusConnected}
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saveSuccess && (
            <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 size={14} />
              <span>{t.settings.saveSuccessNotice}</span>
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
          >
            {isSaving ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>{t.settings.savingBtn}</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{t.settings.saveBtn}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
