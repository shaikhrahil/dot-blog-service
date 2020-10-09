import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
// import {Section} from './section.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import {AuthorModel} from './author.schema';
import {CommentModel} from './comment.schema';

@Schema({
  timestamps: true,
  strict: true,
})
export class BlogModel extends Document {
  @Prop()
  author: AuthorModel;

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
  comments: CommentModel[];
}

export const BlogSchema = SchemaFactory.createForClass(BlogModel).plugin(mongoosePaginate);
