import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopService } from '../../shared/data-services/services/shop.data.service';
import { Product } from 'src/app/shared/data-services/models/product.view.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink],
})
export class ShopComponent implements OnInit {
  constructor(private shop: ShopService) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.shop.getProducts().subscribe({
      next: (data) => (this.products = data.products),
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }
}
