import { Injectable } from '@nestjs/common';
import { Log } from 'src/domain/entities/log.entity';
import { LogRepository } from 'src/domain/Repositories/log-repository.interface';
import { LogDocument, logSchemaModel } from '../schemas/log.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogPayload } from 'src/domain/interfaces/log-paylogs.interface';
import { LogType } from 'src/domain/enums/log-type.enum';

@Injectable()
export class MongoLogRepository<T extends LogPayload = LogPayload>
  implements LogRepository<T>
{
  constructor(
    @InjectModel(logSchemaModel.name)
    private readonly logModel: Model<LogDocument>,
  ) {}

  async create(log: Log<T>): Promise<Log<T>> {
    const createdLog = new this.logModel(log);
    await createdLog.save();
    return log;
  }

  async findByType(type: LogType): Promise<Log<T>[]> {
    const logs = await this.logModel.find({ type }).exec();
    return logs;
  }
}
