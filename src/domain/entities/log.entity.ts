import { LogType } from '../enums/log-type.enum';
import { LogPayload } from '../interfaces/log-paylogs.interface';

export class Log<T extends LogPayload = LogPayload> {
  constructor(
    public readonly service: string,
    public readonly payload: T,
    public readonly type: LogType,
    public readonly content: string,
    public readonly date: Date = new Date(),
  ) {}
}
