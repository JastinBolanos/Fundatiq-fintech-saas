import { ComplianceAuditItem, MultiSigApprovalRequest, SanctionCheckResult } from '../entities/compliance.types';

export interface IComplianceRepository {
  getAuditItems(): Promise<ComplianceAuditItem[]>;
  getMultiSigQueue(): Promise<MultiSigApprovalRequest[]>;
  approveMultiSigRequest(requestId: string, signerName: string, role: string): Promise<MultiSigApprovalRequest>;
  runSanctionCheck(counterpartyName: string): Promise<SanctionCheckResult>;
}
