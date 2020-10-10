import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AppResponse } from '../dtos/app-response.dto';
import { AddComment, UpdateComment } from '../dtos/comment.dto';
import { CommentService } from '../services/comment/comment.service';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Mutation(() => AppResponse)
  async comment(@Args('comment') newComment: AddComment, @Args('blogId') blogId: string): Promise<AppResponse> {
    const res = await this.commentService.addComment(blogId, newComment);
    if (res.ok) {
      return {
        message: `Comment on ${blogId} successful`,
        success: true,
      };
    } else {
      return {
        message: `Something went wrong`,
        success: false,
      };
    }
  }

  @Mutation(() => AppResponse)
  async editComment(
    @Args('comment') updatedComment: UpdateComment,
    @Args('blogId') blogId: string,
  ): Promise<AppResponse> {
    const res = await this.commentService.updateComment(blogId, updatedComment);
    if (res.ok) {
      return {
        message: `Updated comment ${JSON.stringify(res)}`,
        success: true,
      };
    } else {
      return {
        message: `Comment ${updatedComment._id} not found`,
        success: false,
      };
    }
  }

  @Mutation(() => AppResponse)
  async deleteComment(@Args('commentId') commentId: string, @Args('blogId') blogId: string): Promise<AppResponse> {
    const res = await this.commentService.deleteComment(blogId, commentId);
    if (res.ok) {
      return {
        message: `Updated comment ${JSON.stringify(res)}`,
        success: true,
      };
    } else {
      return {
        message: `Comment ${commentId} not found`,
        success: false,
      };
    }
  }
}
