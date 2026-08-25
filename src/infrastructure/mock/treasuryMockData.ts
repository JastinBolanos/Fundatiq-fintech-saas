import { BankAccount } from '../../domain/entities/cashflow.types';

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

export interface CashFlowTrendPoint {
  date: string;
  inflow: number;
  outflow: number;
  netCashFlow: number;
  closingBalance: number;
  forecast?: boolean;
}

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

export const SUBSIDIARIES_DATA: SubsidiaryEntity[] = [
  {
    id: 'sub_us_01',
    name: 'Apex US Operations Inc.',
    code: 'APEX-US',
    jurisdiction: 'Delaware, United States',
    primaryCurrency: 'USD',
    liquidityUSD: 72450000,
    monthlyBurnUSD: 1420000,
    bankAccountCount: 3,
    status: 'reconciled',
    cfoLead: 'Eleanor Vance, CFA',
  },
  {
    id: 'sub_cloud_02',
    name: 'Apex Cloud Systems LLC',
    code: 'APEX-CLOUD',
    jurisdiction: 'California, United States',
    primaryCurrency: 'USD',
    liquidityUSD: 28900000,
    monthlyBurnUSD: 850000,
    bankAccountCount: 2,
    status: 'reconciled',
    cfoLead: 'Marcus Sterling',
  },
  {
    id: 'sub_emea_03',
    name: 'Apex International EMEA Ltd.',
    code: 'APEX-EMEA',
    jurisdiction: 'London, United Kingdom',
    primaryCurrency: 'GBP',
    liquidityUSD: 21600000,
    monthlyBurnUSD: 410000,
    bankAccountCount: 2,
    status: 'reconciled',
    cfoLead: 'Charlotte Dupont',
  },
  {
    id: 'sub_eu_04',
    name: 'Apex Technologies Europe SAS',
    code: 'APEX-EU',
    jurisdiction: 'Paris, France',
    primaryCurrency: 'EUR',
    liquidityUSD: 14820000,
    monthlyBurnUSD: 290000,
    bankAccountCount: 2,
    status: 'reconciled',
    cfoLead: 'Jean-Paul Laurent',
  },
  {
    id: 'sub_apac_05',
    name: 'Apex APAC Commercial Pte.',
    code: 'APEX-APAC',
    jurisdiction: 'Singapore',
    primaryCurrency: 'SGD',
    liquidityUSD: 8250000,
    monthlyBurnUSD: 160000,
    bankAccountCount: 2,
    status: 'reconciled',
    cfoLead: 'Siddharth Nair',
  },
  {
    id: 'sub_holdings_06',
    name: 'Apex Global Treasury Reserve Ltd.',
    code: 'APEX-TREASURY',
    jurisdiction: 'Zurich, Switzerland',
    primaryCurrency: 'CHF',
    liquidityUSD: 2400000,
    monthlyBurnUSD: 50450,
    bankAccountCount: 1,
    status: 'reconciled',
    cfoLead: 'Dr. Henrik Lindqvist',
  },
];

export const CONNECTED_ACCOUNTS_DATA: BankAccountDetail[] = [
  {
    id: 'acc_jpm_01',
    institution: 'J.P. Morgan Chase Bank N.A.',
    institutionName: 'JPMorgan Chase & Co.',
    accountName: 'Master Enterprise Liquidity Concentration',
    accountNumberMask: '•••• 9402',
    ibanOrRouting: 'Routing: 021000021 / Acc: *******9402',
    country: 'United States',
    subsidiaryName: 'Apex US Operations Inc.',
    type: 'Treasury',
    currency: 'USD',
    balance: 54180000,
    availableBalance: 53950000,
    yieldRateAPY: 5.15,
    sweepEnabled: true,
    targetBalance: 50000000,
    dailyTransferLimit: 25000000,
    clearingNetworks: ['FedNow', 'CHIPS', 'Fedwire', 'ACH'],
    status: 'connected',
    lastUpdated: '2026-08-22T11:00:00Z',
  },
  {
    id: 'acc_jpm_02',
    institution: 'J.P. Morgan Chase Bank N.A.',
    institutionName: 'JPMorgan Chase & Co.',
    accountName: 'Primary OpEx & Commercial Inflows',
    accountNumberMask: '•••• 3180',
    ibanOrRouting: 'Routing: 021000021 / Acc: *******3180',
    country: 'United States',
    subsidiaryName: 'Apex US Operations Inc.',
    type: 'Operating',
    currency: 'USD',
    balance: 18270000,
    availableBalance: 18270000,
    yieldRateAPY: 4.85,
    sweepEnabled: true,
    targetBalance: 15000000,
    dailyTransferLimit: 10000000,
    clearingNetworks: ['Fedwire', 'ACH'],
    status: 'connected',
    lastUpdated: '2026-08-22T10:45:00Z',
  },
  {
    id: 'acc_svb_03',
    institution: 'Silicon Valley Bank (First Citizens)',
    institutionName: 'First Citizens Bank & Trust',
    accountName: 'Venture Capital & Hardware CapEx Pool',
    accountNumberMask: '•••• 6621',
    ibanOrRouting: 'Routing: 121140399 / Acc: *******6621',
    country: 'United States',
    subsidiaryName: 'Apex Cloud Systems LLC',
    type: 'Reserve',
    currency: 'USD',
    balance: 28900000,
    availableBalance: 28900000,
    yieldRateAPY: 5.22,
    sweepEnabled: false,
    dailyTransferLimit: 15000000,
    clearingNetworks: ['Fedwire', 'ACH Batch'],
    status: 'connected',
    lastUpdated: '2026-08-22T10:55:00Z',
  },
  {
    id: 'acc_barclays_04',
    institution: 'Barclays Corporate Bank PLC',
    institutionName: 'Barclays Bank UK',
    accountName: 'EMEA Enterprise Operations & Payroll',
    accountNumberMask: '•••• 4419',
    ibanOrRouting: 'GB82 BUKB 2000 0012 3444 19',
    country: 'United Kingdom',
    subsidiaryName: 'Apex International EMEA Ltd.',
    type: 'Operating',
    currency: 'GBP',
    balance: 16800000,
    availableBalance: 16800000,
    yieldRateAPY: 4.95,
    sweepEnabled: true,
    targetBalance: 12000000,
    dailyTransferLimit: 8000000,
    clearingNetworks: ['Faster Payments', 'CHAPS', 'SWIFT Wire'],
    status: 'connected',
    lastUpdated: '2026-08-22T10:30:00Z',
  },
  {
    id: 'acc_bnp_05',
    institution: 'BNP Paribas S.A.',
    institutionName: 'BNP Paribas Corporate',
    accountName: 'Eurozone SEPA Instant Settlement',
    accountNumberMask: '•••• 8820',
    ibanOrRouting: 'FR76 3000 4012 3456 7888 20',
    country: 'France',
    subsidiaryName: 'Apex Technologies Europe SAS',
    type: 'Operating',
    currency: 'EUR',
    balance: 13600000,
    availableBalance: 13600000,
    yieldRateAPY: 3.75,
    sweepEnabled: true,
    targetBalance: 10000000,
    dailyTransferLimit: 6000000,
    clearingNetworks: ['SEPA Instant', 'TARGET2', 'SWIFT Wire'],
    status: 'connected',
    lastUpdated: '2026-08-22T11:05:00Z',
  },
  {
    id: 'acc_ubs_06',
    institution: 'UBS Switzerland AG',
    institutionName: 'UBS Wealth & Asset Management',
    accountName: 'Global Treasury Multi-Currency Escrow',
    accountNumberMask: '•••• 1195',
    ibanOrRouting: 'CH93 0023 0230 1234 1195 0',
    country: 'Switzerland',
    subsidiaryName: 'Apex Global Treasury Reserve Ltd.',
    type: 'Escrow',
    currency: 'CHF',
    balance: 2150000,
    availableBalance: 2150000,
    yieldRateAPY: 1.85,
    sweepEnabled: false,
    dailyTransferLimit: 5000000,
    clearingNetworks: ['SIC', 'SWIFT Wire'],
    status: 'connected',
    lastUpdated: '2026-08-22T09:40:00Z',
  },
  {
    id: 'acc_dbs_07',
    institution: 'DBS Bank Ltd.',
    institutionName: 'DBS Group Singapore',
    accountName: 'APAC Regional Collection Pool',
    accountNumberMask: '•••• 7701',
    ibanOrRouting: 'DBSGSGSG / Acc: 003-901-7701',
    country: 'Singapore',
    subsidiaryName: 'Apex APAC Commercial Pte.',
    type: 'Operating',
    currency: 'SGD',
    balance: 11150000,
    availableBalance: 11150000,
    yieldRateAPY: 3.65,
    sweepEnabled: true,
    targetBalance: 8000000,
    dailyTransferLimit: 5000000,
    clearingNetworks: ['FAST', 'MEPS+', 'SWIFT Wire'],
    status: 'connected',
    lastUpdated: '2026-08-22T10:15:00Z',
  },
  {
    id: 'acc_gs_08',
    institution: 'Goldman Sachs Asset Management',
    institutionName: 'Goldman Sachs & Co.',
    accountName: 'Treasury Institutional Liquid Reserves Fund',
    accountNumberMask: '•••• 5032',
    ibanOrRouting: 'Routing: 021000089 / Fund: GS-LIQ-5032',
    country: 'United States',
    subsidiaryName: 'Apex US Operations Inc.',
    type: 'Treasury',
    currency: 'USD',
    balance: 12500000,
    availableBalance: 12500000,
    yieldRateAPY: 5.34,
    sweepEnabled: false,
    dailyTransferLimit: 20000000,
    clearingNetworks: ['Fedwire', 'DVP'],
    status: 'connected',
    lastUpdated: '2026-08-22T08:00:00Z',
  },
];

export const CASH_FLOW_TREND_DATA: CashFlowTrendPoint[] = [
  { date: '2026-08-01', inflow: 1420000, outflow: 890000, netCashFlow: 530000, closingBalance: 142400000 },
  { date: '2026-08-04', inflow: 2850000, outflow: 640000, netCashFlow: 2210000, closingBalance: 144610000 },
  { date: '2026-08-08', inflow: 980000, outflow: 1250000, netCashFlow: -270000, closingBalance: 144340000 },
  { date: '2026-08-12', inflow: 3400000, outflow: 820000, netCashFlow: 2580000, closingBalance: 146920000 },
  { date: '2026-08-15', inflow: 1150000, outflow: 1890000, netCashFlow: -740000, closingBalance: 146180000 },
  { date: '2026-08-19', inflow: 2980000, outflow: 740000, netCashFlow: 2240000, closingBalance: 148420000 },
  { date: '2026-08-23', inflow: 1850000, outflow: 920000, netCashFlow: 930000, closingBalance: 149350000, forecast: true },
  { date: '2026-08-27', inflow: 2400000, outflow: 1100000, netCashFlow: 1300000, closingBalance: 150650000, forecast: true },
  { date: '2026-08-31', inflow: 4100000, outflow: 2150000, netCashFlow: 1950000, closingBalance: 152600000, forecast: true },
];

export const COMPLIANCE_AUDIT_DATA: ComplianceAuditItem[] = [
  {
    id: 'cmp-01',
    standard: 'Basel III LCR',
    title: 'Liquidity Coverage Ratio (30-Day Stress Horizon)',
    status: 'Compliant',
    lastAuditedDate: '2026-08-20',
    auditorOrg: 'PwC Global Risk Advisory',
    scorePercent: 184, // 184% (Minimum required is 100%)
    description: 'High-Quality Liquid Assets (HQLA) exceed total net cash outflows under severe 30-day liquidity stress scenarios.',
  },
  {
    id: 'cmp-02',
    standard: 'SOX 404',
    title: 'Internal Controls on High-Value Wire Authorizations',
    status: 'Compliant',
    lastAuditedDate: '2026-08-15',
    auditorOrg: 'Deloitte & Touche LLP',
    scorePercent: 100,
    description: 'Mandatory dual cryptographic signing enforced on all outbound disbursements exceeding $500,000.00.',
  },
  {
    id: 'cmp-03',
    standard: 'OFAC / AML',
    title: 'Real-Time Global Sanctions & Watchlist Screening',
    status: 'Compliant',
    lastAuditedDate: '2026-08-22',
    auditorOrg: 'Fundatiq Automated Sanctions Engine',
    scorePercent: 100,
    description: '100% of international counterparties and beneficiary IBANs screened against US OFAC, EU, and UN registers.',
  },
  {
    id: 'cmp-04',
    standard: 'PCI-DSS v4',
    title: 'Tokenization & Encryption of Bank API Credentials',
    status: 'Compliant',
    lastAuditedDate: '2026-07-28',
    auditorOrg: 'KPMG Cyber Trust',
    scorePercent: 99.4,
    description: 'HSM-backed AES-256-GCM encryption on SWIFT Alliance Lite2 and Open Banking OAuth keys.',
  },
];

export const MULTISIG_APPROVALS_QUEUE: MultiSigApprovalRequest[] = [
  {
    id: 'sig-9021',
    referenceId: 'TX-DISB-2026-0921',
    requestedBy: 'Marcus Sterling',
    role: 'Treasury Manager, Apex Cloud',
    amountUSD: 2450000,
    destinationAccount: 'JPMorgan Chase (Operating Master)',
    beneficiary: 'Equinix Global Data Centers',
    purpose: 'Semi-Annual Global Server Colocation & Dark Fiber Lease',
    requiredSignatures: 2,
    currentSignatures: [
      {
        signer: 'Marcus Sterling',
        signedAt: '2026-08-22T08:45:00Z',
        role: 'Requester / Primary Signer',
      },
    ],
    status: 'Pending Signatures',
    createdAt: '2026-08-22T08:45:00Z',
  },
  {
    id: 'sig-9020',
    referenceId: 'TX-SWEEP-2026-0920',
    requestedBy: 'Eleanor Vance, CFA',
    role: 'Group VP Treasury',
    amountUSD: 10000000,
    destinationAccount: 'Goldman Sachs Asset Management MMF',
    beneficiary: 'GS Institutional Liquid Reserve Fund',
    purpose: 'Overnight Cash Sweep for 5.34% APY Yield Optimization',
    requiredSignatures: 2,
    currentSignatures: [
      {
        signer: 'Eleanor Vance, CFA',
        signedAt: '2026-08-22T09:15:00Z',
        role: 'VP Treasury',
      },
      {
        signer: 'Dr. Henrik Lindqvist',
        signedAt: '2026-08-22T09:30:00Z',
        role: 'Chief Risk Officer',
      },
    ],
    status: 'Executed',
    createdAt: '2026-08-22T09:00:00Z',
  },
];
