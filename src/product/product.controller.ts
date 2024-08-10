import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SlugDto } from '../shared/dto/slugD';
import { ProductPaginationDto } from './dto/product-pagination.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() pageOptionsDto: ProductPaginationDto) {
    return this.productService.getProducts(pageOptionsDto);
  }

  @Get(':slug')
  findOne(@Query() { slug }: SlugDto) {
    return this.productService.findOne(slug);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('/toggle/:slug')
  toggleStatus(@Query() { slug }: SlugDto) {
    return this.productService.toggleStatus(slug);
  }

  @Patch(':slug')
  update(
    @Query() { slug }: SlugDto,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.update(slug, createProductDto);
  }

  @Post(':slug')
  delete(@Query() { slug }: SlugDto) {
    return this.productService.delete(slug);
  }
}
