import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ type: String, description: 'This is a required property' })
  productId: string;

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
    description: "An array containing the developer's first and last names",
  })
  developers: string[];

  @ApiProperty({
    type: String,
    description: 'First and last name of Scrum Master',
  })
  scrumMasterName: string;

  @ApiProperty({
    type: String,
    description: 'Value has to be in format YYYY/MM/DD',
  })
  startDate: string;

  @ApiProperty({
    type: String,
    description: "Value can be either 'WATERFALL' or 'AGILE'",
  })
  methodology: string;
}
