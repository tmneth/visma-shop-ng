import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopDataService } from '../../shared/data-services/services/shop.data.service';
import { Product } from 'src/app/shared/data-services/models/product.view.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink],
})
export class ShopComponent implements OnInit {
  constructor(private shop: ShopDataService) {}

  products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.shop.getProducts();
  }
}
