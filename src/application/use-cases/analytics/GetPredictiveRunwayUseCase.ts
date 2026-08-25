import { IAnalyticsRepository } from '../../../domain/repositories/IAnalyticsRepository';
import { ChartPeriodData, RunwayScenario } from '../../../domain/entities/analytics.types';

export interface RunwayAnalysisResult {
  chartData: ChartPeriodData[];
  scenarios: RunwayScenario[];
  baselineRunwayMonths: number;
  confidenceScore: number;
}

export class GetPredictiveRunwayUseCase {
  constructor(private analyticsRepository: IAnalyticsRepository) {}

  async execute(): Promise<RunwayAnalysisResult> {
    const [chartData, scenarios] = await Promise.all([
      this.analyticsRepository.getPredictiveChartData(),
      this.analyticsRepository.getRunwayScenarios(),
    ]);

    const baseline = scenarios.find((s) => s.id === 'base') || scenarios[0];

    return {
      chartData,
      scenarios,
      baselineRunwayMonths: baseline ? baseline.runwayMonths : 46.6,
      confidenceScore: 99.4,
    };
  }
}
