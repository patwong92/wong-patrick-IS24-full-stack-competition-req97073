import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InsertProductDTO } from './dtos/insertProduct.dto';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The products are successfully retrived.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'There is an issue when reading the product to the data source.',
  })
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product has been found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unable to find the product with given productId input',
  })
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid post body input. Please check your input.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'There is an issue when inserting the product to the data source.',
  })
  @Post()
  insertProduct(@Body() dto: InsertProductDTO) {
    return this.productsService.insertProduct(dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid post body input. Please check your input.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'There is an issue when updating the product to the data source.',
  })
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDTO) {
    return this.productsService.updateProduct(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'There is an issue with updating the data source.',
  })
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
