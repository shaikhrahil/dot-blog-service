import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from 'src/blog/services/like/like.service';
import { BlogResolver } from './resolvers/blog.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { LikeResolver } from './resolvers/like.resolver';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Like, LikeSchema } from './schemas/like.schema';
import { BlogService } from './services/blog/blog.service';
import { CommentService } from './services/comment/comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [BlogService, BlogResolver, LikeService, LikeResolver, CommentService, CommentResolver],
})
export class BlogModule {}
