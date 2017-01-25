import { PaginationController } from "./pagination.controller";
import "./pagination.scss";

export class PaginationComponent implements angular.IComponentOptions {
  public controller = PaginationController;
  public templateUrl = "./pagination.html";
  public bindings = {
    showCount: "<?",
    currentPageIndex: "<",
    pageIndexTotalCount: "<",
    action: "&"
  };
}
