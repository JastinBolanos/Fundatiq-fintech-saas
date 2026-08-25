import { ITreasuryRepository } from '../../domain/repositories/ITreasuryRepository';
import {
  BankAccountDetail,
  SubsidiaryEntity,
  TransactionRecord,
  TransferRequestDTO,
  TransferResultDTO,
} from '../../domain/entities/treasury.types';
import { CONNECTED_ACCOUNTS_DATA, SUBSIDIARIES_DATA } from '../mock/treasuryMockData';
import { RECENT_TRANSACTIONS } from '../mock/dashboardMockData';

export class MockTreasuryRepository implements ITreasuryRepository {
  private accounts: BankAccountDetail[] = [...CONNECTED_ACCOUNTS_DATA];
  private subsidiaries: SubsidiaryEntity[] = [...SUBSIDIARIES_DATA];
  private transactions: TransactionRecord[] = [...RECENT_TRANSACTIONS];

  async getAccounts(): Promise<BankAccountDetail[]> {
    return [...this.accounts];
  }

  async getSubsidiaries(): Promise<SubsidiaryEntity[]> {
    return [...this.subsidiaries];
  }

  async getTransactions(): Promise<TransactionRecord[]> {
    return [...this.transactions];
  }

  async toggleSweepRule(accountId: string): Promise<BankAccountDetail> {
    const idx = this.accounts.findIndex((acc) => acc.id === accountId);
    if (idx === -1) {
      throw new Error(`Account not found: ${accountId}`);
    }
    const updated = {
      ...this.accounts[idx],
      sweepEnabled: !this.accounts[idx].sweepEnabled,
    };
    this.accounts[idx] = updated;
    return updated;
  }

  async executeTransfer(request: TransferRequestDTO): Promise<TransferResultDTO> {
    const sourceIdx = this.accounts.findIndex((a) => a.id === request.sourceAccountId);
    const destIdx = this.accounts.findIndex((a) => a.id === request.destinationAccountId);

    if (sourceIdx === -1 || destIdx === -1) {
      throw new Error('Invalid source or destination account ID.');
    }

    const source = this.accounts[sourceIdx];
    const dest = this.accounts[destIdx];

    if (source.availableBalance < request.amount) {
      throw new Error('Insufficient funds in source account for instant transfer.');
    }

    // Deduct and credit balances
    this.accounts[sourceIdx] = {
      ...source,
      balance: source.balance - request.amount,
      availableBalance: source.availableBalance - request.amount,
    };

    this.accounts[destIdx] = {
      ...dest,
      balance: dest.balance + request.amount,
      availableBalance: dest.availableBalance + request.amount,
    };

    const refId = `REF-FDQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const txId = `tx-${Date.now()}`;

    // Record new transaction in ledger
    const newTx: TransactionRecord = {
      id: txId,
      referenceId: refId,
      date: new Date().toISOString(),
      counterparty: {
        name: `${dest.institutionName} (${dest.accountName})`,
        accountMask: dest.accountNumberMask,
        entityType: 'financial_institution',
      },
      subsidiary: source.subsidiaryName,
      category: 'Treasury Yield & Repo',
      type: 'outflow',
      amount: request.amount,
      currency: source.currency,
      status: 'Settled',
      clearingRail: request.clearingRail || 'FedNow',
    };

    this.transactions.unshift(newTx);

    return {
      success: true,
      transactionId: txId,
      referenceId: refId,
      dispatchedAt: new Date().toISOString(),
      message: `Multi-sig transfer of $${request.amount.toLocaleString()} dispatched successfully via ${request.clearingRail || 'FedNow'}.`,
      updatedSourceBalance: this.accounts[sourceIdx].balance,
      updatedDestBalance: this.accounts[destIdx].balance,
    };
  }
}
