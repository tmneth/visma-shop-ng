import { Component } from '@angular/core';
import { ShopComponent } from './pages/shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ShopComponent, RouterModule],
})
export class AppComponent {}
