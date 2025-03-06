import { Log } from '../entities/Log';

export interface LogRepository {
  save(log: Log): Promise<void>;
  findByService(service: string): Promise<Log[]>;
  fingdByLevel(level: string): Promise<Log[]>;
  findAll(): Promise<Log[]>;
}
