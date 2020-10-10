import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class AppResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@ObjectType()
export class PageInfo {
  @Field()
  length: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPerviousPage: boolean;

  @Field()
  startCursor: string;

  @Field()
  endCursor: string;
}
