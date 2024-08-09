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
import { ApiTags } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageOptionsDto } from '../../core/dto/pagination.dto';
import { IdDto } from '../../core/dto/id.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.categoryService.getCategories(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() category: CreateCategoryDto) {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    return this.categoryService.delete(id);
  }

  @Post('/toggle/:id')
  toggle(@Param() { id }: IdDto) {
    return this.categoryService.toggleStatus(id);
  }
}
