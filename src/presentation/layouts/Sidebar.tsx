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

interface SidebarProps {
  activeKey: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
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
  organization,
  user,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { t, language } = useLanguage();
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
      className={`relative flex flex-col h-screen select-none bg-[#0a0f1d] border-r border-[#1a2337] transition-all duration-300 z-30 ${
        isCollapsed ? 'w-[76px]' : 'w-[280px]'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 h-18 border-b border-[#1a2337]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-950/60 border border-blue-400/20 shrink-0">
            <Layers className="w-5 h-5 text-blue-100" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-white font-mono">
                  FUNDATIQ
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded">
                  SANDBOX
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-tight truncate">
                {language === 'es' ? 'Tesorería y Operaciones' : 'Treasury & Cash Ops'}
              </span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        {onToggleCollapse && !isCollapsed && (
          <button
            id="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#141c2e] transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Organization / Entity Context Selector */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-[#1a2337]/70 bg-[#0d1424]">
          <div
            id="org-switcher-trigger"
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center justify-between p-2 rounded-lg bg-[#111a2e] hover:bg-[#16223b] border border-[#1e2a42] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 shrink-0">
                <Building2 size={14} className="text-blue-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {organization.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {organization.subsidiaryCount} {language === 'es' ? 'Entidades' : 'Entities'} • {organization.baseCurrency}
                </span>
              </div>
            </div>
            <ChevronDown size={14} className="text-slate-400 shrink-0" />
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 relative group cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-950/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#121929] border border-transparent'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium tracking-tight ${
                            item.badgeVariant === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.badgeVariant === 'blue'
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                              : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-500 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Treasury Health Badge Card */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-[#1a2337]/70">
          <div className="p-3 rounded-xl bg-gradient-to-b from-[#111b30] to-[#0d1526] border border-[#1e2d4d]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'es' ? 'Liquidez Administrada' : 'Managed Liquidity'}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {language === 'es' ? 'Óptima' : 'Optimal'}
              </span>
            </div>
            <div className="text-sm font-bold text-white font-mono tracking-tight">
              $148,420,000.00
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              <span>{language === 'es' ? 'Pista: 24.8 Meses' : 'Runway: 24.8 Mos'}</span>
              <span className="text-emerald-400 font-medium">+4.2% MoM</span>
            </div>
          </div>
        </div>
      )}

      {/* User Profile & Security Footer */}
      <div className="p-3 border-t border-[#1a2337] bg-[#080c18]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600/50 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
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
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-[#141c2e] rounded-md transition-colors cursor-pointer"
            >
              <Settings size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
