import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slugify from 'slugify';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: null })
  image: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  parent_id: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});

CategorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Category;
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});
