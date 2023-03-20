import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Blog, BlogDocument } from "./schema/blog.schema";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel("Blog")
        private blogModel: mongoose.Model<BlogDocument>) { }

    async createBlog(dbBlog: Blog): Promise<Blog> {
        const blog = await this.blogModel.create(dbBlog)
        return blog;
    }
    async getAllBlog(): Promise<Blog[]> {
        const blogs = await this.blogModel.find();
        return blogs;
    }
    async getBlog(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id);
        if (!blog) {
            throw new NotFoundException('Blog not found.');
        }
        return blog;
    }
    async updateBlog(id: string, updateBlog: Blog): Promise<Blog> {
        const blog = await this.blogModel.findByIdAndUpdate(id, updateBlog);
        return blog;
    }
    async deleteBlog(id: string): Promise<any> {
        const blog = await this.blogModel.findById(id);
        if (!blog) {
            throw new NotFoundException('Blog not found.');
        }
        await this.blogModel.findByIdAndDelete(id);
        return 'Delete Blog Successfully!!!';

    }
}