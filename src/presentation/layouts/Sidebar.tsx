import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  ArrowLeftRight,
  Landmark,
  LineChart,
  ShieldCheck,
  Settings,
  ChevronRight,
  ChevronDown,
  Building2,
  Lock,
  Zap,
  HelpCircle,
  LogOut,
  Sparkles,
  Layers,
  ChevronLeft,
  Globe2,
} from 'lucide-react';
import { NavItemKey, OrganizationContext, UserProfile } from '../../domain/entities/navigation.types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatedLogo } from '../components/AnimatedLogo';

interface SidebarProps {
  activeKey: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
  onGoHome?: () => void;
  organization: OrganizationContext;
  user: UserProfile;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavSection {
  title?: string;
  items: {
    key: NavItemKey;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    badge?: string;
    badgeVariant?: 'blue' | 'emerald' | 'amber';
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeKey,
  onNavigate,
  onGoHome,
  organization,
  user,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const navSections: NavSection[] = [
    {
      title: t.nav.coreTreasury,
      items: [
        {
          key: 'dashboard',
          label: t.nav.dashboard,
          icon: LayoutDashboard,
        },
        {
          key: 'cash-flow',
          label: t.nav.cashFlow,
          icon: TrendingUp,
          badge: t.nav.liveBadge,
          badgeVariant: 'emerald',
        },
        {
          key: 'transactions',
          label: t.nav.transactions,
          icon: ArrowLeftRight,
          badge: '4,281',
          badgeVariant: 'blue',
        },
        {
          key: 'accounts',
          label: t.nav.bankAccounts,
          icon: Landmark,
          badge: t.nav.activeBadge,
        },
      ],
    },
    {
      title: t.nav.intelligenceRisk,
      items: [
        {
          key: 'forecast',
          label: t.nav.predictiveRunway,
          icon: LineChart,
          badge: t.nav.aiProjBadge,
          badgeVariant: 'blue',
        },
        {
          key: 'compliance',
          label: t.nav.auditCompliance,
          icon: ShieldCheck,
        },
        {
          key: 'settings',
          label: t.nav.settings,
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside
      id="fundatiq-sidebar"
      className={`relative flex flex-col h-screen select-none transition-all duration-300 z-30 ${
        isLight
          ? 'bg-white border-r border-slate-200 text-slate-900'
          : 'bg-[#0a0f1d] border-r border-[#1a2337] text-slate-100'
      } ${isCollapsed ? 'w-[76px]' : 'w-[280px]'}`}
    >
      {/* Brand Header */}
      <div
        className={`flex items-center ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
        } h-18 border-b ${
          isLight ? 'border-slate-200 bg-white' : 'border-[#1a2337] bg-[#0a0f1d]'
        }`}
      >
        <button
          type="button"
          onClick={isCollapsed ? onToggleCollapse : onGoHome}
          id="sidebar-brand-welcome-btn"
          className={`flex items-center ${
            isCollapsed ? 'justify-center w-full' : 'gap-3 overflow-hidden text-left'
          } cursor-pointer group focus:outline-hidden hover:opacity-90 transition-all`}
          title={
            isCollapsed
              ? language === 'es'
                ? 'Abrir barra lateral'
                : 'Expand sidebar'
              : language === 'es'
              ? 'Ir al inicio / Welcome'
              : 'Go to Welcome / Landing'
          }
        >
          <AnimatedLogo containerClassName="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-md shadow-blue-900/20 border border-blue-400/20 group-hover:scale-105 transition-transform" />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center">
                <span
                  className={`font-semibold text-lg tracking-tight font-mono group-hover:text-blue-500 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  FUNDATIQ
                </span>
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight truncate ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {language === 'es' ? 'Tesorería y Operaciones' : 'Treasury & Cash Ops'}
              </span>
            </div>
          )}
        </button>

        {/* Collapse Toggle Button */}
        {onToggleCollapse && !isCollapsed && (
          <button
            id="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#141c2e]'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Organization / Entity Context Selector */}
      {!isCollapsed && (
        <div
          className={`px-4 py-3 border-b ${
            isLight ? 'border-slate-200 bg-slate-50/70' : 'border-[#1a2337]/70 bg-[#0d1424]'
          }`}
        >
          <div
            id="org-switcher-trigger"
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
              isLight
                ? 'bg-white hover:bg-slate-100/80 border-slate-200/80 shadow-xs'
                : 'bg-[#111a2e] hover:bg-[#16223b] border-[#1e2a42]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${
                  isLight
                    ? 'bg-blue-50 border-blue-200/60 text-blue-600'
                    : 'bg-slate-800 border-slate-700/60 text-slate-300'
                }`}
              >
                <Building2 size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs font-semibold truncate ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
                >
                  {organization.name}
                </span>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {organization.subsidiaryCount} {language === 'es' ? 'Entidades' : 'Entities'} • {organization.baseCurrency}
                </span>
              </div>
            </div>
            <ChevronDown size={14} className={isLight ? 'text-slate-400' : 'text-slate-400'} />
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isCollapsed && (
              <div
                className={`px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase ${
                  isLight ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;

              return (
                <button
                  key={item.key}
                  id={`nav-item-${item.key}`}
                  onClick={() => onNavigate(item.key)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
                  } py-2.5 rounded-lg text-xs font-medium transition-all duration-150 relative group cursor-pointer ${
                    isActive
                      ? isLight
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/90 shadow-xs font-semibold'
                        : 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-xs shadow-blue-950/40 font-semibold'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#121929] border border-transparent'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? isLight
                          ? 'text-blue-600'
                          : 'text-blue-400'
                        : isLight
                        ? 'text-slate-500 group-hover:text-slate-800'
                        : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span
                        className={`truncate ${
                          isActive
                            ? isLight
                              ? 'text-blue-700 font-semibold'
                              : 'text-blue-400 font-semibold'
                            : isLight
                            ? 'text-slate-700 group-hover:text-slate-900'
                            : 'text-slate-300 group-hover:text-slate-100'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium tracking-tight ${
                            item.badgeVariant === 'emerald'
                              ? isLight
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.badgeVariant === 'blue'
                              ? isLight
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {isActive && (
                    <div
                      className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full ${
                        isLight ? 'bg-blue-600' : 'bg-blue-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Treasury Health Badge Card / Managed Liquidity (Cubo 2) */}
      {!isCollapsed && (
        <div
          className={`px-4 py-3 border-t ${
            isLight ? 'border-slate-200 bg-slate-50/40' : 'border-[#1a2337]/70'
          }`}
        >
          <div
            className={`p-3 rounded-xl border transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 shadow-xs'
                : 'bg-gradient-to-b from-[#111b30] to-[#0d1526] border-[#1e2d4d]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {language === 'es' ? 'Liquidez Administrada' : 'Managed Liquidity'}
              </span>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                  isLight
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {language === 'es' ? 'Óptima' : 'Optimal'}
              </span>
            </div>
            <div
              className={`text-sm font-bold font-mono tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              $148,420,000.00
            </div>
            <div
              className={`flex items-center justify-between mt-2 pt-2 border-t text-[10px] ${
                isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
              }`}
            >
              <span>{language === 'es' ? 'Pista: 24.8 Meses' : 'Runway: 24.8 Mos'}</span>
              <span className={isLight ? 'text-emerald-600 font-semibold' : 'text-emerald-400 font-medium'}>
                +4.2% MoM
              </span>
            </div>
          </div>
        </div>
      )}

      {/* User Profile & Security Footer */}
      <div
        className={`p-3 border-t ${
          isLight ? 'border-slate-200 bg-slate-50/80' : 'border-[#1a2337] bg-[#080c18]'
        }`}
      >
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'} min-w-0`}>
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${
                isLight
                  ? 'bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-gradient-to-tr from-slate-800 to-slate-700 border-slate-600/50 text-slate-200'
              }`}
              title={isCollapsed ? `${user.name} (${user.role})` : undefined}
            >
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs font-semibold truncate ${
                    isLight ? 'text-slate-900' : 'text-slate-200'
                  }`}
                >
                  {user.name}
                </span>
                <span className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {language === 'es' ? 'Vicepresidenta de Tesorería' : user.role}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              id="sidebar-user-menu-btn"
              onClick={() => onNavigate('settings')}
              title={t.nav.settings}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isLight
                  ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#141c2e]'
              }`}
            >
              <Settings size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
