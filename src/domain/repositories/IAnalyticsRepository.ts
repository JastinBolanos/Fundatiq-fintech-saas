import { ChartPeriodData, RunwayScenario } from '../entities/analytics.types';

export interface IAnalyticsRepository {
  getPredictiveChartData(): Promise<ChartPeriodData[]>;
  getRunwayScenarios(): Promise<RunwayScenario[]>;
}
