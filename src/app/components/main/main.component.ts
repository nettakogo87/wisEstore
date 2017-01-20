import { MainController } from "./main.controller";
import "./main.scss";

export class MainComponent implements ng.IComponentOptions {
  public templateUrl = "./main.html";
  public controller = MainController;
}
