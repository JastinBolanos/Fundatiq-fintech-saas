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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.settings.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-mono text-blue-400 font-medium">
              <ShieldCheck size={13} className="text-blue-400" />
              <span>{t.settings.enterpriseTier}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.settings.headerSubtitle}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Language & Localization Selector (PRIMARY HIGHLIGHT) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-900/80 backdrop-blur-md border-2 border-blue-500/40 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Languages size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                  {t.settings.languageSectionTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.settings.languageSectionSub}</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400 flex items-center gap-1.5 font-bold">
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
                  ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇺🇸</div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">
                      {t.settings.languageEnglish}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
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
                <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start">
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
                  ? 'bg-blue-600/15 border-blue-500 shadow-lg shadow-blue-950/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇪🇸</div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">
                      {t.settings.languageSpanish}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
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
                <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start">
                  <CheckCircle2 size={11} />
                  <span>{t.settings.languageActiveBadge}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Theme & Visual Appearance Selector (Light/Dark Mode) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900/80 backdrop-blur-md border border-indigo-500/30 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Palette size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                  {t.settings.themeSectionTitle}
                </h2>
                <p className="text-xs text-slate-400">{t.settings.themeSectionSub}</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 flex items-center gap-1.5 font-bold">
              {theme === 'dark' ? <Moon size={13} className="text-indigo-400" /> : <Sun size={13} className="text-amber-400" />}
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
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-blue-400">
                    <Moon size={22} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <span>{t.settings.themeDark}</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">DEFAULT</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
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
                <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start">
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
                  ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Sun size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">
                      {t.settings.themeLight}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
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
                <div className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 self-start">
                  <CheckCircle2 size={11} />
                  <span>{t.settings.themeActiveBadge}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Executive Identity & Organization */}
        <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase">
                {t.settings.profileSectionTitle}
              </h2>
              <p className="text-xs text-slate-400">{t.settings.profileSectionSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.officerName}
              </label>
              <input
                type="text"
                defaultValue="Eleanor Vance, CFA"
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.officerRole}
              </label>
              <input
                type="text"
                defaultValue={language === 'es' ? 'Vicepresidenta de Tesorería del Grupo y FP&A' : 'Group VP of Treasury & FP&A'}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.orgName}
              </label>
              <input
                type="text"
                defaultValue="Apex Global Technologies Inc."
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.baseCurrency}
              </label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
              >
                <option value="USD">USD ($) - US Dollar (Default)</option>
                <option value="EUR">EUR (€) - Eurozone</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CHF">CHF (Fr) - Swiss Franc</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Dual Control & Multi-Sig Policies */}
        <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase">
                {t.settings.governanceSectionTitle}
              </h2>
              <p className="text-xs text-slate-400">{t.settings.governanceSectionSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.dualSignThreshold}
              </label>
              <input
                type="number"
                value={dualSignThreshold}
                onChange={(e) => setDualSignThreshold(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500 font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                {t.settings.dualSignThresholdNotice}
              </p>
            </div>

            <div>
              <label className="block text-slate-400 uppercase font-semibold mb-1">
                {t.settings.refreshFrequency}
              </label>
              <select
                value={openBankingSyncInterval}
                onChange={(e) => setOpenBankingSyncInterval(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
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
              <span className="text-xs font-mono text-slate-300">
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
              <span className="text-xs font-mono text-slate-300">
                {t.settings.optFxHedging}
              </span>
            </label>
          </div>
        </div>

        {/* 4. API Keys & Webhooks */}
        <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Key size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase">
                {t.settings.apiSectionTitle}
              </h2>
              <p className="text-xs text-slate-400">{t.settings.apiSectionSub}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{t.settings.connectorSwift}</div>
                <div className="text-[10px] text-slate-400">{t.settings.connectorSwiftStatus}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                {t.settings.statusConnected}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">{t.settings.connectorPlaid}</div>
                <div className="text-[10px] text-slate-400">{t.settings.connectorPlaidStatus}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                {t.settings.statusConnected}
              </span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saveSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 size={14} />
              <span>{t.settings.saveSuccessNotice}</span>
            </span>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-900/40 transition-all cursor-pointer"
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
