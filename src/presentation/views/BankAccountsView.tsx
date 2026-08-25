import React, { useState } from 'react';
import {
  Landmark,
  Building2,
  CheckCircle2,
  RefreshCw,
  Zap,
  Percent,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { BankAccountDetail } from '../../domain/entities/treasury.types';
import { useTreasury } from '../hooks/useTreasury';
import { useLanguage } from '../context/LanguageContext';

export const BankAccountsView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    accounts,
    totalConcentrationUSD,
    isRefreshing,
    refreshData,
    toggleSweep,
    transferFunds,
  } = useTreasury();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Transfer Form State
  const [transferSource, setTransferSource] = useState(accounts[0]?.id || 'acc_jpm_01');
  const [transferDest, setTransferDest] = useState(accounts[1]?.id || 'acc_jpm_02');
  const [transferAmount, setTransferAmount] = useState('2500000');
  const [transferPurpose, setTransferPurpose] = useState(
    language === 'es'
      ? 'Barrido Operativo y Fondeo de Nómina'
      : 'Operating Sweep & Payroll Funding'
  );
  const [isExecutingTransfer, setIsExecutingTransfer] = useState(false);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState<string | null>(null);

  const handleRefresh = async () => {
    await refreshData();
  };

  const handleToggleSweep = async (accId: string) => {
    await toggleSweep(accId);
  };

  const handleExecuteTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecutingTransfer(true);
    try {
      await transferFunds({
        sourceAccountId: transferSource,
        destinationAccountId: transferDest,
        amount: Number(transferAmount),
        purpose: transferPurpose,
        clearingRail: 'FedNow',
      });
      setTransferSuccessMsg(
        language === 'es'
          ? `¡Transferencia multifirma de $${Number(transferAmount).toLocaleString()} despachada con éxito vía FedNow sin comisiones!`
          : `Multi-sig transfer of $${Number(transferAmount).toLocaleString()} dispatched successfully via FedNow with zero fees!`
      );
      setTimeout(() => {
        setTransferSuccessMsg(null);
        setIsTransferModalOpen(false);
      }, 1800);
    } catch {
      // Fallback
    } finally {
      setIsExecutingTransfer(false);
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.subsidiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.ibanOrRouting.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCurrency = selectedCurrency === 'all' || acc.currency === selectedCurrency;
    const matchesType = selectedType === 'all' || acc.type === selectedType;

    return matchesSearch && matchesCurrency && matchesType;
  });

  return (
    <div id="bank-accounts-management-view" className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.bankAccounts.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.bankAccounts.activeFeeds}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.bankAccounts.headerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="accounts-refresh-btn"
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title={language === 'es' ? 'Actualizar feeds bancarios' : 'Refresh bank account feeds'}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? 'animate-spin text-blue-400' : ''}
            />
          </button>

          <button
            id="open-transfer-modal-btn"
            onClick={() => setIsTransferModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
          >
            <Zap size={14} />
            <span>{t.bankAccounts.transferSweepBtn}</span>
          </button>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.bankAccounts.kpi1Title}
            </div>
            <div className="text-2xl font-black text-blue-400 font-mono mt-1">
              ${(totalConcentrationUSD / 1000000).toFixed(2)}M
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.bankAccounts.kpi1Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Landmark size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.bankAccounts.kpi2Title}
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              5.18% APY
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.bankAccounts.kpi2Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Percent size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.bankAccounts.kpi3Title}
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {accounts.filter((a) => a.sweepEnabled).length} {language === 'es' ? 'Activas' : 'Enabled'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.bankAccounts.kpi3Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Zap size={22} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.bankAccounts.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-mono text-slate-200 placeholder-slate-400 outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">{t.bankAccounts.allCurrencies}</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SGD">SGD (S$)</option>
            <option value="CHF">CHF (Fr)</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">{t.bankAccounts.allTypes}</option>
            <option value="Treasury">{language === 'es' ? 'Tesorería' : 'Treasury'}</option>
            <option value="Operating">{language === 'es' ? 'Operativa' : 'Operating'}</option>
            <option value="Reserve">{language === 'es' ? 'Reserva' : 'Reserve'}</option>
            <option value="Escrow">{language === 'es' ? 'Fideicomiso / Escrow' : 'Escrow'}</option>
          </select>
        </div>
      </div>

      {/* Connected Accounts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAccounts.map((acc: BankAccountDetail) => (
          <div
            key={acc.id}
            id={acc.id}
            className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 shadow-xl transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-blue-400">
                    <Landmark size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {acc.institution}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>{acc.accountName}</span>
                      <span>•</span>
                      <span className="text-blue-400">{acc.accountNumberMask}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {acc.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/25">
                    {acc.currency}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">{t.bankAccounts.availableLiquidity}</div>
                  <div className="text-2xl font-black text-white mt-0.5">
                    ${acc.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                {acc.yieldRateAPY && (
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">{t.bankAccounts.yieldAPY}</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      +{acc.yieldRateAPY}%
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>{t.bankAccounts.entityOwner}</span>
                  <span className="text-slate-200 font-semibold">{acc.subsidiaryName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.bankAccounts.routingIban}</span>
                  <span className="text-slate-300">{acc.ibanOrRouting}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t.bankAccounts.clearingRails}</span>
                  <span className="text-blue-400">{acc.clearingNetworks.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSweep(acc.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    acc.sweepEnabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {acc.sweepEnabled ? t.bankAccounts.autoSweepOn : t.bankAccounts.autoSweepOff}
                </button>
              </div>

              <button
                onClick={() => {
                  setTransferSource(acc.id);
                  setIsTransferModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
              >
                <span>{t.bankAccounts.dispatchTransfer}</span>
                <Zap size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer & Sweep Funds Modal */}
      {isTransferModalOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setIsTransferModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6 font-mono text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.bankAccounts.modalTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.bankAccounts.modalSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {transferSuccessMsg ? (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400 animate-bounce" />
                <div className="font-bold text-sm">{t.bankAccounts.execSuccessTitle}</div>
                <p className="text-xs text-emerald-300">{transferSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleExecuteTransfer} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 uppercase font-semibold mb-1">
                    {t.bankAccounts.sourcePool}
                  </label>
                  <select
                    value={transferSource}
                    onChange={(e) => setTransferSource(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.institution} - {a.accountName} (${(a.availableBalance / 1000000).toFixed(1)}M)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-semibold mb-1">
                    {t.bankAccounts.destinationPool}
                  </label>
                  <select
                    value={transferDest}
                    onChange={(e) => setTransferDest(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.institution} - {a.accountName} ({a.currency})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase font-semibold mb-1">
                      {t.bankAccounts.transferAmountUsd}
                    </label>
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      required
                      min="1000"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase font-semibold mb-1">
                      {language === 'es' ? 'Red de Compensación' : 'Clearing Rail'}
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 font-semibold flex items-center gap-1.5">
                      <Zap size={14} />
                      <span>{t.bankAccounts.railSelected}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-semibold mb-1">
                    {t.bankAccounts.treasuryMemo}
                  </label>
                  <input
                    type="text"
                    value={transferPurpose}
                    onChange={(e) => setTransferPurpose(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:border-blue-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>{t.bankAccounts.multiSigNotice}</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsTransferModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
                  >
                    {t.bankAccounts.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    disabled={isExecutingTransfer}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isExecutingTransfer ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{t.bankAccounts.signingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Zap size={14} />
                        <span>{t.bankAccounts.authorizeBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
