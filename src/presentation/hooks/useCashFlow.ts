import { useState, useEffect, useCallback } from 'react';
import { useDIContainer } from '../context/DIContainerContext';
import { ConsolidatedCashFlowData } from '../../application/use-cases/cashflow';

export function useCashFlow() {
  const { getCashFlowDataUseCase } = useDIContainer();

  const [data, setData] = useState<ConsolidatedCashFlowData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCashFlowDataUseCase.execute();
      setData(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading cash flow analytics');
    } finally {
      setLoading(false);
    }
  }, [getCashFlowDataUseCase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return {
    data,
    metrics: data?.metrics || [],
    kpiMetrics: data?.metrics || [],
    trendPoints: data?.trendPoints || [],
    trendData: data?.trendPoints || [],
    forecastChartData: data?.forecastChartData || [],
    totalInflowUSD: data?.totalInflowUSD || 0,
    totalOutflowUSD: data?.totalOutflowUSD || 0,
    netPositionUSD: data?.netPositionUSD || 0,
    loading,
    isRefreshing,
    error,
    refreshData,
    refreshCashFlow: refreshData,
  };
}
