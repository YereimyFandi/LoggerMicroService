import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/Repositories/log-repository.interface';
import { Log } from '../../domain/entities/log.entity';
import { LogPayload } from 'src/domain/interfaces/log-paylogs.interface';
import { LogType } from 'src/domain/enums/log-type.enum';
import { MongoLogRepository } from 'src/infrastructure/repositories/mongo-log.repository';

@Injectable()
export class FilterLogsByTypeUseCase<T extends LogPayload = LogPayload> {
  constructor(private readonly logRepository: MongoLogRepository<T>) {}

  async execute(type: LogType): Promise<Log<T>[]> {
    return this.logRepository.findByType(type);
  }
}
