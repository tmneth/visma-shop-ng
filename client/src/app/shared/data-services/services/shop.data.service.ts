import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.view.model';

@Injectable({
  providedIn: 'root',
})
export class ShopDataService {
  constructor(private readonly http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/products';

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  public createProduct(productData: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl, productData);
  }

  public getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  public deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }

  public updateProduct(
    productId: string,
    updatedProduct: Product
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${productId}`,
      updatedProduct
    );
  }
}
