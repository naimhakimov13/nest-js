import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { PageDto } from '../shared/dto/page.dto';
import { PageMetaDto } from '../shared/dto/page-meta.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async getProducts(
    pageOptions: ProductPaginationDto
  ): Promise<PageDto<Product>> {
    const { take, skip, order, search, category } = pageOptions;

    const query = this.productModel.find().sort({ createdAt: order });
    if (search) {
      query.where('$or', [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]);
    }

    if (category) {
      query.where('category').equals(category);
    }

    const products = await query.skip(skip).limit(take).exec();
    const meta = new PageMetaDto({
      itemCount: await this.productModel.countDocuments(),
      pageOptionsDto: pageOptions,
    });

    return new PageDto<Product>(products, meta);
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findOne(slug: string): Promise<Product> {
    return this.productModel.findOne({ slug }).exec();
  }

  async delete(slug: string): Promise<Product> {
    return this.productModel.findOneAndUpdate({ slug }).exec();
  }

  async update(slug: string, product: CreateProductDto): Promise<Product> {
    return this.productModel
      .findOneAndUpdate({ slug }, product, { new: true })
      .exec();
  }

  async toggleStatus(slug: string): Promise<Product> {
    const product = await this.findOne(slug);
    product.status = !product.status;
    return this.productModel.findOneAndUpdate({ slug }, product).exec();
  }
}
