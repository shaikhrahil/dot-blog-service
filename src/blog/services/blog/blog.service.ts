import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDTO, UpdateBlog } from 'src/blog/dtos/blog.dto';
import { Blog } from 'src/blog/schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blog: Model<Blog>) {}

  async addBlog(blog: BlogDTO): Promise<Blog> {
    const newBlog = new this.blog(blog);
    return await newBlog.save();
  }

  async findBlogByUser(user: string, first: number, before: string, published = false): Promise<Blog[]> {
    return await this.blog.aggregate([
      { $sort: { createdAt: 1 } },
      { $match: { createdAt: { $lt: new Date(parseInt(before)) }, user, published } },
      { $limit: first },
    ]);
  }

  async findBlogById(_id: string, published = false): Promise<Blog> {
    return await this.blog.findOne({ _id, published });
  }

  async updateBlog(blog: Partial<UpdateBlog>): Promise<any> {
    return this.blog.update({ _id: blog._id }, <Blog>blog);
  }

  async deleteBlog(_id: string): Promise<any> {
    return this.blog.deleteOne({ _id });
  }
}
