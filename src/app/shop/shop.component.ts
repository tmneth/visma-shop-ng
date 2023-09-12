import { Component, OnInit, inject } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule],
})
export class ShopComponent implements OnInit {
  private readonly _shop = inject(ShopService);
  public products: Product[] = [];

  ngOnInit(): void {
    this.products = this._shop.getProducts();
  }
}
