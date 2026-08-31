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

export default function App() {
  // Mode: 'landing' shows Phase 1.5 Landing Hero, 'login' shows Enterprise Security Gate, 'app' shows Dashboard
  const [appMode, setAppMode] = useState<'landing' | 'login' | 'app'>('landing');
  const [currentView, setCurrentView] = useState<NavItemKey>('dashboard');

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
    <AppLayout
      currentView={currentView}
      onNavigate={setCurrentView}
      onGoHome={() => setAppMode('landing')}
    >
      {renderActiveView()}
    </AppLayout>
  );
}


