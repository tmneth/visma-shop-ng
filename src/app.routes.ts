import { Routes } from '@angular/router';
import { ShopComponent } from './app/shop/shop.component';
import { FormComponent } from './app/form/form.component';

export const APP_ROUTES: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: ShopComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: 'shop' },
];
