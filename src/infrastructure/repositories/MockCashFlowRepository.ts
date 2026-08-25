import { ICashFlowRepository } from '../../domain/repositories/ICashFlowRepository';
import { CashFlowTrendPoint, ChartPeriodData, KPIMetric } from '../../domain/entities/analytics.types';
import { CHART_DATA, KPI_METRICS } from '../mock/dashboardMockData';
import { CASH_FLOW_TREND_DATA } from '../mock/treasuryMockData';

export class MockCashFlowRepository implements ICashFlowRepository {
  async getKPIMetrics(): Promise<KPIMetric[]> {
    return [...KPI_METRICS];
  }

  async getCashFlowTrends(): Promise<CashFlowTrendPoint[]> {
    return [...CASH_FLOW_TREND_DATA];
  }

  async getForecastChartData(): Promise<ChartPeriodData[]> {
    return [...CHART_DATA];
  }
}
