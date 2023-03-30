import { inject, NgModule } from '@angular/core';
import { AddProductComponent } from './core/add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './core/product-list/product-list.component';
import { EditProductComponent } from './core/edit-product/edit-product.component';
import { editProductFormGuard } from './guards/edit-product-form-guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  {
    path: 'edit-product/:productId',
    component: EditProductComponent,
    canActivate: [editProductFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
