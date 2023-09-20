import { FormControl } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  imageUrl: string;
}

export interface ProductForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<number | null>;
  discount: FormControl<number | null>;
  imageUrl: FormControl<string | null>;
}

export interface ProductsApiResponse {
  products: Product[];
}
