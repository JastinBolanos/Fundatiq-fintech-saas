import { ITreasuryRepository } from '../../../domain/repositories/ITreasuryRepository';
import { BankAccountDetail } from '../../../domain/entities/treasury.types';

export class ToggleSweepUseCase {
  constructor(private treasuryRepository: ITreasuryRepository) {}

  async execute(accountId: string): Promise<BankAccountDetail> {
    return this.treasuryRepository.toggleSweepRule(accountId);
  }
}
