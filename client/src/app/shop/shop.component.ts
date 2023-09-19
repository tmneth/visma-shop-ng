import { Component, OnInit, inject } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink],
})
export class ShopComponent implements OnInit {
  constructor(private readonly _shop: ShopService) {}

  public products: Product[] = [];

  ngOnInit(): void {
    this._shop.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }
}
