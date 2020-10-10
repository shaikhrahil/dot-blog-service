import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
  timestamps: true,
  strict: true,
})
export class AuthorModel extends Document {
  @Prop()
  authId: string;

  @Prop()
  name: string;

  @Prop()
  profilePic: string;
}

export const BlogSchema = SchemaFactory.createForClass(AuthorModel);
