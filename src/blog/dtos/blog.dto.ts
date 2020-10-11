import {Field, ID, InputType, ObjectType, PartialType} from '@nestjs/graphql';
import {AppResponse, PageInfo} from './app-response.dto';
import {Comment} from './comment.dto';
// import {Section, SectionArgs} from './section.dto';

@ObjectType()
export class Author {
  @Field()
  authId: string;

  @Field()
  name: string;

  @Field()
  profilePic: string;
}

@ObjectType()
export class BlogDTO {
  @Field(() => ID)
  _id?: string;

  @Field()
  author: Author;

  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field({nullable: true})
  cover: string;

  @Field()
  published: boolean;

  // @Field(() => [Section])
  // sections: Section[];

  @Field()
  sections: string;

  @Field(() => [Comment])
  comments?: Comment[];

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

@ObjectType()
export class Blog extends AppResponse {
  @Field(() => BlogDTO, {nullable: true})
  data: BlogDTO | null;
}

@ObjectType()
export class BlogEdge {
  @Field(() => BlogDTO)
  node: BlogDTO;

  @Field()
  cursor: String;
}

@ObjectType()
export class PaginatedBlog {
  @Field(() => [BlogEdge])
  edges: BlogEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class PaginatedBlogs extends AppResponse {
  @Field(() => PaginatedBlog, {nullable: true})
  data: PaginatedBlog | null;
}

@InputType()
export class GetBlogs {
  @Field()
  first: number;

  @Field()
  pageCursor: string;
}

@InputType()
export class GetMyBlogs extends GetBlogs {
  @Field()
  drafts: boolean;

  @Field()
  published: boolean;
}

@InputType()
export class AddBlog {
  @Field()
  username: string;

  @Field()
  profilePicture: string;

  @Field()
  cover: string;

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
