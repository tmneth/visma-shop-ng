import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsApiResponse } from '../models/product.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private readonly _http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/products';

  public getProducts(): Observable<ProductsApiResponse> {
    return this._http.get<ProductsApiResponse>(this.apiUrl);
  }

  public createProduct(productData: any): Observable<any> {
    return this._http.post(this.apiUrl, productData);
  }
}
