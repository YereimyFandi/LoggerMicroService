import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLogUseCase } from 'src/application/use-cases/Create-log.use-cases';
import { LogPayload } from 'src/domain/interfaces/log-paylogs.interface';
import { CreateLogDto } from 'src/shared/Dtos/create-log.dto';
import { FilterLogsDto } from 'src/shared/Dtos/filter-logs.dto';
import { Log } from 'src/domain/entities/log.entity';
import { FilterLogsByTypeUseCase } from 'src/application/use-cases/filter-log-by-type.use-case';
import { LogType } from 'src/domain/enums/log-type.enum';

@Controller('logs')
export class LogController {
  constructor(
    private readonly createLogUseCases: CreateLogUseCase<LogPayload>,
    private readonly filterLogsByTypeUseCase: FilterLogsByTypeUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLog(@Body() createLogDto: CreateLogDto<LogPayload>) {
    try {
      const log = await this.createLogUseCases.execute(
        createLogDto.service,
        createLogDto.payload,
        createLogDto.type,
        createLogDto.content,
      );
      return {
        message: 'Log created successfully',
        data: log,
      };
    } catch (error) {
      return {
        message: 'Failed to create log',
        error: error.message,
      };
    }
  }

  @Get(':type')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true })) // Validar el DTO
  async filterLogsByType(
    @Param() filterLogsDto: FilterLogsDto, // Extraer el DTO del parámetro
  ): Promise<{ message: string; data?: Log[]; error?: string }> {
    try {
      const logs = await this.filterLogsByTypeUseCase.execute(
        filterLogsDto.type,
      );

      return {
        message: 'Logs filtered successfully',
        data: logs,
      };
    } catch (error) {
      return {
        message: 'Failed to filter logs',
        error: error.message,
      };
    }
  }
}
