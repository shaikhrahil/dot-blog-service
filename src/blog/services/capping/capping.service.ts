import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {BlogModel} from 'blog/schemas/blog.schema'

@Injectable()
export class CappingService {
  constructor(@InjectModel(BlogModel.name) private readonly blog: Model<BlogModel>) {}

  maxBlogs = 2

  async blogLimitsReached(user: string): Promise<{noOfBlogs: number}[]> {
    return await this.blog.aggregate([{$match: {'author.authId': user}}, {$count: 'noOfBlogs'}])
  }
}
