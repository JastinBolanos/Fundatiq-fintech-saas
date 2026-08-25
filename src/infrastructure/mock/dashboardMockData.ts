export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  delta: number;
  deltaPercent: string;
  deltaDirection: 'positive' | 'negative' | 'neutral';
  timeframeLabel: string;
  category: 'liquidity' | 'burn' | 'runway' | 'settlement';
  subtext: string;
}

export interface ChartPeriodData {
  period: string;
  monthLabel: string;
  historicalLiquidity: number | null;
  predictedRunway: number | null;
  burnRateEstimated: number;
  confidenceScore?: number;
  scenarioNotes?: string;
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

export const KPI_METRICS: KPIMetric[] = [
  {
    id: 'kpi-liquidity',
    label: 'Total Consolidated Liquidity',
    value: 148420000,
    formattedValue: '$148,420,000.00',
    delta: 11520000,
    deltaPercent: '+8.4%',
    deltaDirection: 'positive',
    timeframeLabel: 'vs prior 30d',
    category: 'liquidity',
    subtext: '12 Connected Multi-Currency Pools',
  },
  {
    id: 'kpi-burn',
    label: 'Monthly Net Burn Rate',
    value: 3180450,
    formattedValue: '$3,180,450.00',
    delta: -138200,
    deltaPercent: '-4.2%',
    deltaDirection: 'negative',
    timeframeLabel: 'MoM OpEx optimization',
    category: 'burn',
    subtext: 'OpEx, CapEx & Subsidiary Payroll',
  },
  {
    id: 'kpi-runway',
    label: '30-Day Simulated Runway',
    value: 46.6,
    formattedValue: '46.6 Months',
    delta: 2.8,
    deltaPercent: '+2.8 Mo',
    deltaDirection: 'positive',
    timeframeLabel: 'model confidence 99.4%',
    category: 'runway',
    subtext: 'Monte Carlo Stress-Tested Horizon',
  },
  {
    id: 'kpi-settlement',
    label: 'Pending Settlement Pool',
    value: 12640890,
    formattedValue: '$12,640,890.00',
    delta: 14,
    deltaPercent: '14 Batches',
    deltaDirection: 'neutral',
    timeframeLabel: 'clearing < 4 hrs',
    category: 'settlement',
    subtext: 'FedNow, SEPA & SWIFT Wire Inbound',
  },
];

export const CHART_DATA: ChartPeriodData[] = [
  {
    period: '2025-09',
    monthLabel: 'Sep 25',
    historicalLiquidity: 118450000,
    predictedRunway: null,
    burnRateEstimated: 2950000,
    scenarioNotes: 'Q3 Enterprise Ledger Baseline',
  },
  {
    period: '2025-10',
    monthLabel: 'Oct 25',
    historicalLiquidity: 124800000,
    predictedRunway: null,
    burnRateEstimated: 3100000,
    scenarioNotes: 'Series C Capital Sweep Active',
  },
  {
    period: '2025-11',
    monthLabel: 'Nov 25',
    historicalLiquidity: 131250000,
    predictedRunway: null,
    burnRateEstimated: 3050000,
    scenarioNotes: 'EMEA Subsidiary Consolidation',
  },
  {
    period: '2025-12',
    monthLabel: 'Dec 25',
    historicalLiquidity: 138600000,
    predictedRunway: null,
    burnRateEstimated: 3400000,
    scenarioNotes: 'Fiscal Year-End Treasury Lock',
  },
  {
    period: '2026-01',
    monthLabel: 'Jan 26',
    historicalLiquidity: 142100000,
    predictedRunway: null,
    burnRateEstimated: 3150000,
    scenarioNotes: 'Global ARR Upgrades Inflow',
  },
  {
    period: '2026-02',
    monthLabel: 'Feb 26',
    historicalLiquidity: 148420000,
    predictedRunway: 148420000,
    burnRateEstimated: 3180000,
    confidenceScore: 99.8,
    scenarioNotes: 'Latest Reconciled Multi-Entity Ledger',
  },
  {
    period: '2026-03',
    monthLabel: 'Mar 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 153900000,
    burnRateEstimated: 3220000,
    confidenceScore: 99.4,
    scenarioNotes: 'Enterprise SaaS Annual Upgrades Collection',
  },
  {
    period: '2026-04',
    monthLabel: 'Apr 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 159800000,
    burnRateEstimated: 3300000,
    confidenceScore: 98.1,
    scenarioNotes: 'Q2 Tax & Treasury Yield Balancing',
  },
  {
    period: '2026-05',
    monthLabel: 'May 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 166450000,
    burnRateEstimated: 3380000,
    confidenceScore: 96.7,
    scenarioNotes: 'Projected Series Extension Sweep',
  },
  {
    period: '2026-06',
    monthLabel: 'Jun 26 (P)',
    historicalLiquidity: null,
    predictedRunway: 174200000,
    burnRateEstimated: 3450000,
    confidenceScore: 95.2,
    scenarioNotes: 'APAC Subsidiary Commercial Inflow',
  },
];

export const RECENT_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-894102',
    referenceId: 'REF-FDQ-2026-8941',
    date: '2026-08-22T10:14:00Z',
    counterparty: {
      name: 'Stripe Payments Enterprise',
      accountMask: '•• 9042',
      entityType: 'customer',
    },
    subsidiary: 'Apex US Operations Inc.',
    category: 'Customer ARR Collection',
    type: 'inflow',
    amount: 1485200.0,
    currency: 'USD',
    status: 'Settled',
    clearingRail: 'FedNow',
  },
  {
    id: 'tx-894101',
    referenceId: 'REF-FDQ-2026-8940',
    date: '2026-08-22T09:48:00Z',
    counterparty: {
      name: 'Amazon Web Services Inc. (AWS)',
      accountMask: '•• 3118',
      entityType: 'vendor',
    },
    subsidiary: 'Apex Cloud Systems LLC',
    category: 'SaaS & Cloud Infra',
    type: 'outflow',
    amount: 342150.0,
    currency: 'USD',
    status: 'Settled',
    clearingRail: 'ACH Batch',
  },
  {
    id: 'tx-894100',
    referenceId: 'REF-FDQ-2026-8939',
    date: '2026-08-22T08:30:00Z',
    counterparty: {
      name: 'J.P. Morgan Treasury Yield Fund',
      accountMask: '•• 7720',
      entityType: 'financial_institution',
    },
    subsidiary: 'Apex Global Holdings Ltd.',
    category: 'Treasury Yield & Repo',
    type: 'inflow',
    amount: 624800.0,
    currency: 'USD',
    status: 'Settled',
    clearingRail: 'SWIFT Wire',
  },
  {
    id: 'tx-894099',
    referenceId: 'REF-FDQ-2026-8938',
    date: '2026-08-22T07:15:00Z',
    counterparty: {
      name: 'Deel Global Payroll Services',
      accountMask: '•• 5519',
      entityType: 'payroll',
    },
    subsidiary: 'Apex International EMEA',
    category: 'Global Payroll',
    type: 'outflow',
    amount: 890400.0,
    currency: 'USD',
    status: 'Processing',
    clearingRail: 'SEPA Instant',
  },
  {
    id: 'tx-894098',
    referenceId: 'REF-FDQ-2026-8937',
    date: '2026-08-21T18:40:00Z',
    counterparty: {
      name: 'Google Cloud Platform (GCP)',
      accountMask: '•• 4291',
      entityType: 'vendor',
    },
    subsidiary: 'Apex Cloud Systems LLC',
    category: 'SaaS & Cloud Infra',
    type: 'outflow',
    amount: 185600.0,
    currency: 'USD',
    status: 'Settled',
    clearingRail: 'ACH Batch',
  },
  {
    id: 'tx-894097',
    referenceId: 'REF-FDQ-2026-8936',
    date: '2026-08-21T16:20:00Z',
    counterparty: {
      name: 'Salesforce Enterprise Systems',
      accountMask: '•• 6802',
      entityType: 'vendor',
    },
    subsidiary: 'Apex US Operations Inc.',
    category: 'SaaS & Cloud Infra',
    type: 'outflow',
    amount: 142000.0,
    currency: 'USD',
    status: 'Pending',
    clearingRail: 'ACH Batch',
  },
  {
    id: 'tx-894096',
    referenceId: 'REF-FDQ-2026-8935',
    date: '2026-08-21T14:05:00Z',
    counterparty: {
      name: 'BlackRock Liquidity Master Portfolio',
      accountMask: '•• 1104',
      entityType: 'financial_institution',
    },
    subsidiary: 'Apex Global Holdings Ltd.',
    category: 'Treasury Yield & Repo',
    type: 'inflow',
    amount: 2150000.0,
    currency: 'USD',
    status: 'Settled',
    clearingRail: 'SWIFT Wire',
  },
  {
    id: 'tx-894095',
    referenceId: 'REF-FDQ-2026-8934',
    date: '2026-08-21T11:30:00Z',
    counterparty: {
      name: 'Deloitte Tax & Regulatory Advisory',
      accountMask: '•• 8823',
      entityType: 'vendor',
    },
    subsidiary: 'Apex Global Technologies Inc.',
    category: 'Tax & Compliance',
    type: 'outflow',
    amount: 95000.0,
    currency: 'USD',
    status: 'Pending',
    clearingRail: 'FedNow',
  },
];
