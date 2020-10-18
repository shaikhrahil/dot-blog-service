import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {AddComment, UpdateComment} from 'blog/dtos/comment.dto';
import {BlogModel} from 'blog/schemas/blog.schema';
import {CommentModel} from 'blog/schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(BlogModel.name) private readonly blogSchema: Model<BlogModel>,
    @InjectModel(CommentModel.name) private readonly commentSchema: Model<CommentModel>,
  ) {}

  async addComment(blogId: string, comment: AddComment): Promise<any> {
    const newComment = new this.commentSchema(comment);
    const res = await this.blogSchema.updateOne({_id: blogId}, {$push: {comments: newComment}});
    return res;
  }

  async updateComment(blogId: string, comment: UpdateComment): Promise<any> {
    const res = await this.blogSchema.updateOne(
      {_id: Types.ObjectId(blogId), 'comments._id': Types.ObjectId(comment._id)},
      {$set: {'comments.$': {...comment, _id: Types.ObjectId(comment._id)}}},
    );
    return res;
  }

  async deleteComment(blogId: string, commentId: string): Promise<any> {
    const res = await this.blogSchema.updateOne(
      {_id: Types.ObjectId(blogId)},
      {
        $pull: {
          comments: {
            _id: Types.ObjectId(commentId),
          },
        },
      },
    );
    return res;
  }
}
