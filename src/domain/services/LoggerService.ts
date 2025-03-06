import { Log } from '../entities/Log';
import { LogRepository } from '../repositories/LogRepository';
import { LogLevel } from '../value-objects/LogLevel';

export class LoggerService {
  constructor(private logRepository: LogRepository) {}

  async Log(
    service: string,
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
  ): Promise<void> {
    const log = Log.create(service, level, message, metadata);
    await this.logRepository.save(log);
  }

  async getLogsByService(service: string): Promise<Log[]> {
    return await this.logRepository.findByService(service);
  }
}
