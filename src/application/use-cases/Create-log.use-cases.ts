import { Injectable } from '@nestjs/common';
import { LogRepository } from '../../domain/Repositories/log-repository.interface';
import { Log } from '../../domain/entities/log.entity';
import { LogPayload } from '../../domain/interfaces/log-paylogs.interface';
import { LogType } from 'src/domain/enums/log-type.enum';
import { MongoLogRepository } from 'src/infrastructure/repositories/mongo-log.repository';

@Injectable()
export class CreateLogUseCase<T extends LogPayload = LogPayload> {
  constructor(private readonly logRepository: MongoLogRepository<T>) {}

  async execute(
    service: string,
    payload: T,
    type: LogType,
    content: string,
  ): Promise<Log<T>> {
    const log = new Log(service, payload, type, content);
    return this.logRepository.create(log);
  }
}
