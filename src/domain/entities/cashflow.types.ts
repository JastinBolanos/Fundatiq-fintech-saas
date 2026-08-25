export interface MetricDelta {
  value: number;
  percentage: number;
  direction: 'up' | 'down' | 'neutral';
  timeframe: string;
}

export interface CashMetric {
  id: string;
  label: string;
  value: number;
  currency: string;
  delta: MetricDelta;
  category: 'liquidity' | 'burn' | 'inflow' | 'outflow' | 'runway';
  status?: 'optimal' | 'warning' | 'critical' | 'neutral';
}

export interface BankAccount {
  id: string;
  institution: string;
  accountNumberMask: string;
  type: 'Operating' | 'Treasury' | 'Payroll' | 'Reserve' | 'Escrow';
  currency: string;
  balance: number;
  availableBalance: number;
  status: 'connected' | 'syncing' | 'error';
  lastUpdated: string;
}
