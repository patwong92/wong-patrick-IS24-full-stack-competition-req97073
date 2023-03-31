import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditProductForm } from '../../types/edit-product-form.type';
import { ProductFormService } from '../../services/product-form.service';
import { Product } from '../../types/product.type';
import { FullName } from '../../types/full-name.type';
import { ProductService } from '../../services/product.service';
import { catchError, concatMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root',
})
export class EditProductService extends ProductFormService {
  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {
    super();
  }

  setProductFormGroup(product: Product, fb: FormBuilder): FormGroup {
    return fb.group({
      productName: [product?.productName, Validators.required],
      scrumMasterName: fb.group({
        firstName: [
          product?.scrumMasterName.split(' ')[0],
          Validators.required,
        ],
        lastName: [product?.scrumMasterName.split(' ')[1], Validators.required],
      }),
      productOwnerName: fb.group({
        firstName: [
          product?.productOwnerName.split(' ')[0],
          Validators.required,
        ],
        lastName: [
          product?.productOwnerName.split(' ')[1],
          Validators.required,
        ],
      }),
      developers: fb.array(
        product?.developers.map((d) =>
          fb.group({
            firstName: [d.split(' ')[0], Validators.required],
            lastName: [d.split(' ')[1], Validators.required],
          })
        ) as FormGroup[]
      ),
      methodology: [product?.methodology, Validators.required],
    });
  }

  compareEditProductForm(a: EditProductForm, b: EditProductForm): boolean {
    const isIdenticalProductName = a?.productName === b?.productName;
    const isIdenticalScrumMasterName =
      a?.scrumMasterName?.firstName === b?.scrumMasterName?.firstName &&
      a?.scrumMasterName?.lastName === b?.scrumMasterName?.lastName;
    const isIdenticalDeveloper =
      a.developers.length === b.developers.length &&
      a?.developers?.every((ad) =>
        b?.developers.some(
          (bd) =>
            ad?.firstName === bd?.firstName && ad?.lastName === bd?.lastName
        )
      );
    const isIdenticalProductOwnerName =
      a?.productOwnerName?.firstName === b?.productOwnerName?.firstName &&
      a?.productOwnerName?.lastName === b?.productOwnerName?.lastName;
    const isIdenticalMethodology = a?.methodology === b?.methodology;
    return (
      isIdenticalProductName &&
      isIdenticalScrumMasterName &&
      isIdenticalDeveloper &&
      isIdenticalProductOwnerName &&
      isIdenticalMethodology
    );
  }

  createHttpBody<EditProductForm>(formGroup: FormGroup): EditProductForm {
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

    return {
      productName,
      scrumMasterName,
      productOwnerName,
      developers,
      methodology,
    } as EditProductForm;
  }

  submit(formGroup: FormGroup): void {
    const body = this.createHttpBody(formGroup) as EditProductForm;

    this.productService.currentProduct$
      .pipe(
        take(1),
        concatMap((product) =>
          this.productService.updateProduct$(product?.productId, body)
        ),
        concatMap(() => this.productService.getProducts$()),
        catchError((error) => {
          this.snackBar.open('Unable to update', 'OK', { duration: 2000 });
          throw Error(error);
        })
      )
      .subscribe(() => {
        this.appService.notify(
          `${body.productName} has been successfully updated`
        );
        this.router.navigate(['']);
      });
  }
}
