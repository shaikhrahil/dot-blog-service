import {UseGuards} from '@nestjs/common';
import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GqlAuthGuard} from 'src/auth/jwt.strategy';
import {AppResponse} from '../dtos/app-response.dto';
import {AddBlog, BlogDTO, UpdateBlog} from '../dtos/blog.dto';
import {BlogService} from '../services/blog/blog.service';

@Resolver()
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [BlogDTO])
  async blogs(
    @Args({name: 'first', type: () => Int}) first: number,
    @Args({name: 'before', type: () => String}) before: string,
  ): Promise<BlogDTO[]> {
    const user = '';
    return await this.blogService.findBlogByUser(user, first, before);
  }

  @Query(() => BlogDTO, {
    nullable: true,
  })
  async blog(@Args({name: 'id', type: () => String}) id: string): Promise<BlogDTO> {
    return await this.blogService.findBlogById(id);
  }

  @Mutation(() => BlogDTO)
  @UseGuards(GqlAuthGuard)
  async addBlog(@Args('blog') blog: AddBlog): Promise<AddBlog> {
    const user = '';
    const res = await this.blogService.addBlog({...blog, user});
    return res;
  }

  @Mutation(() => AppResponse)
  @UseGuards(GqlAuthGuard)
  async updateBlog(@Args('blog') blog: UpdateBlog): Promise<AppResponse> {
    const res = await this.blogService.updateBlog(blog);
    if (res.ok) {
      return {
        message: `Updated blog ${JSON.stringify(res)}`,
        success: true,
      };
    }
    return {
      message: `Blog ${blog._id} not found`,
      success: false,
    };
  }

  @Mutation(() => AppResponse)
  async deleteBlog(@Args({name: 'blogId', type: () => String}) blogId: string): Promise<AppResponse> {
    const res = await this.blogService.deleteBlog(blogId);
    if (res.ok && res.deletedCount) {
      return {
        success: true,
        message: `Successfully deleted ${blogId}`,
      };
    }
    return {
      success: false,
      message: `Blog ${blogId} not found`,
    };
  }
}
