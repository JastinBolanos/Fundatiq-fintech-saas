import { IAnalyticsRepository } from '../../../domain/repositories/IAnalyticsRepository';
import { RunwayScenario } from '../../../domain/entities/analytics.types';

export class SimulateScenarioUseCase {
  constructor(private analyticsRepository: IAnalyticsRepository) {}

  async execute(scenarioId: RunwayScenario['id']): Promise<RunwayScenario | undefined> {
    const scenarios = await this.analyticsRepository.getRunwayScenarios();
    return scenarios.find((s) => s.id === scenarioId);
  }
}
