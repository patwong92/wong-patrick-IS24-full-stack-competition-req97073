import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { Product } from '../types/product.type';
import environment from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSubject: BehaviorSubject<any>;
  currentProductSubject: BehaviorSubject<Product | null>;

  constructor(private http: HttpClient) {
    this.productsSubject = new BehaviorSubject<Product[]>([]);
    this.currentProductSubject = new BehaviorSubject<Product | null>(null);
    this.getProducts();
  }

  getProducts(): void {
    this.http
      .get(`${environment.baseApiUrl}/api/products`)
      .pipe(take(1))
      .subscribe((result) => {
        this.productsSubject.next(result);
      });
  }

  getProducts$(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.baseApiUrl}/api/products`)
      .pipe(
        tap((products) => {
          this.productsSubject.next(products);
        })
      );
  }

  get products$(): Observable<any> {
    return this.productsSubject.asObservable();
  }

  get currentProduct$(): Observable<Product> {
    return this.currentProductSubject.asObservable() as Observable<Product>;
  }

  addProduct$(body: any): Observable<{ productId: string }> {
    return this.http.post<{ productId: string }>(
      `${environment.baseApiUrl}/api/products`,
      body
    );
  }

  updateProduct$(id: string, body: any): Observable<Product> {
    return this.http.put<Product>(
      `${environment.baseApiUrl}/api/products/${id}`,
      body
    );
  }

  getProduct$(id: string): Observable<Product> {
    return this.productsSubject.asObservable().pipe(
      map(
        (products: Product[]) =>
          products.find((p: Product) => p.productId === id) as Product
      ),
      tap((product) => {
        this.currentProductSubject.next(product);
      })
    ) as Observable<Product>;
  }
}
