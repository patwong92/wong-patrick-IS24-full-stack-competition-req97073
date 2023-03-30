import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { Product } from '../../types/product.type';
import { ProductService } from '../../services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProductService } from './edit-product.service';
import { EditProductForm } from '../../types/edit-product-form.type';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  initialProduct!: EditProductForm;
  productForm!: FormGroup;
  formIsValid$!: Observable<boolean>;
  subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private editProductService: EditProductService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.productService.currentProduct$.subscribe((product) => {
        this.productForm = this.editProductService.setProductFormGroup(
          product as Product,
          this.fb
        );
        this.initialProduct = this.productForm.value;
      })
    );

    this.formIsValid$ = this.productForm.valueChanges.pipe(
      map(
        (currentValue) =>
          this.productForm.valid &&
          !this.editProductService.compareEditProductForm(
            this.initialProduct,
            currentValue
          )
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.editProductService.submit(this.productForm);
  }
}
