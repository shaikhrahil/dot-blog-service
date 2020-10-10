import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  strict: true,
})
export class CommentModel extends Document {
  @Prop()
  text: string;

  @Prop()
  by: string;

  @Prop()
  replyTo: string;

  @Prop()
  pinned: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
