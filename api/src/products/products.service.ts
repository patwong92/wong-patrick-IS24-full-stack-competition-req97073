import { Injectable } from '@nestjs/common';
import * as PRODUCTS from '../../products.json';
import { InsertProductDTO } from './dtos/insertProduct.dto';
import { Product } from './dtos/product.entity';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private writeToFile(products: Product[]): void {
    const url = '../products.json';
    fs.writeFileSync(url, JSON.stringify(products, null, 2), 'utf8');
  }

  deleteProduct(productId: string): boolean {
    try {
      PRODUCTS.filter((product) => product.productId !== productId);
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occured', e);
      return false;
    }

    return true;
  }

  getProducts(): Product[] {
    return PRODUCTS;
  }

  insertProduct(dto: InsertProductDTO): boolean {
    try {
      PRODUCTS.push(dto as Product);
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occurred', e);
      return false;
    }

    return true;
  }

  updateProduct(dto: UpdateProductDTO): boolean {
    try {
      const index = PRODUCTS.findIndex(
        (product) => product.productId === dto.productId,
      );
      PRODUCTS[index] = { ...PRODUCTS[index], ...dto };
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occured', e);
      return false;
    }

    return true;
  }
}
