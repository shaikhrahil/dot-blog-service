import {UseGuards} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {GqlAuthGuard} from 'src/auth/jwt.strategy'
import {CurrentUser} from 'src/decorators/current-user.decorator'
import {PageInfo} from '../dtos/app-response.dto'
import {AddBlog, Blog, GetBlogs, GetMyBlogs, PaginatedBlogs, UpdateBlog} from '../dtos/blog.dto'
import {BlogService} from '../services/blog/blog.service'

@Resolver()
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  // public

  @Query(() => PaginatedBlogs)
  async stories(@Args({name: 'filters', type: () => GetBlogs}) filters: GetBlogs): Promise<PaginatedBlogs> {
    try {
      const blogs = await this.blogService.findStories(filters.first, filters.pageCursor)
      if (blogs && blogs.docs && blogs.docs.length) {
        const lastRecord = blogs.docs[blogs.docs.length - 1]
        const lastDate = lastRecord.createdAt
        const endCursor = Buffer.from(lastDate).toString('base64')
        const pageInfo: PageInfo = {
          length: blogs.limit,
          endCursor: Buffer.from(blogs.docs[blogs.docs.length - 1].createdAt).toString('base64'),
          startCursor: Buffer.from(blogs.docs[0].createdAt).toString('base64'),
          hasNextPage: blogs.hasNextPage,
          hasPerviousPage: blogs.hasPrevPage,
        }
        return {
          data: {
            edges: blogs.docs.map(node => ({
              node,
              cursor: Buffer.from(node.createdAt).toString('base64'),
            })),
            pageInfo,
          },
          success: true,
          message: 'Blogs found successfully',
        }
      }
      return {data: null, success: false, message: 'No blogs found'}
    } catch (e) {
      return {message: e.message, success: false, data: null}
    }
  }

  @Query(() => Blog, {nullable: true})
  async story(@Args({name: 'id', type: () => String}) id: string): Promise<Blog> {
    try {
      const data = await this.blogService.findBlogById(id)
      if (data) {
        return {data, message: 'Blog found', success: true}
      }
      return {data: null, message: 'Blog Not found', success: false}
    } catch (e) {
      return {data: null, message: e, success: false}
    }
  }

  // admin

  @Mutation(() => Blog)
  @UseGuards(GqlAuthGuard)
  async addBlog(@Args('blog') blog: AddBlog, @CurrentUser() authId: string): Promise<Blog> {
    try {
      const data = await this.blogService.addBlog({
        ...blog,
        author: {
          authId,
          name: blog.username,
          profilePic: blog.profilePicture,
        },
      })
      if (data) {
        return {data, message: 'Blog added successfully', success: true}
      } else {
        return {data: null, message: 'Unable to add Blog', success: false}
      }
    } catch (e) {
      return {data: null, message: e, success: false}
    }
  }

  @Query(() => PaginatedBlogs)
  @UseGuards(GqlAuthGuard)
  async myBlogs(
    @Args({name: 'filters', type: () => GetMyBlogs}) filters: GetMyBlogs,
    @CurrentUser() user: string,
  ): Promise<PaginatedBlogs> {
    try {
      if (!filters.drafts && !filters.published) {
        return {
          data: null,
          success: false,
          message: 'No blogs found',
        }
      }
      const blogs = await this.blogService.findBlogByUser(user, filters)
      if (blogs && blogs.docs && blogs.docs.length) {
        const pageInfo: PageInfo = {
          length: blogs.limit,
          endCursor: Buffer.from(new Date(blogs.docs[blogs.docs.length - 1].createdAt).getTime().toString()).toString(
            'base64',
          ),
          startCursor: Buffer.from(new Date(blogs.docs[0].createdAt).getTime().toString()).toString('base64'),
          hasNextPage: blogs.hasNextPage,
          hasPerviousPage: blogs.hasPrevPage,
        }
        return {
          data: {edges: blogs.docs.map(node => ({node, cursor: node._id})), pageInfo},
          success: true,
          message: 'Blogs found successfully',
        }
      }
      return {data: null, success: false, message: 'No Blogs found'}
    } catch (e) {
      return {success: false, message: e, data: null}
    }
  }

  @Query(() => Blog, {nullable: true})
  @UseGuards(GqlAuthGuard)
  async myBlog(@Args({name: 'id', type: () => String}) id: string, @CurrentUser() user: string): Promise<Blog> {
    try {
      const data = await this.blogService.findBlogById(id, user)
      if (data) {
        return {data, success: true, message: 'Blog found successfully'}
      }
      return {data: null, success: false, message: 'Blog not found'}
    } catch (e) {
      return {message: e, success: false, data: null}
    }
  }

  @Mutation(() => Blog)
  @UseGuards(GqlAuthGuard)
  async updateBlog(@Args('blog') blog: UpdateBlog, @CurrentUser() user: any): Promise<Blog> {
    try {
      const data = await this.blogService.updateBlog(blog)
      if (data) {
        return {message: `Updated blog ${blog._id}`, success: true, data}
      }
      return {message: `Blog ${blog._id} not found`, success: false, data: null}
    } catch (e) {
      return {message: e, success: false, data: null}
    }
  }

  @Mutation(() => Blog)
  @UseGuards(GqlAuthGuard)
  async deleteBlog(
    @Args({name: 'blogId', type: () => String}) blogId: string,
    @CurrentUser() user: string,
  ): Promise<Blog> {
    try {
      const data = await this.blogService.deleteBlog(blogId)
      if (data) {
        return {success: true, message: `Successfully deleted ${blogId}`, data}
      }
      return {success: false, message: `Blog ${blogId} not found`, data: null}
    } catch (e) {
      return {success: false, message: e, data: null}
    }
  }
}
