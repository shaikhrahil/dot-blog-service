import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
