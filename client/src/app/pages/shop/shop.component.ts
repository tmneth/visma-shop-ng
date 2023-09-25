import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ShopDataService } from '../../shared/data-services/services/shop.data.service';
import { Product } from 'src/app/shared/data-services/models/product.view.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoaderComponent } from 'src/app/ui-components/loader/loader.component';
import { AuthDataService } from 'src/app/shared/data-services/services/auth.data.service';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [ProductComponent, CommonModule, RouterLink, LoaderComponent],
})
export class ShopComponent implements OnInit {
  constructor(
    private shop: ShopDataService,
    private authService: AuthDataService
  ) {}

  products$!: Observable<Product[]>;
  isAuthenticated: boolean = false;
  private authSub: any;

  ngOnInit(): void {
    this.authSub = this.authService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );

    this.products$ = this.shop.getProducts();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
