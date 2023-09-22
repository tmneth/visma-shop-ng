import { Routes } from '@angular/router';
import { ShopComponent } from './app/pages/shop/shop.component';
import { ProductFormComponent } from './app/pages/product-form/product-form.component';

export const APP_ROUTES: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: ShopComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'shop' },
];
