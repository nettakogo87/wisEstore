import { IProduct } from "./product.interface";
export interface ICatalogFindResult {
  products: IProduct[];
  totalCount: number;
}
