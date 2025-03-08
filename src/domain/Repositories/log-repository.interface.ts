import { Log } from '../entities/log.entity';
import { LogType } from '../enums/log-type.enum';
import { LogPayload } from '../interfaces/log-paylogs.interface';

export interface LogRepository<T extends LogPayload = LogPayload> {
  create(log: Log<T>): Promise<Log<T>>;
  findByType(type: LogType): Promise<Log<T>[]>;
}
