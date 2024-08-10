import { IsMongoId } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiPropertyOptional({
    type: String,
    description: 'product title',
    example: 'title',
    required: true,
  })
  title: string;

  @ApiPropertyOptional({
    type: String,
    description: 'product description',
    example: null,
  })
  description: string;

  slug: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'product price',
    default: 1,
  })
  price: number;

  @ApiPropertyOptional({
    type: [String],
    description: 'product images',
    default: [],
  })
  images: string[];

  @ApiPropertyOptional({
    type: Number,
    description: 'product stock',
    default: 1,
  })
  stock: number;

  @ApiPropertyOptional({
    type: String,
    description: 'category id',
    required: true,
  })
  @IsMongoId()
  category: string;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'product status',
    default: true,
  })
  status: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'product tags',
    default: [],
  })
  tags: string[];

  @ApiPropertyOptional({
    type: Number,
    description: 'product discount',
    default: 0,
  })
  discount: number;
}
