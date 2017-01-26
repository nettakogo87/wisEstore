import { IShoppingCartService } from "../../lib/shopping-cart-service.interface";
import { Utils } from "../../utils";
import { IShoppingCartProduct } from "../../lib/shopping-cart-product.interface";

export class ShoppingCartController implements angular.IController {
  public products: IShoppingCartProduct[] = [];
  constructor(public shoppingCartService: IShoppingCartService, private utils: Utils) {

  }

  public $onInit() {
    this.products = this.shoppingCartService.getShoppingCartProducts();
  }

  public increase(product: IShoppingCartProduct) {
    product.count++;
    this.shoppingCartService.increase(product.product.id, 1);
  }

  public decrease(product: IShoppingCartProduct) {
    if (product.count > 1) {
      product.count--;
      this.shoppingCartService.decrease(product.product.id, 1);
    }
  }

  public remove(product: IShoppingCartProduct) {
    this.shoppingCartService.remove(product.product.id);
    let removeIndex = this.products.indexOf(product);
    this.products.splice(removeIndex, 1);
  }
}
