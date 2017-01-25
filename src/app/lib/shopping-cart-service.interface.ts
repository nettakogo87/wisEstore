import { IProduct } from "./product.interface";
import { IShoppingCartProduct } from "./shopping-cart-product.interface";

export interface IShoppingCartService {
  add(product: IProduct, count: number): void;
  remove(productId: string): void;
  increase(productId: string, count: number): void;
  decrease(productId: string, count: number): void;
  getShoppingCartProducts(): IShoppingCartProduct[];
  getTotalSum(): number;
  getTotalCount(): number;
}
