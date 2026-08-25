import React, { useState } from 'react';
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Building2,
  ShieldCheck,
  ArrowLeftRight,
  X,
} from 'lucide-react';
import { TransactionRecord } from '../../domain/entities/treasury.types';
import { useTreasury } from '../hooks/useTreasury';
import { useLanguage } from '../context/LanguageContext';

export const TransactionsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { transactions } = useTreasury();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRail, setSelectedRail] = useState<string>('all');
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.counterparty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.subsidiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;
    const matchesRail = selectedRail === 'all' || tx.clearingRail === selectedRail;

    return matchesSearch && matchesType && matchesStatus && matchesRail;
  });

  const totalInflows = filteredTransactions
    .filter((tx) => tx.type === 'inflow')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOutflows = filteredTransactions
    .filter((tx) => tx.type === 'outflow')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 700);
  };

  const handleDownloadReceipt = () => {
    setShowCopiedToast(true);
    setTimeout(() => {
      setShowCopiedToast(false);
      setSelectedTx(null);
    }, 1200);
  };

  return (
    <div id="transactions-ledger-view" className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.transactions.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-mono text-blue-400 font-medium">
              <ShieldCheck size={13} className="text-blue-400" />
              <span>{language === 'es' ? 'CRIPTOGRÁFICAMENTE VERIFICADO' : 'CRYPTOGRAPHICALLY VERIFIED'}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.transactions.headerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="export-ledger-csv-btn"
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition-all cursor-pointer"
          >
            <Download size={14} className={isExporting ? 'animate-bounce text-blue-400' : ''} />
            <span>{isExporting ? (language === 'es' ? 'Exportando Paquete de Auditoría...' : 'Exporting Audit Pack...') : (language === 'es' ? 'Exportar CSV / MT940 de Auditoría' : 'Export Audit CSV / MT940')}</span>
          </button>
        </div>
      </div>

      {/* Ledger Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {language === 'es' ? 'Ingresos Totales Filtrados' : 'Filtered Total Inflows'}
            </div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              +${totalInflows.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {language === 'es' ? 'Egresos Totales Filtrados' : 'Filtered Total Outflows'}
            </div>
            <div className="text-xl font-bold text-rose-400 font-mono mt-1">
              -${totalOutflows.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <TrendingDown size={18} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {language === 'es' ? 'Total Registros Conciliados' : 'Reconciled Ledger Count'}
            </div>
            <div className="text-xl font-bold text-white font-mono mt-1">
              {filteredTransactions.length} {language === 'es' ? 'Eventos Validados' : 'Cleared Records'}
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ArrowLeftRight size={18} />
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'es' ? 'Buscar referencia, contraparte, subsidiaria o etiqueta...' : 'Search reference, counterparty, subsidiary, or tag...'}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs font-mono text-slate-200 placeholder-slate-400 outline-hidden transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Type Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800">
            {[
              { key: 'all', label: language === 'es' ? 'Todos' : 'all' },
              { key: 'inflow', label: language === 'es' ? 'Ingreso' : 'inflow' },
              { key: 'outflow', label: language === 'es' ? 'Egreso' : 'outflow' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedType(item.key as any)}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer capitalize ${
                  selectedType === item.key
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">{language === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
            <option value="Settled">{language === 'es' ? 'Liquidado' : 'Settled'}</option>
            <option value="Pending">{language === 'es' ? 'Pendiente' : 'Pending'}</option>
            <option value="Processing">{language === 'es' ? 'En Proceso' : 'Processing'}</option>
          </select>

          {/* Rail Filter */}
          <select
            value={selectedRail}
            onChange={(e) => setSelectedRail(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">{language === 'es' ? 'Todas las Redes de Compensación' : 'All Clearing Rails'}</option>
            <option value="FedNow">FedNow</option>
            <option value="SWIFT Wire">SWIFT Wire</option>
            <option value="SEPA Instant">SEPA Instant</option>
            <option value="ACH Batch">ACH Batch</option>
          </select>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/90 text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3.5 px-4">{t.transactions.tableColDescription}</th>
                <th className="py-3.5 px-4">{language === 'es' ? 'Subsidiaria' : 'Subsidiary Entity'}</th>
                <th className="py-3.5 px-4">{language === 'es' ? 'Categoría' : 'Category'}</th>
                <th className="py-3.5 px-4">{t.transactions.tableColRail}</th>
                <th className="py-3.5 px-4 text-right">{t.transactions.tableColAmount}</th>
                <th className="py-3.5 px-4 text-center">{t.transactions.tableColStatus}</th>
                <th className="py-3.5 px-4 text-center">{language === 'es' ? 'Acción' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    {language === 'es' ? 'No hay transacciones que coincidan con los criterios de filtro.' : 'No transactions match your search filter criteria.'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx: TransactionRecord) => {
                  const isInflow = tx.type === 'inflow';

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-slate-800/40 transition-colors duration-150 group cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg border ${
                              isInflow
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                            }`}
                          >
                            {isInflow ? (
                              <TrendingUp size={15} />
                            ) : (
                              <TrendingDown size={15} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                              {tx.counterparty.name}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                              <span className="text-blue-400">{tx.referenceId}</span>
                              <span>•</span>
                              <span>{tx.counterparty.accountMask}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={13} className="text-slate-400" />
                          <span>{tx.subsidiary}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        <span className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                          {tx.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-slate-300 font-medium">
                          {tx.clearingRail}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`font-bold text-sm ${
                            isInflow ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {isInflow ? '+' : '-'}
                          ${tx.amount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {tx.status === 'Settled' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                            <CheckCircle2 size={11} /> {language === 'es' ? 'Liquidado' : 'Settled'}
                          </span>
                        )}
                        {tx.status === 'Pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                            <Clock size={11} /> {language === 'es' ? 'Pendiente' : 'Pending'}
                          </span>
                        )}
                        {tx.status === 'Processing' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/25">
                            <RefreshCw size={11} className="animate-spin" /> {language === 'es' ? 'En Proceso' : 'Processing'}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTx(tx);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          {language === 'es' ? 'Detalles' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Slide-over / Modal */}
      {selectedTx && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTx(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6 font-mono text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'es' ? 'Recibo de Verificación de Auditoría' : 'Audit Verification Receipt'}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedTx.referenceId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">{language === 'es' ? 'Monto Total de la Transacción' : 'Total Transaction Amount'}</span>
                <span
                  className={`text-xl font-bold ${
                    selectedTx.type === 'inflow' ? 'text-emerald-400' : 'text-slate-100'
                  }`}
                >
                  {selectedTx.type === 'inflow' ? '+' : '-'}
                  ${selectedTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {selectedTx.currency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">{language === 'es' ? 'Contraparte' : 'Counterparty'}</div>
                  <div className="font-semibold text-white">{selectedTx.counterparty.name}</div>
                  <div className="text-slate-400 text-[10px]">{selectedTx.counterparty.accountMask}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">{language === 'es' ? 'Entidad Subsidiaria' : 'Subsidiary Entity'}</div>
                  <div className="font-semibold text-white">{selectedTx.subsidiary}</div>
                  <div className="text-slate-400 text-[10px]">{language === 'es' ? 'Fiscalmente Verificada' : 'Tax Verified Active'}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">{language === 'es' ? 'Red de Compensación' : 'Clearing Rail'}</div>
                  <div className="font-semibold text-blue-400">{selectedTx.clearingRail}</div>
                  <div className="text-slate-400 text-[10px]">{language === 'es' ? 'Finalidad Instantánea' : 'Instant Finality'}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase">{language === 'es' ? 'Estado de Liquidación' : 'Settlement Status'}</div>
                  <div className="font-semibold text-emerald-400">{selectedTx.status}</div>
                  <div className="text-slate-400 text-[10px]">{language === 'es' ? 'Conforme a ISO 20022' : 'ISO 20022 Compliant'}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                <div className="text-slate-400 text-[10px] uppercase">{language === 'es' ? 'Hash Criptográfico Multifirma' : 'Multi-Sig Cryptographic Hash'}</div>
                <div className="text-[11px] text-blue-300 break-all font-mono">
                  0x9f82c03bb3e2448bca61284d762e519208479e0018f97b5fce2a9198642a8b9f
                </div>
              </div>

              {showCopiedToast && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-semibold">
                  {language === 'es' ? '¡Recibo descargado y copiado al portapapeles!' : 'Receipt downloaded & copied to clipboard!'}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
              <button
                onClick={() => handleDownloadReceipt()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white shadow-md transition-colors cursor-pointer"
              >
                {language === 'es' ? 'Descargar Recibo PDF' : 'Download PDF Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
