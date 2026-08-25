import { useState, useEffect, useCallback } from 'react';
import { useDIContainer } from '../context/DIContainerContext';
import {
  BankAccountDetail,
  SubsidiaryEntity,
  TransactionRecord,
  TransferRequestDTO,
  TransferResultDTO,
} from '../../domain/entities/treasury.types';

export function useTreasury() {
  const {
    getAccountsUseCase,
    getSubsidiariesUseCase,
    getTransactionsUseCase,
    executeTransferUseCase,
    toggleSweepUseCase,
  } = useDIContainer();

  const [accounts, setAccounts] = useState<BankAccountDetail[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryEntity[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [accs, subs, txs] = await Promise.all([
        getAccountsUseCase.execute(),
        getSubsidiariesUseCase.execute(),
        getTransactionsUseCase.execute(),
      ]);
      setAccounts(accs);
      setSubsidiaries(subs);
      setTransactions(txs);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error loading treasury data');
    } finally {
      setLoading(false);
    }
  }, [getAccountsUseCase, getSubsidiariesUseCase, getTransactionsUseCase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const toggleSweep = async (accountId: string) => {
    try {
      const updated = await toggleSweepUseCase.execute(accountId);
      setAccounts((prev) => prev.map((acc) => (acc.id === accountId ? updated : acc)));
      return updated;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to toggle sweep rule');
      throw err;
    }
  };

  const transferFunds = async (request: TransferRequestDTO): Promise<TransferResultDTO> => {
    try {
      const result = await executeTransferUseCase.execute(request);
      await loadData(); // refresh balances and transactions
      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Transfer execution failed');
      throw err;
    }
  };

  const totalConcentrationUSD = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return {
    accounts,
    subsidiaries,
    transactions,
    loading,
    isRefreshing,
    error,
    totalConcentrationUSD,
    refreshData,
    toggleSweep,
    transferFunds,
  };
}
