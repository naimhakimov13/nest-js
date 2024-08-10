import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageOptionsDto } from '../../shared/dto/pagination.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class ProductPaginationDto extends PageOptionsDto {
  @ApiPropertyOptional({
    required: false,
  })
  @IsOptional()
  @IsMongoId({ each: true })
  category?: string;
}
