import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBlogDto } from '../dto/createBlog.dto';
import { UpdateBlogDto } from '../dto/updateBlog.dto';
import { Blog } from '../schema/blog.schema';
import { BlogService } from './blog.service';
@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) { }

    //Create Blog
    @UseGuards(AuthGuard())
    @Post("create")
    async create(
        @Body()
        createBlog: CreateBlogDto
    ): Promise<Blog> {
        return this.blogService.createBlog(createBlog);
    }

    //Get All Blog
    @UseGuards(AuthGuard())
    @Get("getAll")
    async getAll(
    ): Promise<Blog[]> {
        return this.blogService.getAllBlog();
    }

    //Get An Blog By id
    @UseGuards(AuthGuard())
    @Get("get/:id")
    async getBlog(
        @Param('id')
        id: string,
    ): Promise<Blog> {
        return this.blogService.getBlog(id);
    }

    //Update an Blog by Id
    @UseGuards(AuthGuard())
    @Put("update/:id")
    async updateBlog(
        @Param('id')
        id: string,
        @Body()
        updateBlogDto: UpdateBlogDto
    ): Promise<Blog> {
        return this.blogService.updateBlog(id, updateBlogDto);
    }

    //Delete an Blog by Id
    @UseGuards(AuthGuard())
    @Delete("delete/:id")
    async deleteBlog(
        @Param('id')
        id: string
    ): Promise<Blog> {
        return this.blogService.deleteBlog(id);
    }
}