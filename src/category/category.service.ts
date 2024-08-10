import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageOptionsDto } from '../shared/dto/pagination.dto';
import { PageMetaDto } from '../shared/dto/page-meta.dto';
import { PageDto } from '../shared/dto/page.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async getCategories(pageOptions: PageOptionsDto): Promise<PageDto<Category>> {
    const { take, skip, order, search } = pageOptions;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const categories = await this.categoryModel

      .find(query)
      .sort({ name: order })
      .skip(skip)
      .limit(take)
      .exec();
    const meta = new PageMetaDto({
      itemCount: await this.categoryModel.countDocuments(query),
      pageOptionsDto: pageOptions,
    });

    return new PageDto<Category>(categories, meta);
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  async findOne(slug: string): Promise<Category> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async delete(slug: string): Promise<Category> {
    return this.categoryModel.findOneAndDelete({ slug }).exec();
  }

  async toggleStatus(slug: string): Promise<Category> {
    const category = await this.findOne(slug);
    category.status = !category.status;
    return this.categoryModel.findOneAndUpdate({ slug }, category).exec();
  }

  async update(slug: string, category: CreateCategoryDto): Promise<Category> {
    return this.categoryModel
      .findOneAndUpdate({ slug }, category, { new: true })
      .exec();
  }
}
