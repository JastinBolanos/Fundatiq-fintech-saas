import { ICashFlowRepository } from '../../../domain/repositories/ICashFlowRepository';
import { CashFlowTrendPoint, KPIMetric, ChartPeriodData } from '../../../domain/entities/analytics.types';

export interface ConsolidatedCashFlowData {
  metrics: KPIMetric[];
  trendPoints: CashFlowTrendPoint[];
  forecastChartData: ChartPeriodData[];
  totalInflowUSD: number;
  totalOutflowUSD: number;
  netPositionUSD: number;
}

export class GetCashFlowDataUseCase {
  constructor(private cashFlowRepository: ICashFlowRepository) {}

  async execute(): Promise<ConsolidatedCashFlowData> {
    const [metrics, trendPoints, forecastChartData] = await Promise.all([
      this.cashFlowRepository.getKPIMetrics(),
      this.cashFlowRepository.getCashFlowTrends(),
      this.cashFlowRepository.getForecastChartData(),
    ]);

    const totalInflowUSD = trendPoints.reduce((acc, curr) => acc + curr.inflow, 0);
    const totalOutflowUSD = trendPoints.reduce((acc, curr) => acc + curr.outflow, 0);
    const netPositionUSD = totalInflowUSD - totalOutflowUSD;

    return {
      metrics,
      trendPoints,
      forecastChartData,
      totalInflowUSD,
      totalOutflowUSD,
      netPositionUSD,
    };
  }
}
