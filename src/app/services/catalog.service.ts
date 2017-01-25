import { IProduct } from "../lib/product.interface";
import { ICatalogFindResult } from "../lib/catalog-find-result.interface";

export class CatalogService {
  constructor(private $http: angular.IHttpService) {

  }

  public getProducts(count: number = 12, skip: number = 0) {
    let params = { count: count, skip: skip };
    return this.$http.get<ICatalogFindResult>("/api/catalog/find", { params: params })
      .then(resp => {
        resp.data.products.forEach((product: IProduct) => {
          product.imageSrc = product.imageSrc || "/assets/mock.png";
        });
        return resp.data;
      });
  }

  public getProduct(id: string) {
    return this.$http.get<IProduct>(`/api/catalog/product/${id}`)
      .then(resp => resp.data);
  }
}
