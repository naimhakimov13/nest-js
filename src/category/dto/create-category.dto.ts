import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true, example: 'test' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: null })
  description: string | null;
}
