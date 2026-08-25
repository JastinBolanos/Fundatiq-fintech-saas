import { useState, useEffect, useCallback } from 'react';
import { useDIContainer } from '../context/DIContainerContext';
import { ChartPeriodData, RunwayScenario } from '../../domain/entities/analytics.types';

export function useAnalytics() {
  const { getPredictiveRunwayUseCase, simulateScenarioUseCase } = useDIContainer();

  const [chartData, setChartData] = useState<ChartPeriodData[]>([]);
  const [scenarios, setScenarios] = useState<RunwayScenario[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<RunwayScenario['id']>('base');
  const [activeScenario, setActiveScenario] = useState<RunwayScenario | null>(null);
  const [baselineRunwayMonths, setBaselineRunwayMonths] = useState<number>(46.6);
  const [confidenceScore, setConfidenceScore] = useState<number>(99.4);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPredictiveRunwayUseCase.execute();
      setChartData(res.chartData);
      setScenarios(res.scenarios);
      setBaselineRunwayMonths(res.baselineRunwayMonths);
      setConfidenceScore(res.confidenceScore);
      const base = res.scenarios.find((s) => s.id === 'base') || res.scenarios[0];
      setActiveScenario(base);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading predictive runway analytics');
    } finally {
      setLoading(false);
    }
  }, [getPredictiveRunwayUseCase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectScenario = async (scenarioId: RunwayScenario['id']) => {
    setSelectedScenarioId(scenarioId);
    const scenario = await simulateScenarioUseCase.execute(scenarioId);
    if (scenario) {
      setActiveScenario(scenario);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return {
    chartData,
    scenarios,
    selectedScenarioId,
    activeScenario,
    baselineRunwayMonths,
    confidenceScore,
    loading,
    isRefreshing,
    error,
    selectScenario,
    refreshData,
  };
}
