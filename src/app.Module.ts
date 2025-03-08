import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoLogRepository } from './infrastructure/repositories/mongo-log.repository';
import { LogSchema, logSchemaModel } from './infrastructure/schemas/log.schema';
import { LogController } from './infrastructure/controllers/log.controllers';
import { CreateLogUseCase } from './application/use-cases/Create-log.use-cases';
import { FilterLogsByTypeUseCase } from './application/use-cases/filter-log-by-type.use-case';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yereimyfandino01:AsLuSlDP3ADmF4TJ@cluster0.aofg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([
      { name: logSchemaModel.name, schema: LogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [MongoLogRepository, CreateLogUseCase, FilterLogsByTypeUseCase],
})
export class AppModule {}
