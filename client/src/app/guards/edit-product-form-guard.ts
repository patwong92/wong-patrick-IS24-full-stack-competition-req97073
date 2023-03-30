import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

export const editProductFormGuard = (): Observable<boolean> => {
  const productService = inject(ProductService);
  const router = inject(Router);
  return productService.currentProduct$.pipe(
    filter((product) => product !== undefined),
    map((product) => {
      if (!product) {
        router.navigate(['']);
      }
      return true;
    })
  );
};
