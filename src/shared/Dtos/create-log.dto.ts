import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LogType } from '../../domain/enums/log-type.enum';
import { LogPayload } from '../../domain/interfaces/log-paylogs.interface';

export class CreateLogDto<T extends LogPayload = LogPayload> {
  @IsString()
  @IsNotEmpty()
  service: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  payload: T;

  @IsEnum(LogType)
  @IsNotEmpty()
  type: LogType;

  @IsString()
  @IsNotEmpty()
  content: string;
}
