import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductListService } from '../product-list/product-list.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl!: FormGroup;
  displayedOptions$!: Observable<string[]>;
  subscription = new Subscription();
  label!: Observable<string>;

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.searchControl = this.searchService.getSearchFormGroup();
    this.productListService.setFilterQuery({
      option: 'all',
      query: '',
    });

    // Function that affects the autocomplete search results
    this.subscription.add(
      this.searchControl.controls['option'].valueChanges.subscribe((option) => {
        this.displayedOptions$ = this.productService.products$.pipe(
          map((products) => {
            if (option === 'developer')
              return this.searchService.parseDevelopers(products);
            else if (option === 'scrumMaster')
              return this.searchService.parseScrumMasters(products);
            return [];
          })
        );

        this.searchControl.controls['query'].patchValue('');
        this.productListService.setFilterQuery(this.searchControl.value);
      })
    );

    // Function that sends filter options to the product list results
    this.subscription.add(
      this.searchControl.controls['query'].valueChanges.subscribe((query) => {
        this.productListService.setFilterQuery({
          ...this.searchControl.value,
          query,
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
