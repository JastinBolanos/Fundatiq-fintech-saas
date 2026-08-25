import { BankAccount } from './cashflow.types';

export interface SubsidiaryEntity {
  id: string;
  name: string;
  code: string;
  jurisdiction: string;
  primaryCurrency: 'USD' | 'EUR' | 'GBP' | 'SGD' | 'CHF';
  liquidityUSD: number;
  monthlyBurnUSD: number;
  bankAccountCount: number;
  status: 'active' | 'reconciled' | 'audit_pending';
  cfoLead: string;
}

export interface BankAccountDetail extends BankAccount {
  institutionName: string;
  accountName: string;
  ibanOrRouting: string;
  country: string;
  subsidiaryName: string;
  yieldRateAPY?: number;
  sweepEnabled: boolean;
  targetBalance?: number;
  dailyTransferLimit: number;
  clearingNetworks: string[];
}

export interface TransactionRecord {
  id: string;
  referenceId: string;
  date: string;
  counterparty: {
    name: string;
    accountMask: string;
    logoKey?: string;
    entityType: 'vendor' | 'customer' | 'financial_institution' | 'payroll';
  };
  subsidiary: string;
  category: 'SaaS & Cloud Infra' | 'Customer ARR Collection' | 'Treasury Yield & Repo' | 'Global Payroll' | 'Tax & Compliance' | 'Hardware & CapEx';
  type: 'inflow' | 'outflow';
  amount: number;
  currency: string;
  status: 'Settled' | 'Pending' | 'Processing' | 'Flagged';
  clearingRail: 'FedNow' | 'SWIFT Wire' | 'SEPA Instant' | 'ACH Batch';
}

export interface TransferRequestDTO {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  purpose: string;
  clearingRail?: 'FedNow' | 'SWIFT Wire' | 'SEPA Instant' | 'ACH Batch';
}

export interface TransferResultDTO {
  success: boolean;
  transactionId: string;
  referenceId: string;
  dispatchedAt: string;
  message: string;
  updatedSourceBalance: number;
  updatedDestBalance: number;
}
