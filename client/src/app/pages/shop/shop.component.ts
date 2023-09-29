import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopDataService } from '../../shared/data-services/services/shop.data.service';
import { Product } from 'src/app/shared/data-services/models/product.view.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderComponent } from 'src/app/ui-components/loader/loader.component';
import { AuthDataService } from 'src/app/shared/data-services/services/auth.data.service';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink, LoaderComponent],
})
export class ShopComponent implements OnInit {
  products$!: Observable<Product[]>;
  isAuthenticated: boolean = false;

  constructor(
    private shop: ShopDataService,
    private authService: AuthDataService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe({
      next: (authenticated) => {
        this.isAuthenticated = authenticated;
        this.products$ = this.shop.getProducts();
      },
    });
  }
}
