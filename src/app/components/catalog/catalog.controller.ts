import * as angular from "angular";
import { CatalogService } from "../../services/catalog.service";
import { IProduct } from "../../lib/product.interface";
import { ICatalogFindResult } from "../../lib/catalog-find-result.interface";
import { IShoppingCartService } from "../../lib/shopping-cart-service.interface";

export class CatalogController implements angular.IController {
  public products: IProduct[] = [];
  public showErrorMessage: boolean;
  public isLoading: boolean = true;
  public currentCount: number;
  public currentSkip: number;
  public currentBaseState: string = "main.catalog.results";
  public currentPageIndex: number;
  private totalCount: number;
  public totalPageIndexCount: number;
  public showDialog: boolean;
  public maxProductForAddToCart: number = 10;
  public countOfProducts: number = 1;
  public selectedProduct: IProduct;

  constructor(
    private $state: angular.ui.IStateService,
    private $stateParams: angular.ui.IStateParamsService,
    private catalogService: CatalogService,
    private shoppingCartService: IShoppingCartService) { }

  public $onInit() {
    this.currentCount = Number.parseInt(this.$stateParams["count"]) || 12;
    this.currentSkip = Number.parseInt(this.$stateParams["skip"]) || 0;
    this.getProducts(this.currentCount, this.currentSkip);
  }

  private getProducts(count: number, skip: number) {
    this.currentPageIndex = this.currentSkip / this.currentCount;
    this.isLoading = true;
    this.smoothScrollToTop();
    this.catalogService.getProducts(count, skip)
      .then((result: ICatalogFindResult) => {
        this.showErrorMessage = false;
        this.products = result.products;
        this.totalCount = result.totalCount;
        this.totalPageIndexCount = Math.floor(this.totalCount / this.currentCount);
      }, (reason: angular.IHttpPromiseCallbackArg<any>) => {
        this.showErrorMessage = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private smoothScrollToTop() {
    let element = angular.element("html, body");
    element.animate({ scrollTop: element.offset().top }, "slow");
  }

  public getNewState($pageIndex: number) {
    this.currentSkip = $pageIndex * this.currentCount;
    this.$state.go(this.currentBaseState, { count: this.currentCount, skip: this.currentSkip });
    this.getProducts(this.currentCount, this.currentSkip);
  }

  public selectProduct(product: IProduct) {
    this.selectedProduct = product;
    this.countOfProducts = 1;
    this.showDialog = true;
  }

  public addToCart(product: IProduct, countOfProducts: number) {
    this.showDialog = false;
    this.shoppingCartService.add(product, countOfProducts);
  }
}
