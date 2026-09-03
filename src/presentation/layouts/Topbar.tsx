import React, { useState } from 'react';
import {
  Search,
  Bell,
  Command,
  RefreshCw,
  SlidersHorizontal,
  Download,
  Plus,
  Globe,
  CheckCircle2,
  Calendar,
  Layers,
  Menu,
  Languages,
} from 'lucide-react';
import { NavItemKey, OrganizationContext, UserProfile } from '../../domain/entities/navigation.types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface TopbarProps {
  currentView: NavItemKey;
  organization: OrganizationContext;
  user: UserProfile;
  onToggleSidebar?: () => void;
  onInitiateTransfer?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentView,
  organization,
  user,
  onToggleSidebar,
  onInitiateTransfer,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState<string | null>(null);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText(t.nav.syncedJustNow);
    }, 1000);
  };

  const getPageTitle = (key: NavItemKey) => {
    switch (key) {
      case 'dashboard':
        return t.nav.pageTitles.dashboard;
      case 'cash-flow':
        return t.nav.pageTitles.cashFlow;
      case 'transactions':
        return t.nav.pageTitles.transactions;
      case 'accounts':
        return t.nav.pageTitles.accounts;
      case 'forecast':
        return t.nav.pageTitles.forecast;
      case 'compliance':
        return t.nav.pageTitles.compliance;
      case 'settings':
        return t.nav.pageTitles.settings;
      default:
        return 'Fundatiq Treasury';
    }
  };

  const isLight = theme === 'light';

  return (
    <header
      id="fundatiq-topbar"
      className={`h-18 px-6 backdrop-blur-md border-b flex items-center justify-between sticky top-0 z-20 transition-colors ${
        isLight
          ? 'bg-white/90 border-slate-200 shadow-xs'
          : 'bg-[#090d16]/90 border-[#1a2337]'
      }`}
    >
      {/* Left: View title and breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        {onToggleSidebar && (
          <button
            id="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg lg:hidden cursor-pointer transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-400 hover:text-white hover:bg-[#141c2e]'
            }`}
          >
            <Menu size={18} />
          </button>
        )}

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className={`truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {organization.name}
            </span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>/</span>
            <span
              className={`font-medium uppercase tracking-wider text-[10px] ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {t.nav.treasuryOps}
            </span>
          </div>
          <h1
            className={`text-base font-semibold tracking-tight truncate ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {getPageTitle(currentView)}
          </h1>
        </div>
      </div>

      {/* Center: Global Search / Command Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div
          id="global-search-bar"
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-text ${
            isLight
              ? 'bg-slate-100/80 border-slate-200 text-slate-500 hover:border-slate-300 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500/30'
              : 'bg-[#0f1626] border-[#1e2a42] text-slate-400 hover:border-slate-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30'
          }`}
        >
          <Search size={14} className={isLight ? 'text-slate-400' : 'text-slate-400'} />
          <input
            type="text"
            placeholder={t.nav.searchPlaceholder}
            className={`bg-transparent border-none outline-none text-xs w-full ${
              isLight ? 'text-slate-800 placeholder-slate-400' : 'text-slate-200 placeholder-slate-400'
            }`}
          />
          <div
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-mono ${
              isLight
                ? 'bg-white border-slate-200 text-slate-500'
                : 'bg-[#162035] border-slate-700/60 text-slate-400'
            }`}
          >
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Operational Status, Actions & Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Language Toggle Button */}
        <button
          id="topbar-language-toggle-btn"
          onClick={toggleLanguage}
          title={language === 'es' ? 'Cambiar a English' : 'Switch to Spanish'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all cursor-pointer shadow-xs ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 hover:border-blue-400'
              : 'bg-[#0e1628] hover:bg-[#14203a] border-[#1c2944] hover:border-blue-500/50 text-slate-200'
          }`}
        >
          <Languages size={13} className="text-blue-500 dark:text-blue-400" />
          <span>{language === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}</span>
        </button>

        {/* Light / Dark Mode Toggle Button */}
        <button
          id="topbar-theme-toggle-btn"
          onClick={toggleTheme}
          title={
            theme === 'dark'
              ? `${t.nav.toggleThemeTooltip} (${t.nav.lightModeLabel})`
              : `${t.nav.toggleThemeTooltip} (${t.nav.darkModeLabel})`
          }
          aria-label={t.nav.toggleThemeTooltip}
          className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium whitespace-nowrap transition-all cursor-pointer shadow-xs ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-700 hover:border-slate-400'
              : 'bg-[#0e1628] hover:bg-[#14203a] border-[#1c2944] hover:border-slate-500 text-slate-200'
          }`}
        >
          <span>{theme === 'dark' ? t.nav.lightModeLabel : t.nav.darkModeLabel}</span>
        </button>

        {/* Treasury Sync Status */}
        <button
          id="treasury-sync-btn"
          onClick={handleSync}
          title={
            language === 'es'
              ? 'Activar conciliación bancaria instantánea'
              : 'Trigger instantaneous bank ledger reconciliation'
          }
          className={`hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80'
              : 'bg-[#0e1628] border-[#1c2944] text-slate-300 hover:bg-[#14203a] hover:border-slate-600'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className={`font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            {lastSyncText || (language === 'es' ? 'Sincronizado: hace 2m' : 'Synced: 2m ago')}
          </span>
          <RefreshCw
            size={12}
            className={`text-slate-400 ml-1 ${isSyncing ? 'animate-spin text-blue-500' : ''}`}
          />
        </button>

        {/* Currency & Base Rate */}
        <div
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-700'
              : 'bg-[#0e1628] border-[#1c2944] text-slate-300'
          }`}
        >
          <Globe size={12} className="text-blue-500 dark:text-blue-400" />
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>USD</span>
          <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>($)</span>
        </div>

        {/* Action Button */}
        <button
          id="initiate-transfer-btn"
          onClick={onInitiateTransfer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-900/30 transition-colors cursor-pointer"
        >
          <Plus size={14} className="stroke-[2.5]" />
          <span className="hidden sm:inline">{t.nav.newTransfer}</span>
        </button>

        {/* Notifications Icon Button */}
        <button
          id="notifications-btn"
          aria-label="View notifications"
          className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
            isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#131c2e] border-transparent hover:border-[#1e2a42]'
          }`}
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border border-white dark:border-[#090d16]" />
        </button>
      </div>
    </header>
  );
};

