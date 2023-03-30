import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterQueryDTO } from '../../types/filter-option-dto.type';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private filterQuerySubject = new BehaviorSubject<FilterQueryDTO>({
    option: 'all',
    query: '',
  });

  get filterQuery$(): Observable<FilterQueryDTO> {
    return this.filterQuerySubject.asObservable();
  }

  setFilterQuery(fq: FilterQueryDTO): void {
    this.filterQuerySubject.next(fq);
  }
}
