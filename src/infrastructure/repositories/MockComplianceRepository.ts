import { IComplianceRepository } from '../../domain/repositories/IComplianceRepository';
import { ComplianceAuditItem, MultiSigApprovalRequest, SanctionCheckResult } from '../../domain/entities/compliance.types';
import { COMPLIANCE_AUDIT_DATA, MULTISIG_APPROVALS_QUEUE } from '../mock/treasuryMockData';

export class MockComplianceRepository implements IComplianceRepository {
  private auditItems: ComplianceAuditItem[] = [...COMPLIANCE_AUDIT_DATA];
  private approvalsQueue: MultiSigApprovalRequest[] = [...MULTISIG_APPROVALS_QUEUE];

  async getAuditItems(): Promise<ComplianceAuditItem[]> {
    return [...this.auditItems];
  }

  async getMultiSigQueue(): Promise<MultiSigApprovalRequest[]> {
    return [...this.approvalsQueue];
  }

  async approveMultiSigRequest(
    requestId: string,
    signerName: string,
    role: string
  ): Promise<MultiSigApprovalRequest> {
    const idx = this.approvalsQueue.findIndex((req) => req.id === requestId);
    if (idx === -1) {
      throw new Error(`Request not found: ${requestId}`);
    }

    const item = this.approvalsQueue[idx];
    const newSignatures = [
      ...item.currentSignatures,
      {
        signer: signerName,
        signedAt: new Date().toISOString(),
        role,
      },
    ];

    const isFullyApproved = newSignatures.length >= item.requiredSignatures;

    const updated: MultiSigApprovalRequest = {
      ...item,
      currentSignatures: newSignatures,
      status: isFullyApproved ? 'Executed' : 'Pending Signatures',
    };

    this.approvalsQueue[idx] = updated;
    return updated;
  }

  async runSanctionCheck(counterpartyName: string): Promise<SanctionCheckResult> {
    return {
      counterparty: counterpartyName,
      sanctionStatus: 'CLEARED',
      riskScore: 0.02,
      screeningAgency: 'OFAC / UN / EU Consolidated Watchlist Engine',
      timestamp: new Date().toISOString(),
    };
  }
}
