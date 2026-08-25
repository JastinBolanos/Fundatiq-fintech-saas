export interface ComplianceAuditItem {
  id: string;
  standard: 'SOX 404' | 'Basel III LCR' | 'OFAC / AML' | 'PCI-DSS v4' | 'GDPR Financial';
  title: string;
  status: 'Compliant' | 'Pending Review' | 'Action Required';
  lastAuditedDate: string;
  auditorOrg: string;
  scorePercent: number;
  description: string;
}

export interface MultiSigApprovalRequest {
  id: string;
  referenceId: string;
  requestedBy: string;
  role: string;
  amountUSD: number;
  destinationAccount: string;
  beneficiary: string;
  purpose: string;
  requiredSignatures: number;
  currentSignatures: { signer: string; signedAt: string; role: string }[];
  status: 'Pending Signatures' | 'Executed' | 'Rejected';
  createdAt: string;
}

export interface SanctionCheckResult {
  counterparty: string;
  sanctionStatus: 'CLEARED' | 'FLAGGED' | 'MANUAL_REVIEW';
  riskScore: number;
  screeningAgency: string;
  timestamp: string;
}
