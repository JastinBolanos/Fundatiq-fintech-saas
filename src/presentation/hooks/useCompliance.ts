import { useState, useEffect, useCallback } from 'react';
import { useDIContainer } from '../context/DIContainerContext';
import { ComplianceAuditItem, MultiSigApprovalRequest } from '../../domain/entities/compliance.types';

export function useCompliance() {
  const { getComplianceAuditUseCase, getMultiSigQueueUseCase, approveMultiSigUseCase } =
    useDIContainer();

  const [auditItems, setAuditItems] = useState<ComplianceAuditItem[]>([]);
  const [multiSigQueue, setMultiSigQueue] = useState<MultiSigApprovalRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [items, queue] = await Promise.all([
        getComplianceAuditUseCase.execute(),
        getMultiSigQueueUseCase.execute(),
      ]);
      setAuditItems(items);
      setMultiSigQueue(queue);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading compliance audits');
    } finally {
      setLoading(false);
    }
  }, [getComplianceAuditUseCase, getMultiSigQueueUseCase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const approveRequest = async (requestId: string, signerName: string, role: string) => {
    try {
      const updated = await approveMultiSigUseCase.execute(requestId, signerName, role);
      setMultiSigQueue((prev) => prev.map((item) => (item.id === requestId ? updated : item)));
      return updated;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to approve multi-sig request');
      throw err;
    }
  };

  return {
    auditItems,
    auditFrameworks: auditItems,
    multiSigQueue,
    approvalsQueue: multiSigQueue,
    loading,
    isRefreshing,
    error,
    refreshData,
    approveRequest,
    signApprovalRequest: approveRequest,
  };
}
