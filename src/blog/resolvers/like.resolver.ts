import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { LikeService } from 'blog/services/like/like.service';
import { AppResponse } from '../dtos/app-response.dto';

@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => AppResponse)
  async like(@Args({ name: 'assetId' }) assetId: string, @Args({ name: 'by' }) by: string): Promise<AppResponse> {
    const res = await this.likeService.like(assetId, by);
    if (res.ok) {
      return {
        message: `Liked ${assetId} successfully`,
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
  async unlike(@Args({ name: 'assetId' }) assetId: string, @Args({ name: 'by' }) by: string): Promise<AppResponse> {
    const res = await this.likeService.unlike(assetId, by);
    if (res.ok) {
      return {
        message: `Unliked ${assetId} successfully`,
        success: true,
      };
    } else {
      return {
        message: `Something went wrong`,
        success: false,
      };
    }
  }
}
