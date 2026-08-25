import React from 'react';
import { X, CheckCircle2, Clock, ShieldCheck, Lock, ExternalLink, ArrowLeftRight } from 'lucide-react';
import { TransactionRecord } from '../../../domain/entities/treasury.types';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export interface TransactionDetailModalProps {
  transaction: TransactionRecord | null;
  onClose: () => void;
  onCopyReference?: (ref: string) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onCopyReference,
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!transaction) return null;

  return (
    <div
      id="tx-detail-modal-overlay"
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
              {language === 'es' ? 'Detalle de Asiento Contable' : 'Ledger Transaction Details'}
            </h3>
            <p className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {transaction.referenceId}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141e33] border-[#1e2d4d]'
            }`}
          >
            <div>
              <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {language === 'es' ? 'Importe Nominal' : 'Nominal Amount'}
              </div>
              <div
                className={`text-2xl font-bold font-mono ${
                  transaction.type === 'inflow'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isLight
                    ? 'text-slate-900'
                    : 'text-white'
                }`}
              >
                {transaction.type === 'inflow' ? '+' : '-'}${transaction.amount.toLocaleString()} {transaction.currency}
              </div>
            </div>
            <span
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium border ${
                transaction.status === 'Settled'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              }`}
            >
              {transaction.status}
            </span>
          </div>

          <div
            className={`divide-y text-xs font-mono ${
              isLight ? 'divide-slate-200 border border-slate-200 rounded-xl' : 'divide-slate-800/80 border border-slate-800 rounded-xl'
            }`}
          >
            <div className="p-3 flex justify-between">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {language === 'es' ? 'Contraparte' : 'Counterparty'}
              </span>
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                {transaction.counterparty.name}
              </span>
            </div>
            <div className="p-3 flex justify-between">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {language === 'es' ? 'Entidad / Subsidiaria' : 'Subsidiary Entity'}
              </span>
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                {transaction.subsidiary}
              </span>
            </div>
            <div className="p-3 flex justify-between">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {language === 'es' ? 'Categoría de Flujo' : 'Cash Flow Category'}
              </span>
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                {transaction.category}
              </span>
            </div>
            <div className="p-3 flex justify-between">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {language === 'es' ? 'Riel de Compensación' : 'Clearing Rail'}
              </span>
              <span className="font-semibold text-blue-500 dark:text-blue-400">
                {transaction.clearingRail}
              </span>
            </div>
            <div className="p-3 flex justify-between">
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                {language === 'es' ? 'Fecha y Hora ISO' : 'Timestamp'}
              </span>
              <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                {new Date(transaction.date).toLocaleString()}
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              isLight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-blue-950/20 border-blue-900/40 text-blue-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-500" />
              <span>{language === 'es' ? 'Auditado y Reconciliado por Fundatiq SOX Core' : 'Audited & Reconciled by Fundatiq SOX Core'}</span>
            </div>
            {onCopyReference && (
              <button
                type="button"
                onClick={() => onCopyReference(transaction.referenceId)}
                className="font-mono underline text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                {language === 'es' ? 'Copiar Hash' : 'Copy Hash'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
