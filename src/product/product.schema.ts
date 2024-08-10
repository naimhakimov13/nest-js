import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import slugify from 'slugify';

import { Category } from '../category/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, autoIndex: true })
export class Product {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ default: null })
  description: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: 0 })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: 0 })
  discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }

  next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Product;
  if (update.title) {
    update.slug = slugify(update.title, { lower: true });
  }
  next();
});
