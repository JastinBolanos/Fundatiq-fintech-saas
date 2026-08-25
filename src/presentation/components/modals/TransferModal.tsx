import React, { useState } from 'react';
import { X, ArrowLeftRight, CheckCircle2, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { BankAccountDetail, TransferRequestDTO } from '../../../domain/entities/treasury.types';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: BankAccountDetail[];
  onExecuteTransfer: (request: TransferRequestDTO) => Promise<unknown>;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  accounts,
  onExecuteTransfer,
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [sourceId, setSourceId] = useState<string>(accounts[0]?.id || '');
  const [destId, setDestId] = useState<string>(accounts[1]?.id || '');
  const [amount, setAmount] = useState<string>('2500000');
  const [purpose, setPurpose] = useState<string>(
    language === 'es' ? 'Barrido Operativo y Fondeo de Nómina' : 'Operating Sweep & Payroll Funding'
  );
  const [clearingRail, setClearingRail] = useState<'FedNow' | 'SWIFT Wire' | 'SEPA Instant' | 'ACH Batch'>('FedNow');
  const [isExecuting, setIsExecuting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);
    setErrorMsg(null);

    try {
      await onExecuteTransfer({
        sourceAccountId: sourceId,
        destinationAccountId: destId,
        amount: Number(amount),
        purpose,
        clearingRail,
      });

      setSuccessMsg(
        language === 'es'
          ? `¡Transferencia multifirma de $${Number(amount).toLocaleString()} despachada con éxito vía ${clearingRail} sin comisiones!`
          : `Multi-sig transfer of $${Number(amount).toLocaleString()} dispatched successfully via ${clearingRail} with zero fees!`
      );

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1600);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error executing transfer');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div
      id="transfer-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0f172a] border-[#1e293b] text-white'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <ArrowLeftRight size={20} />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {language === 'es' ? 'Transferencia Institucional Instantánea' : 'Instant Enterprise Transfer'}
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {language === 'es' ? 'Despacho automatizado multicurrency y multi-entidad' : 'Multi-currency & multi-entity automated dispatch'}
            </p>
          </div>
        </div>

        {successMsg ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 size={40} className="text-emerald-500 mx-auto animate-bounce" />
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{successMsg}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className={`text-xs font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {language === 'es' ? 'Cuenta Origen' : 'Source Account'}
              </label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-[#1e293b] border-slate-700 text-white focus:border-blue-500'
                }`}
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.institution} • {acc.accountNumberMask} (${acc.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {language === 'es' ? 'Cuenta Destino' : 'Destination Account'}
              </label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-[#1e293b] border-slate-700 text-white focus:border-blue-500'
                }`}
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} disabled={acc.id === sourceId}>
                    {acc.institution} • {acc.accountNumberMask} (${acc.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className={`text-xs font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {language === 'es' ? 'Monto (USD)' : 'Amount (USD)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold transition-colors ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-[#1e293b] border-slate-700 text-white focus:border-blue-500'
                  }`}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {language === 'es' ? 'Riel de Liquidación' : 'Clearing Rail'}
                </label>
                <select
                  value={clearingRail}
                  onChange={(e) => setClearingRail(e.target.value as any)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-[#1e293b] border-slate-700 text-white focus:border-blue-500'
                  }`}
                >
                  <option value="FedNow">FedNow Instant (24/7)</option>
                  <option value="SWIFT Wire">SWIFT Wire (Global)</option>
                  <option value="SEPA Instant">SEPA Instant (€)</option>
                  <option value="ACH Batch">ACH Same-Day</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-mono font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {language === 'es' ? 'Propósito / Concepto' : 'Purpose / Concept'}
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-[#1e293b] border-slate-700 text-white focus:border-blue-500'
                }`}
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`w-1/2 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
              >
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isExecuting}
                className="w-1/2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isExecuting ? (
                  <span>{language === 'es' ? 'Despachando...' : 'Dispatching...'}</span>
                ) : (
                  <>
                    <Zap size={14} />
                    <span>{language === 'es' ? 'Ejecutar Transferencia' : 'Execute Transfer'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
