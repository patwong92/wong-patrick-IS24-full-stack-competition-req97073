import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProductDTO {
  @ApiPropertyOptional({
    description: 'The name of the product',
  })
  @IsString()
  @IsOptional()
  productName?: string;

  @ApiPropertyOptional({
    description: 'The name of the product owner',
  })
  @IsString()
  @IsOptional()
  productOwnerName?: string;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    description: 'The name of the developer',
  })
  @IsString({ each: true })
  @IsOptional()
  developers?: string[];

  @ApiPropertyOptional({
    description: 'The name of the scrum master',
  })
  @IsString()
  @IsOptional()
  scrumMasterName?: string;

  @ApiPropertyOptional({
    description: 'The start date of the project in YYYY/MM/DD format',
  })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'The methodology of the project',
    enum: ['AGILE', 'WATERFALL'],
  })
  @Matches(RegExp(/^.*\b(AGILE|WATERFALL)\b.*$/))
  methodology: 'AGILE' | 'WATERFALL';
}
