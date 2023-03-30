import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, Subscription, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../types/product.type';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Product>;
  subscription = new Subscription();

  displayedColumns = [
    'productId',
    'productName',
    'productOwnerName',
    'developers',
    'scrumMasterName',
    'startDate',
    'methodology',
    'edit',
  ];

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private router: Router,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.productService.products$,
        this.productListService.filterQuery$,
      ]).subscribe(([products, { option, query }]) => {
        const filteredProducts =
          option === 'all'
            ? products
            : products.filter(
                (product: Product) =>
                  (option === 'developer' &&
                    product?.developers.some((d: string) =>
                      d.startsWith(query)
                    )) ||
                  (option === 'scrumMaster' &&
                    product?.scrumMasterName.startsWith(query))
              );
        this.createDataSource(filteredProducts);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createDataSource(products: Product[]): void {
    this.dataSource = new MatTableDataSource<Product>(products as Product[]);
    this.dataSource.paginator = this.paginator;
  }

  navigate(id: string) {
    this.productService.getProduct$(id).pipe(take(1)).subscribe();
    this.router.navigate(['edit-product', id]);
  }
}
