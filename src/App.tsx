import React, { useState } from 'react';
import { AppLayout } from './presentation/layouts/AppLayout';
import { LandingHero } from './presentation/views/LandingHero';
import { EnterpriseLoginView } from './presentation/views/EnterpriseLoginView';
import { DashboardView } from './presentation/views/DashboardView';
import { CashFlowView } from './presentation/views/CashFlowView';
import { TransactionsView } from './presentation/views/TransactionsView';
import { BankAccountsView } from './presentation/views/BankAccountsView';
import { PredictiveRunwayView } from './presentation/views/PredictiveRunwayView';
import { ComplianceView } from './presentation/views/ComplianceView';
import { SettingsView } from './presentation/views/SettingsView';
import { NavItemKey } from './domain/entities/navigation.types';
import { useLanguage } from './presentation/context/LanguageContext';
import { useTheme } from './presentation/context/ThemeContext';
import { Home } from 'lucide-react';

export default function App() {
  // Mode: 'landing' shows Phase 1.5 Landing Hero, 'login' shows Enterprise Security Gate, 'app' shows Dashboard
  const [appMode, setAppMode] = useState<'landing' | 'login' | 'app'>('landing');
  const [currentView, setCurrentView] = useState<NavItemKey>('dashboard');
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (appMode === 'landing') {
    return (
      <LandingHero
        onGetStarted={() => setAppMode('login')}
        onExploreDemo={() => setAppMode('app')}
      />
    );
  }

  if (appMode === 'login') {
    return (
      <EnterpriseLoginView
        onLoginSuccess={() => setAppMode('app')}
        onBackToLanding={() => setAppMode('landing')}
      />
    );
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigateToSimulations={() => setCurrentView('forecast')}
            onNavigateToLedger={() => setCurrentView('transactions')}
            onInitiateTransfer={() => setCurrentView('accounts')}
          />
        );
      case 'cash-flow':
        return (
          <CashFlowView
            onNavigateToForecast={() => setCurrentView('forecast')}
            onNavigateToTransactions={() => setCurrentView('transactions')}
          />
        );
      case 'transactions':
        return <TransactionsView />;
      case 'accounts':
        return <BankAccountsView />;
      case 'forecast':
        return <PredictiveRunwayView />;
      case 'compliance':
        return <ComplianceView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            onNavigateToSimulations={() => setCurrentView('forecast')}
            onNavigateToLedger={() => setCurrentView('transactions')}
            onInitiateTransfer={() => setCurrentView('accounts')}
          />
        );
    }
  };

  return (
    <AppLayout currentView={currentView} onNavigate={setCurrentView}>
      <div className="space-y-6">
        {/* Switch back to Landing Hero Bar */}
        <div
          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-xs'
              : 'bg-[#0e1628] border-[#1b2640]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className={`font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {language === 'es' ? 'Vista Activa:' : 'Active View:'}
            </span>
            <span className={`font-semibold uppercase font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {currentView}
            </span>
          </div>
          <button
            id="view-landing-page-btn"
            onClick={() => setAppMode('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-blue-700 hover:text-blue-800'
                : 'bg-[#141f36] hover:bg-[#1a2847] border-[#233557] text-blue-400 hover:text-blue-300'
            }`}
          >
            <Home size={13} />
            <span>{t.nav.viewLandingPage || (language === 'es' ? 'Ver Landing Page (Pública)' : 'View Landing Hero (Public)')}</span>
          </button>
        </div>

        {/* Dynamic View Content */}
        {renderActiveView()}
      </div>
    </AppLayout>
  );
}


