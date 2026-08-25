import { ITreasuryRepository } from '../../../domain/repositories/ITreasuryRepository';
import { SubsidiaryEntity } from '../../../domain/entities/treasury.types';

export class GetSubsidiariesUseCase {
  constructor(private treasuryRepository: ITreasuryRepository) {}

  async execute(): Promise<SubsidiaryEntity[]> {
    return this.treasuryRepository.getSubsidiaries();
  }
}
