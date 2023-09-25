import { Routes } from '@angular/router';
import { ShopComponent } from './app/pages/shop/shop.component';
import { ProductFormComponent } from './app/pages/product-form/product-form.component';
import { AuthComponent } from './app/pages/auth/auth.component';
import { AuthGuard } from './app/shared/guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', canActivate: [AuthGuard], component: ShopComponent },
  {
    path: 'add-product',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-product/:id',
    component: ProductFormComponent,
  },
  { path: '**', redirectTo: 'shop' },
];
