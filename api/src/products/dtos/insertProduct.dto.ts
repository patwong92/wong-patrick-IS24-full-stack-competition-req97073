import { ApiProperty } from '@nestjs/swagger';

export class InsertProductDTO {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  productName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  productOwnersName: string;

  @ApiProperty({
    type: Array<String>,
    description: 'This is a required property',
  })
  developers: string[];

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  scrumMasterName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  startDate: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  methodology: string;
}
