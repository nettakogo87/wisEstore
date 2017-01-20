import { CatalogController } from "./catalog.controller";
import "./catalog.scss";

export class CatalogComponent implements ng.IComponentOptions {
  public templateUrl = "./catalog.html";
  public controller = CatalogController;
}
