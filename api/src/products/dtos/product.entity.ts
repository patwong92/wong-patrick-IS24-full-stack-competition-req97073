import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ description: 'This is a required property' })
  productId: string;

  @ApiProperty({
    description: 'This is a required property',
  })
  productName: string;

  @ApiProperty({
    description: 'This is a required property',
  })
  productOwnerName: string;

  @ApiProperty({
    description: "An array containing the developer's first and last names",
  })
  developers: string[];

  @ApiProperty({
    description: 'First and last name of Scrum Master',
  })
  scrumMasterName: string;

  @ApiProperty({
    description: 'Value has to be in format YYYY/MM/DD',
  })
  startDate: string;

  @ApiProperty({
    description: "Value can be either 'WATERFALL' or 'AGILE'",
  })
  methodology: string;
}
