import { ITreasuryRepository } from '../../../domain/repositories/ITreasuryRepository';
import { TransactionRecord } from '../../../domain/entities/treasury.types';

export interface GetTransactionsFilter {
  searchTerm?: string;
  type?: 'all' | 'inflow' | 'outflow';
  status?: string;
  clearingRail?: string;
  subsidiary?: string;
}

export class GetTransactionsUseCase {
  constructor(private treasuryRepository: ITreasuryRepository) {}

  async execute(filter?: GetTransactionsFilter): Promise<TransactionRecord[]> {
    const all = await this.treasuryRepository.getTransactions();
    if (!filter) return all;

    return all.filter((tx) => {
      const matchesSearch =
        !filter.searchTerm ||
        tx.counterparty.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        tx.referenceId.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        tx.subsidiary.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(filter.searchTerm.toLowerCase());

      const matchesType = !filter.type || filter.type === 'all' || tx.type === filter.type;
      const matchesStatus = !filter.status || filter.status === 'all' || tx.status === filter.status;
      const matchesRail =
        !filter.clearingRail || filter.clearingRail === 'all' || tx.clearingRail === filter.clearingRail;
      const matchesSubsidiary =
        !filter.subsidiary || filter.subsidiary === 'all' || tx.subsidiary === filter.subsidiary;

      return matchesSearch && matchesType && matchesStatus && matchesRail && matchesSubsidiary;
    });
  }
}
