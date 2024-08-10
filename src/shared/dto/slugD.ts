import { ApiProperty } from '@nestjs/swagger';

export class SlugDto {
  @ApiProperty({
    name: 'slug',
    description: 'Category slug',
  })
  slug: string;
}
