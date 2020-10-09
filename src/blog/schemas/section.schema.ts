import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Section extends Document {
  @Prop()
  type: string;

  @Prop()
  data: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
