import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DemoBanner } from '../components/DemoBanner';
import { NavItemKey, OrganizationContext, UserProfile } from '../../domain/entities/navigation.types';
import { useTheme } from '../context/ThemeContext';

interface AppLayoutProps {
  currentView: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
  onGoHome?: () => void;
  organization?: OrganizationContext;
  user?: UserProfile;
  children: React.ReactNode;
}

const DEFAULT_ORG: OrganizationContext = {
  id: 'org_apex_01',
  name: 'Apex Global Technologies Inc.',
  baseCurrency: 'USD',
  subsidiaryCount: 6,
  fiscalYearEnd: 'Dec 31',
  lastSyncedAt: '2026-08-22T10:30:00Z',
};

const DEFAULT_USER: UserProfile = {
  id: 'usr_cfo_09',
  name: 'Eleanor Vance, CFA',
  email: 'e.vance@apexglobal.corp',
  role: 'Group VP of Treasury & FP&A',
  organization: 'Apex Global Technologies Inc.',
  tier: 'Enterprise',
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentView,
  onNavigate,
  onGoHome,
  organization = DEFAULT_ORG,
  user = DEFAULT_USER,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      id="fundatiq-app-root"
      className={`min-h-screen flex overflow-hidden transition-colors ${
        isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#090d16] text-slate-100'
      }`}
    >
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeKey={currentView}
          onNavigate={onNavigate}
          onGoHome={onGoHome}
          organization={organization}
          user={user}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="w-[280px] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeKey={currentView}
              onNavigate={(key) => {
                onNavigate(key);
                setMobileSidebarOpen(false);
              }}
              onGoHome={() => {
                if (onGoHome) onGoHome();
                setMobileSidebarOpen(false);
              }}
              organization={organization}
              user={user}
              isCollapsed={false}
            />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar
          currentView={currentView}
          organization={organization}
          user={user}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main
          id="fundatiq-main-canvas"
          className={`flex-1 overflow-y-auto p-6 lg:p-8 transition-colors ${
            isLight
              ? 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50'
              : 'bg-gradient-to-b from-[#090d16] via-[#0b101c] to-[#090d16]'
          }`}
        >
          <div className="max-w-[1600px] mx-auto w-full space-y-6">
            <DemoBanner personaName={user.name} />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
