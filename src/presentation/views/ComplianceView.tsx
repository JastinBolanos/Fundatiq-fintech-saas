import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Download,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { ComplianceAuditItem } from '../../domain/entities/compliance.types';
import { useCompliance } from '../hooks/useCompliance';
import { useLanguage } from '../context/LanguageContext';

export const ComplianceView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    approvalsQueue,
    auditFrameworks,
    signApprovalRequest,
  } = useCompliance();

  const [isExportingAudit, setIsExportingAudit] = useState(false);
  const [signedSuccessId, setSignedSuccessId] = useState<string | null>(null);

  const handleSignRequest = async (id: string) => {
    setSignedSuccessId(id);
    const signerName = language === 'es' ? 'Eleanor Vance, CFA (Tú)' : 'Eleanor Vance, CFA (You)';
    const roleName = language === 'es' ? 'VP de Tesorería de Grupo (Firmante Dual)' : 'Group VP Treasury (Dual Signer)';

    await signApprovalRequest(id, signerName, roleName);
    setTimeout(() => {
      setSignedSuccessId(null);
    }, 400);
  };

  const handleExportAuditPackage = () => {
    setIsExportingAudit(true);
    setTimeout(() => {
      setIsExportingAudit(false);
    }, 800);
  };

  return (
    <div id="audit-compliance-view" className="space-y-8 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              {t.compliance.headerTitle}
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-medium">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>{t.compliance.regulatoryPassed}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {t.compliance.headerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="export-soc2-audit-pack-btn"
            onClick={handleExportAuditPackage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 transition-all cursor-pointer"
          >
            <Download size={14} className={isExportingAudit ? 'animate-bounce text-blue-400' : ''} />
            <span>{isExportingAudit ? t.compliance.compilingAuditPkg : t.compliance.downloadAuditPkg}</span>
          </button>
        </div>
      </div>

      {/* Top Regulatory Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.compliance.kpi1Title}
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              184% LCR
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.compliance.kpi1Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.compliance.kpi2Title}
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {approvalsQueue.filter((q) => q.status === 'Pending Signatures').length} {language === 'es' ? 'Requeridas' : 'Required'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.compliance.kpi2Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lock size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">
              {t.compliance.kpi3Title}
            </div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              0 Hits / 100% {language === 'es' ? 'Limpio' : 'Cleared'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">{t.compliance.kpi3Sub}</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* 1. Multi-Signature Dual Control Authorizations Queue */}
      <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{t.compliance.multiSigTitle}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {language === 'es' ? 'Bandeja en Vivo' : 'Live Queue'}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {t.compliance.multiSigSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {approvalsQueue.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    {req.purpose}
                  </span>
                  <span className="text-xs text-blue-400 font-semibold">
                    ${req.amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                  </span>
                  {req.status === 'Pending Signatures' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/25">
                      {t.compliance.awaitingSignatures}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                      <CheckCircle2 size={10} /> {t.compliance.fullyExecuted}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>
                    <strong className="text-slate-300">{t.compliance.beneficiaryLabel}</strong> {req.beneficiary} • <strong className="text-slate-300">{t.compliance.destinationLabel}</strong> {req.destinationAccount}
                  </div>
                  <div>
                    <strong className="text-slate-300">{t.compliance.signaturesLabel}</strong>{' '}
                    {req.currentSignatures.map((s) => `${s.signer} (${s.role})`).join(' • ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {req.status === 'Pending Signatures' ? (
                  <button
                    onClick={() => handleSignRequest(req.id)}
                    disabled={signedSuccessId === req.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    {signedSuccessId === req.id ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{t.compliance.signingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        <span>{t.compliance.signBtn}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>{t.compliance.sealedBadge}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Global Compliance & Regulatory Audits Table */}
      <div className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800/80 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              {t.compliance.frameworkTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.compliance.frameworkSubtitle}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/30">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/80 text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3 px-4">{t.compliance.colStandard}</th>
                <th className="py-3 px-4">{t.compliance.colFocus}</th>
                <th className="py-3 px-4">{t.compliance.colAuditor}</th>
                <th className="py-3 px-4 text-center">{t.compliance.colScore}</th>
                <th className="py-3 px-4 text-center">{t.compliance.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {auditFrameworks.map((item: ComplianceAuditItem) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <FileCheck size={15} className="text-blue-400" />
                      <span>{item.standard}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {item.auditorOrg}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-400">
                    {item.scorePercent}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 size={11} /> {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
