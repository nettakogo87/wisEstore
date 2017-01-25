import { IShoppingCartService } from "../../lib/shopping-cart-service.interface";
import { Utils } from "../../utils";

export class MainController {
  public copyrightDate = new Date().getUTCFullYear();

  public constructor(public shoppingCartService: IShoppingCartService, private utils: Utils) { }
}
