import * as angular from "angular";
import "angular-mocks";
import { IProduct } from "./app/lib/product.interface";
import { ICatalogFindResult } from "./app/lib/catalog-find-result.interface";

let mockarooData: IProduct[] = require('./assets/mockaroo_data.json');

function mockRun($httpBackend: angular.IHttpBackendService): void {
  let catalogUrl = /http\:\/\/backend\/api\/catalog\/find\?count=([0-9]+)\&skip=([0-9]+)/;
  $httpBackend.whenGET(catalogUrl)
    .respond((method: string, url: string, data: string | Object, headers: Object, params?: any) => {
      let count: number = Number.parseInt(params.count) || 0;
      let skip: number = Number.parseInt(params.skip) || 0;
      let products: IProduct[] = mockarooData.slice(skip, skip + count);
      let formattedCostProducts: IProduct[] = products.map((product: IProduct) => {
        let cost = product.cost.toString();
        let newProduct: IProduct = {
          id: product.id,
          name: product.name,
          category: product.category,
          manufacturer: product.manufacturer,
          cost: Number.parseInt(cost.substr(1, cost.length)),
        };
        return newProduct;
      });

      let result: ICatalogFindResult = {
        products: formattedCostProducts,
        totalCount: mockarooData.length
      };
      return [200, result, {}, "success"];
    });
}

let storeMock = angular.module("storeMock", ["ngMockE2E"]);
storeMock.run(mockRun);
