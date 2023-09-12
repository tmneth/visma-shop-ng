export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number | null;
  imagePath: string;
}
