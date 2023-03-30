import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullName } from '../../types/full-name.type';
import { Product } from '../../types/product.type';
import { ProductFormService } from '../../services/product-form.service';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, concatMap, take } from 'rxjs';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AddProductService extends ProductFormService {
  constructor(
    private appService: AppService,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  createHttpBody<AddProductForm>(formGroup: FormGroup): AddProductForm {
    const scrumMasterName = `${
      (formGroup.controls['scrumMasterName'] as FormGroup).controls['firstName']
        .value
    } ${
      (formGroup.controls['scrumMasterName'] as FormGroup).controls['lastName']
        .value
    }`;
    const productOwnerName = `${
      (formGroup.controls['productOwnerName'] as FormGroup).controls[
        'firstName'
      ].value
    } ${
      (formGroup.controls['productOwnerName'] as FormGroup).controls['lastName']
        .value
    }`;
    const developers = (
      formGroup.controls['developers'] as FormArray
    ).value.map(
      (developer: FullName) => `${developer.firstName} ${developer.lastName}`
    );
    const productName = formGroup.controls['productName'].value;
    const methodology = formGroup.controls['methodology'].value;
    const startDate = formGroup.controls['startDate'].value;

    return {
      productName,
      scrumMasterName,
      productOwnerName,
      developers,
      startDate,
      methodology,
    } as AddProductForm;
  }

  setProductFormGroup(product: Product, fb: FormBuilder): FormGroup {
    return fb.group({
      productName: ['', Validators.required],
      scrumMasterName: fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      productOwnerName: fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      developers: fb.array([
        fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
        }),
      ]),
      startDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '((?:19|20)\\d\\d)/(0?[1-9]|1[012])/([12][0-9]|3[01]|0?[1-9])'
          ),
        ],
      ],
      methodology: ['AGILE', Validators.required],
    });
  }

  submit(formGroup: FormGroup): void {
    const body = this.createHttpBody(formGroup);
    const productName = this.productService.currentProductName;

    this.productService
      .addProduct$(body)
      .pipe(
        take(1),
        concatMap(() => this.productService.getProducts$()),
        catchError(() => {
          this.snackBar.open('Unable to insert product', 'OK', {
            duration: 2000,
          });
          throw new Error('Unable to update');
        })
      )
      .subscribe(() => {
        this.appService.notify(`${productName} has been successfully added`);
        this.router.navigate(['']);
      });
  }
}
