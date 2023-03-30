import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  insertProduct(dto: InsertProductDTO) {
    let productId;
    const productIds: string[] = PRODUCTS.map((product) => product.productId);

    // While loop prevents productId insertion collisons
    while (1) {
      // Obtain random 8 digit hexadecimal string
      productId = CryptoJS.SHA256(new Date().toISOString())
        .toString(CryptoJS.enc.Hex)
        .slice(0, 8)
        .toString();

      if (!productIds.find((id) => id === productId)) break;
    }
    const product = {
      productId: productId,
      ...dto,
    };

    try {
      PRODUCTS.push(product);
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occurred', e);
      throw new InternalServerErrorException(
        'Unable to insert product to catalog',
      );
    }

    return { productId };
  }

  updateProduct(productId: string, dto: UpdateProductDTO) {
    let updatedProduct;

    try {
      const index = PRODUCTS.findIndex(
        (product) => product?.productId === productId,
      );

      if (index === -1) throw new BadRequestException('Invalid productId');

      updatedProduct = { ...PRODUCTS[index], ...dto };
      PRODUCTS[index] = updatedProduct;
      this.writeToFile(PRODUCTS);
    } catch (e) {
      console.log('An error has occurred', e);
      throw new InternalServerErrorException(
        'Unable to update product to catalog',
      );
    }

    return updatedProduct;
  }
}
