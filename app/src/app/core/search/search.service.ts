import { Injectable } from '@angular/core';
import { Product } from '../../types/product.type';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private fb: FormBuilder) {}

  getSearchFormGroup(): FormGroup {
    return this.fb.group({
      option: ['all'],
      query: [''],
    });
  }

  parseScrumMasters(products: Product[]): string[] {
    const scrumMasters = products.map(
      (product: Product) => product.scrumMasterName
    );
    const scrumMasterSet = new Set<string>(scrumMasters);
    return Array.from(scrumMasterSet);
  }

  parseDevelopers(products: Product[]): string[] {
    const developers = products.map((product) => product.developers).flat();
    const developerSet = new Set<string>(developers);
    return Array.from(developerSet);
  }
}
