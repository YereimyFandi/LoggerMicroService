import { IsEnum } from 'class-validator';
import { LogType } from '../../domain/enums/log-type.enum';

export class FilterLogsDto {
  @IsEnum(LogType)
  type: LogType;
}
