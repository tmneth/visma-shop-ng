import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductsApiResponse } from '../models/product.view.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private readonly http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/products';

  public getProducts(): Observable<ProductsApiResponse> {
    return this.http.get<ProductsApiResponse>(this.apiUrl);
  }

  public createProduct(productData: Product): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }
}
