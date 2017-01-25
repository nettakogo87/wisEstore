import * as angular from "angular";
import "angular-ui-router";
import "angular-messages";
import "ngmodal";
import "materialize-css";
import "angular-materialize";
import "ngstorage";
import "./store-mock";

import { mainRoute } from "./main.route";
import { MainComponent } from "./app/components/main/main.component";
import { CatalogComponent } from "./app/components/catalog/catalog.component";
import { ShoppingCartComponent } from "./app/components/shopping-cart/shopping-cart.component";
import { PaginationComponent } from "./app/directives/pagination/pagination.directive";
import { CatalogService } from "./app/services/catalog.service";
import { ShoppingCartService } from "./app/services/shopping-cart.service";
import { baseAngularConfig } from './index.config';
import { requestDelayEmulator } from './request-delay-emulator.config';

let wisStore = angular.module("wisStore", ["storeMock", "ui.router", "ngModal", "ngMessages", "ui.materialize", "ngStorage"]);

wisStore.config(baseAngularConfig);
wisStore.config(requestDelayEmulator);
wisStore.component("wisMain", new MainComponent());
wisStore.component("wisCatalog", new CatalogComponent());
wisStore.component("wisCart", new ShoppingCartComponent());
wisStore.component("wisPaging", new PaginationComponent());
wisStore.service("catalogService", CatalogService);
wisStore.service("shoppingCartService", ShoppingCartService);
wisStore.config(mainRoute);
wisStore.config((ngModalDefaultsProvider: any) => {
  ngModalDefaultsProvider.set({ closeButtonHtml: "<i class='material-icons'>close</i>" });
});
wisStore.config(($localStorageProvider: angular.storage.IStorageProvider) => {
  $localStorageProvider.setKeyPrefix("wisStore");
});

angular.bootstrap(document, ["wisStore"]);
