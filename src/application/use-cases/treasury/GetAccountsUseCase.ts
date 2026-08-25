import { ITreasuryRepository } from '../../../domain/repositories/ITreasuryRepository';
import { BankAccountDetail } from '../../../domain/entities/treasury.types';

export class GetAccountsUseCase {
  constructor(private treasuryRepository: ITreasuryRepository) {}

  async execute(): Promise<BankAccountDetail[]> {
    return this.treasuryRepository.getAccounts();
  }
}
