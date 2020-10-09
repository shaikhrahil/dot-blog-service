import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from 'src/blog/schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private readonly likeSchema: typeof Like) {}

  async like(assetId: string, by: string): Promise<any> {
    return this.likeSchema.updateOne(
      { assetId },
      { $push: { by } },
      {
        upsert: true,
      },
    );
  }

  async unlike(assetId: string, by: string): Promise<any> {
    return this.likeSchema.updateOne({ assetId }, { $pull: { by } });
  }
}
