import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageOptionsDto } from '../shared/dto/pagination.dto';
import { SlugDto } from '../shared/dto/slugD';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.categoryService.getCategories(pageOptionsDto);
  }

  @Get(':slug')
  findOne(@Param() { slug }: SlugDto) {
    return this.categoryService.findOne(slug);
  }

  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Patch(':slug')
  update(@Param() { slug }: SlugDto, @Body() category: CreateCategoryDto) {
    return this.categoryService.update(slug, category);
  }

  @Delete(':slug')
  delete(@Param() { slug }: SlugDto) {
    return this.categoryService.delete(slug);
  }

  @Post('/toggle/:slug')
  toggle(@Param() { slug }: SlugDto) {
    return this.categoryService.toggleStatus(slug);
  }
}
