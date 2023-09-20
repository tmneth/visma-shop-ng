import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopService } from '../shared/data-services/services/shop.data.service';
import {
  Product,
  ProductsApiResponse,
} from '../shared/data-services/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink],
})
export class ShopComponent implements OnInit, OnDestroy {
  constructor(private readonly _shop: ShopService) {}

  private productsSubscription: Subscription | undefined;

  public products: Product[] = [];

  ngOnInit(): void {
    this.productsSubscription = this._shop
      .getProducts()
      .subscribe((data: ProductsApiResponse) => {
        this.products = data.products;
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
