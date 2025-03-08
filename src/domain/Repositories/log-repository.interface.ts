import { Log } from '../entities/log.entity';
import { LogPayload } from '../interfaces/log-paylogs.interface';

export interface LogRepository<T extends LogPayload = LogPayload> {
  create(log: Log<T>): Promise<Log<T>>;
}
