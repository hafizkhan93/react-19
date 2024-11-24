export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  picture: string;
  category?: string;
  brand?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  errors?: { [key: string]: string };
}
