import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { productsData } from './products.test-data';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  public getProducts(): Product[] {
    return productsData;
  }
}
