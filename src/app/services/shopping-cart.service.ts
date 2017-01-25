import { IProduct } from "../lib/product.interface";
import { IShoppingCartProduct } from "../lib/shopping-cart-product.interface";
import { IShoppingCartService } from "../lib/shopping-cart-service.interface";

export class ShoppingCartService implements IShoppingCartService {
  public cart: { [productId: string]: IShoppingCartProduct };
  public constructor(private $localStorage: angular.storage.IStorageProvider) {
    this.cart = this.$localStorage as any;
  }

  public add(product: IProduct, count: number) {
    if (this.cart[product.id]) {
      this.increase(product.id, count);
    } else {
      let shoppingCartProdcut: IShoppingCartProduct = { product: product, count: count };
      this.cart[product.id] = shoppingCartProdcut;
    }
  }

  public remove(productId: string) {
    delete this.cart[productId];
  }

  public increase(productId: string, count: number) {
    this.cart[productId].count += count;
  }

  public decrease(productId: string, count: number) {
    this.cart[productId].count -= count;
    if (this.cart[productId].count < 1) {
      this.cart[productId].count = 1;
    }
  }

  public getShoppingCartProducts() {
    let resultCartProducts: IShoppingCartProduct[] = [];
    Object.keys(this.cart).forEach((productId: string) => {
      let cartProduct = this.cart[productId];
      if (cartProduct.product && cartProduct.count) {
        let resultCartProdcut: IShoppingCartProduct = { product: cartProduct.product, count: cartProduct.count };
        resultCartProducts.push(resultCartProdcut);
      }
    });
    return resultCartProducts;
  }

  public getTotalSum() {
    let totalSum: number = 0;
    console.log("this.cart -> ", this.cart);
    Object.keys(this.cart).forEach((productId: string) => {
      let cartProduct: IShoppingCartProduct = this.cart[productId];
      if (cartProduct.product && cartProduct.count) {
        let cartProduct: IShoppingCartProduct = this.cart[productId];
        totalSum += cartProduct.product.cost * cartProduct.count;
      }
    });
    return totalSum;
  }
}
