import { LogLevel } from '../value-objects/LogLevel';

export class Log {
  constructor(
    public readonly id: string,
    public readonly service: string,
    public readonly level: LogLevel,
    public readonly message: string,
    public readonly timestamp: Date,
    public readonly metadata?: Record<string, any>,
  ) {}

  static create(
    service: string,
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
  ): Log {
    if (!service || !message) {
      throw new Error('El servicio y el mensajee son obligatorios');
    }
    return new Log(
      crypto.randomUUID(),
      service,
      level,
      message,
      new Date(),
      metadata,
    );
  }
}
