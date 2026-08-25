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

export interface CashFlowTrendPoint {
  date: string;
  inflow: number;
  outflow: number;
  netCashFlow: number;
  closingBalance: number;
  forecast?: boolean;
}

export interface RunwayScenario {
  id: 'base' | 'macro_shock' | 'client_delay' | 'aggressive_expansion';
  title: string;
  probability: number;
  runwayMonths: number;
  burnRateMultiplier: number;
  yieldOffsetPct: number;
  description: string;
}
