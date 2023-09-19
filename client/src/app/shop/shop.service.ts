import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductsApiResponse {
  products: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private readonly _http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/products';

  public getProducts(): Observable<ProductsApiResponse> {
    return this._http.get<ProductsApiResponse>(this.apiUrl);
  }
}
