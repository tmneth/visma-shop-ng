export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
}

export interface ProductsApiResponse {
  products: Product[];
}
