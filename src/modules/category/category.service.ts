import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async delete(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
