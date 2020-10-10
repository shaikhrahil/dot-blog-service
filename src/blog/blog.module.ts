import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
// import {LikeService} from 'src/blog/services/like/like.service';
import {BlogResolver} from './resolvers/blog.resolver';
import {CommentResolver} from './resolvers/comment.resolver';
// import {LikeResolver} from './resolvers/like.resolver';
import {BlogModel, BlogSchema} from './schemas/blog.schema';
import {CommentModel, CommentSchema} from './schemas/comment.schema';
// import {Like, LikeSchema} from './schemas/like.schema';
import {BlogService} from './services/blog/blog.service';
import {CommentService} from './services/comment/comment.service';

// {name: Like.name, schema: LikeSchema},
// LikeService, LikeResolver,
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: BlogModel.name, schema: BlogSchema},
      {name: CommentModel.name, schema: CommentSchema},
    ]),
  ],
  providers: [BlogService, BlogResolver, CommentService, CommentResolver],
})
export class BlogModule {}
