import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { ChartPeriodData, RunwayScenario } from '../../domain/entities/analytics.types';
import { CHART_DATA } from '../mock/dashboardMockData';

export class MockAnalyticsRepository implements IAnalyticsRepository {
  private scenarios: RunwayScenario[] = [
    {
      id: 'base',
      title: 'Baseline Nominal Scenario',
      probability: 98.4,
      runwayMonths: 46.6,
      burnRateMultiplier: 1.0,
      yieldOffsetPct: 5.15,
      description: 'Standard enterprise ARR growth with calibrated OPEX controls and automated cash yield sweeps.',
    },
    {
      id: 'macro_shock',
      title: 'Macro Rate Shock (+250bps)',
      probability: 95.1,
      runwayMonths: 42.8,
      burnRateMultiplier: 1.15,
      yieldOffsetPct: 7.2,
      description: 'Interest rate escalation compensated by high-yield treasury repos and institutional reserve sweeps.',
    },
    {
      id: 'client_delay',
      title: 'Enterprise Collection Delay (60-Day)',
      probability: 92.8,
      runwayMonths: 38.4,
      burnRateMultiplier: 1.25,
      yieldOffsetPct: 4.8,
      description: 'Temporary delayed client receivables mitigated through dynamic revolving credit buffer.',
    },
    {
      id: 'aggressive_expansion',
      title: 'Aggressive Global Subsidiary Expansion',
      probability: 88.2,
      runwayMonths: 31.5,
      burnRateMultiplier: 1.8,
      yieldOffsetPct: 5.3,
      description: 'Accelerated headcount growth across APAC & EMEA subsidiaries with planned Series D capital sweep.',
    },
  ];

  async getPredictiveChartData(): Promise<ChartPeriodData[]> {
    return [...CHART_DATA];
  }

  async getRunwayScenarios(): Promise<RunwayScenario[]> {
    return [...this.scenarios];
  }
}
