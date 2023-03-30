import { Injectable } from '@nestjs/common';
import * as PRODUCTS from '../../products.json';
import { InsertProductDTO } from './dtos/insertProduct.dto';
import { Product } from './dtos/product.entity';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import * as fs from 'fs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ProductsService {
  private writeToFile(products: Product[]): void {
    const url = 'products.json';
    fs.writeFileSync(url, JSON.stringify(products, null, 2), 'utf8');
  }

  deleteProduct(productId: string): boolean {
    try {
      PRODUCTS.filter((product) => product.productId !== productId);
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occured', e);
      throw Error(e);
    }

    return true;
  }

  getProducts(): Product[] {
    return PRODUCTS;
  }

  insertProduct(dto: InsertProductDTO): boolean {
    try {
      let generatedProductId;
      const productIds: string[] = PRODUCTS.map((product) => product.productId);

      while (1) {
        generatedProductId = CryptoJS.SHA256(new Date().toISOString())
          .toString(CryptoJS.enc.Hex)
          .slice(0, 8)
          .toString();

        if (!productIds.find((id) => id === generatedProductId)) break;
      }
      const product = {
        productId: generatedProductId,
        ...dto,
      };

      PRODUCTS.push(product);
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occurred', e);
      throw Error(e);
    }

    return true;
  }

  updateProduct(productId: string, dto: UpdateProductDTO): boolean {
    try {
      const index = PRODUCTS.findIndex(
        (product) => product?.productId === productId,
      );

      if (index < 0) throw Error('Invalid productId');

      PRODUCTS[index] = { ...PRODUCTS[index], ...dto };
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occured', e);
      throw e;
    }

    return true;
  }
}
