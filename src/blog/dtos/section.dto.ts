import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Section {
  @Field()
  type: string;

  @Field()
  data: string;
}

@InputType()
export class SectionArgs {
  @Field()
  type: string;

  @Field()
  data: string;
}
