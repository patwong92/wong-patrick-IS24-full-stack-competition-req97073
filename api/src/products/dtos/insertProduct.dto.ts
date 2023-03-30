import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class InsertProductDTO {
  @ApiProperty({
    description: 'The name of the product',
  })
  @IsString()
  productName: string;

  @ApiProperty({
    description: 'The name of the product owner',
  })
  @IsString()
  productOwnerName: string;

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'The name of the developer',
  })
  @IsString({ each: true })
  developers: string[];

  @ApiProperty({
    description: 'The name of the scrum master',
  })
  @IsString()
  scrumMasterName: string;

  @ApiProperty({
    description: 'The start date of the project in YYYY/MM/DD format',
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    description: 'The methodology of the project',
    enum: ['AGILE', 'WATERFALL'],
  })
  @Matches(RegExp(/^.*\b(AGILE|WATERFALL)\b.*$/))
  methodology: 'AGILE' | 'WATERFALL';
}
