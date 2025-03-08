import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLogUseCase } from 'src/application/use-cases/Create-log.use-cases';
import { LogPayload } from 'src/domain/interfaces/log-paylogs.interface';
import { CreateLogDto } from 'src/shared/Dtos/create-log.dto';

@Controller('logs')
export class LogController {
  constructor(
    private readonly createLogUseCases: CreateLogUseCase<LogPayload>,
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
}
