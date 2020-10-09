import {Field, ID, InputType, ObjectType, PartialType} from '@nestjs/graphql';
import {CommentDTO} from './comment.dto';
import {Section, SectionArgs} from './section.dto';

@ObjectType()
export class BlogDTO {
  @Field(() => ID)
  _id?: string;

  @Field()
  user: string;

  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  published: boolean;

  // @Field(() => [Section])
  // sections: Section[];

  @Field()
  sections: string;

  @Field(() => [CommentDTO])
  comments?: CommentDTO[];

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

@InputType()
export class AddBlog {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  published: boolean;

  // @Field(() => [SectionArgs])
  // sections: SectionArgs[];

  @Field()
  sections: string;
}

@InputType()
export class UpdateBlog extends PartialType(AddBlog) {
  @Field(() => ID)
  _id: string;
}
