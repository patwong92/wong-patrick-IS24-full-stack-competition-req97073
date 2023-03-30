import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AddProductService } from './add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private addProductService: AddProductService
  ) {}

  ngOnInit(): void {
    this.productService.products$.pipe(take(1)).subscribe((product) => {
      this.productForm = this.addProductService.setProductFormGroup(
        product,
        this.fb
      );
    });
  }

  get developersArray(): FormArray {
    return this.productForm.controls['developers'] as FormArray;
  }

  addDeveloperFormControl(): void {
    const developer = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.developersArray.push(developer);
  }

  removeDeveloperFormControl(index: number): void {
    this.developersArray.removeAt(index);
  }

  submit(): void {
    this.addProductService.submit(this.productForm);
  }
}
