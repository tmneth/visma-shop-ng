import { Component } from '@angular/core';
import { ShopComponent } from './shop/shop.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ShopComponent],
})
export class AppComponent {
  title = 'visma-shop-ng';
}
