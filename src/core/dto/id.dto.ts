import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdDto {
  @ApiProperty({
    name: 'id',
    description: 'Category id',
  })
  @IsMongoId()
  id: string;
}
