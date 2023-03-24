import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { connectionName } from 'src/constants/modelName.constants';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(connectionName.Blog)
    private blogModel: mongoose.Model<BlogDocument>,
  ) {}
  /**
   * Create a new blog
   * @param dbBlog Validate properties passed in body
   * @returns Promise of blog is created from database
   */
  async createBlog(dbBlog: Blog): Promise<Blog> {
    const blog = await this.blogModel.create(dbBlog);
    return blog;
  }
  /**
   * Get all blog in database
   * @returns Promise of array blog from database
   */
  async getAllBlog(): Promise<Blog[]> {
    const blogs = await this.blogModel.find();
    return blogs;
  }
  /**
   * Get blog by blog id
   * @param id Blog Id
   * @returns Promise of querry blog from database
   */
  async getBlog(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    return blog;
  }
  /**
   * Update blog by blog id
   * @param id Blog id
   * @param updateBlog Validate properties of blog passed in body
   * @returns Promise of querry blog updated from database
   */
  async updateBlog(id: string, updateBlog: Blog): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (blog) {
      await blog.updateOne(updateBlog);
      return blog;
    } else {
      throw new NotFoundException('Blog not found.');
    }
  }
  /**
   * Delete blog by blog id
   * @param id Blog Id
   * @returns message notice blog deteled by id success
   */
  async deleteBlog(id: string): Promise<any> {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found.');
    }
    await this.blogModel.findByIdAndDelete(id);
    return 'Delete Blog Successfully!!!';
  }
}
