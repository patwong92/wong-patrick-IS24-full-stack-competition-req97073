import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty({ type: String, description: 'This is a required property' })
  productId: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  productName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  productOwnersName?: string;

  @ApiPropertyOptional({
    type: Array<String>,
    description: 'This is a required property',
  })
  developers?: string[];

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  scrumMasterName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  startDate?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  methodology?: string;
}
