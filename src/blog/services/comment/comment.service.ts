import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from 'src/blog/schemas/comment.schema';
import { Model, Types } from 'mongoose';
import { AddComment, UpdateComment } from 'src/blog/dtos/comment.dto';
import { Blog } from 'src/blog/schemas/blog.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Blog.name) private readonly blogSchema: Model<Blog>,
    @InjectModel(Comment.name) private readonly commentSchema: Model<Comment>,
  ) {}

  async addComment(blogId: string, comment: AddComment): Promise<any> {
    const newComment = new this.commentSchema(comment);
    const res = await this.blogSchema.updateOne({ _id: blogId }, { $push: { comments: newComment } });
    return res;
  }

  async updateComment(blogId: string, comment: UpdateComment): Promise<any> {
    const res = await this.blogSchema.updateOne(
      { _id: Types.ObjectId(blogId), 'comments._id': Types.ObjectId(comment._id) },
      { $set: { 'comments.$': { ...comment, _id: Types.ObjectId(comment._id) } } },
    );
    return res;
  }

  async deleteComment(blogId: string, commentId: string): Promise<any> {
    const res = await this.blogSchema.updateOne(
      { _id: Types.ObjectId(blogId) },
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
