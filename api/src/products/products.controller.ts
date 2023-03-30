import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { InsertProductDTO } from './dtos/insertProduct.dto';
import { Product } from './dtos/product.entity';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @ApiCreatedResponse({
    type: Product,
    description: 'The product has been successfully created.',
  })
  @Post()
  insertProduct(@Body() dto: InsertProductDTO) {
    return this.productsService.insertProduct(dto);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDTO) {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
