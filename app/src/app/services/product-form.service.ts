import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export abstract class ProductFormService {
  abstract setProductFormGroup(product: Product, fb: FormBuilder): FormGroup;
  abstract createHttpBody<T>(formGroup: FormGroup): T;
  abstract submit(formGroup: FormGroup): void;
}
