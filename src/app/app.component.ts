import { Component } from '@angular/core';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, ShopComponent],
})
export class AppComponent {
  title = 'visma-shop-ng';
}
