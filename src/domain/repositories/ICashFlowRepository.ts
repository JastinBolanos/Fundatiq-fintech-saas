import { CashFlowTrendPoint, KPIMetric, ChartPeriodData } from '../entities/analytics.types';

export interface ICashFlowRepository {
  getKPIMetrics(): Promise<KPIMetric[]>;
  getCashFlowTrends(): Promise<CashFlowTrendPoint[]>;
  getForecastChartData(): Promise<ChartPeriodData[]>;
}
