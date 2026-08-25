import { ITreasuryRepository } from '../../../domain/repositories/ITreasuryRepository';
import { TransferRequestDTO, TransferResultDTO } from '../../../domain/entities/treasury.types';

export class ExecuteTransferUseCase {
  constructor(private treasuryRepository: ITreasuryRepository) {}

  async execute(request: TransferRequestDTO): Promise<TransferResultDTO> {
    if (request.amount <= 0) {
      throw new Error('Transfer amount must be greater than zero.');
    }
    if (request.sourceAccountId === request.destinationAccountId) {
      throw new Error('Source and destination accounts must be distinct.');
    }

    return this.treasuryRepository.executeTransfer(request);
  }
}
