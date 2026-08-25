import { BankAccountDetail, SubsidiaryEntity, TransactionRecord, TransferRequestDTO, TransferResultDTO } from '../entities/treasury.types';

export interface ITreasuryRepository {
  getAccounts(): Promise<BankAccountDetail[]>;
  getSubsidiaries(): Promise<SubsidiaryEntity[]>;
  getTransactions(): Promise<TransactionRecord[]>;
  toggleSweepRule(accountId: string): Promise<BankAccountDetail>;
  executeTransfer(request: TransferRequestDTO): Promise<TransferResultDTO>;
}
