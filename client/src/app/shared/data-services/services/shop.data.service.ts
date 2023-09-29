import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable, catchError } from 'rxjs';
import { Product } from '../models/product.view.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ShopDataService {
  constructor(
    private readonly http: HttpClient,
    private errorService: ErrorService
  ) {}

  private apiUrl = 'http://localhost:3000/api/products';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(this.errorService.handleError.bind(this.errorService)));
  }

  createProduct(productData: Product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, productData, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.errorService.handleError.bind(this.errorService)));
  }

  getProduct(productId: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${productId}`)
      .pipe(catchError(this.errorService.handleError.bind(this.errorService)));
  }

  deleteProduct(productId: string): Observable<Product> {
    return this.http
      .delete<Product>(`${this.apiUrl}/${productId}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.errorService.handleError.bind(this.errorService)));
  }

  updateProduct(
    productId: string,
    updatedProduct: Product
  ): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/${productId}`, updatedProduct, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.errorService.handleError.bind(this.errorService)));
  }
}
