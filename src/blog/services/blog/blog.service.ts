import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {PaginateModel, PaginateResult} from 'mongoose';
import {BlogDTO, UpdateBlog} from 'src/blog/dtos/blog.dto';
import {BlogModel} from 'src/blog/schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(BlogModel.name) private readonly blog: PaginateModel<BlogModel>) {}

  async addBlog(blog: BlogDTO): Promise<BlogModel> {
    const newBlog = new this.blog(blog);
    return await newBlog.save();
  }

  async findStories(first: number, pageCursor: string): Promise<PaginateResult<BlogModel>> {
    return await this.blog.paginate(
      {
        createdAt: {$lt: new Date(parseInt(Buffer.from(pageCursor, 'base64').toString() || Date.now().toString()))},
        published: true,
      },
      {
        sort: 'createdAt',
        limit: first,
      },
    );
  }

  async findBlogByUser(
    user: string,
    first: number,
    before: string,
    published = false,
  ): Promise<PaginateResult<BlogModel>> {
    return await this.blog.paginate([
      {$sort: {createdAt: 1}},
      {$match: {createdAt: {$lt: new Date(parseInt(before))}, user, published}},
      {$limit: first},
    ]);
  }

  async findBlogById(_id: string, published = false): Promise<BlogModel> {
    return await this.blog.findOne({_id, published});
  }

  async updateBlog(blog: Partial<UpdateBlog>): Promise<BlogModel> {
    return this.blog.findOneAndUpdate({_id: blog._id}, blog);
  }

  async deleteBlog(_id: string): Promise<BlogModel> {
    return this.blog.findOneAndDelete({_id});
  }
}
