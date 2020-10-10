import { Field, InputType, ObjectType, PartialType, ID } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id?: string;

  @Field()
  text: string;

  @Field()
  by: string;

  @Field()
  replyTo: string;

  @Field()
  pinned: boolean;
}

@InputType()
export class AddComment {
  @Field()
  text: string;

  @Field()
  by: string;

  @Field()
  replyTo: string;

  @Field()
  pinned: boolean;
}

@InputType()
export class UpdateComment extends PartialType(AddComment) {
  @Field()
  _id: string;
}
