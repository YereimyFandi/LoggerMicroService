import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LogType } from 'src/domain/enums/log-type.enum';

@Schema({ collection: 'logs' })
export class logSchemaModel extends Document {
  @Prop({ required: true }) service: string;

  @Prop({ required: true, type: Object }) payload: any;

  @Prop({ required: true, enum: LogType }) type: LogType;

  @Prop({ required: true }) content: string;

  @Prop({ default: Date.now }) date: Date;
}

export const LogSchema = SchemaFactory.createForClass(logSchemaModel);
export type LogDocument = logSchemaModel & Document;
