import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Comment} from './comment.schema';
import {Section} from './section.schema';

@Schema({
  timestamps: true,
  strict: true,
})
export class Blog extends Document {
  @Prop()
  user: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  createdOn: string;

  @Prop()
  published: boolean;

  // @Prop([Section])
  // sections: Section[];

  @Prop()
  sections: string;

  @Prop({default: []})
  comments: Comment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
