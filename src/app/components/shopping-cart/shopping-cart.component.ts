import { ShoppingCartController } from "./shopping-cart.controller";
import "./shopping-cart.scss";

export class ShoppingCartComponent implements angular.IComponentOptions {
  public templateUrl = "./shopping-cart.html";
  public controller = ShoppingCartController;
}
