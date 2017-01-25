import { MainController } from "./main.controller";
import "./main.scss";

export class MainComponent implements angular.IComponentOptions {
  public templateUrl = "./main.html";
  public controller = MainController;
}
