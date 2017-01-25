import * as angular from "angular";
import "angular-ui-router";
import "angular-messages";
import "ngmodal";
import "materialize-css";
import "angular-materialize";
import "ngstorage";
import "./store-mock";

import { configSetter } from "./config-setter";

import { MainComponent } from "./app/components/main/main.component";
import { CatalogComponent } from "./app/components/catalog/catalog.component";
import { ShoppingCartComponent } from "./app/components/shopping-cart/shopping-cart.component";
import { PaginationComponent } from "./app/directives/pagination/pagination.directive";
import { CatalogService } from "./app/services/catalog.service";
import { ShoppingCartService } from "./app/services/shopping-cart.service";
import { Utils } from "./app/utils";

let wisStore = angular.module("wisStore", ["storeMock", "ui.router", "ngModal", "ngMessages", "ui.materialize", "ngStorage"]);

wisStore.component("wisMain", new MainComponent());
wisStore.component("wisCatalog", new CatalogComponent());
wisStore.component("wisCart", new ShoppingCartComponent());
wisStore.component("wisPaging", new PaginationComponent());
wisStore.service("catalogService", CatalogService);
wisStore.service("shoppingCartService", ShoppingCartService);
wisStore.constant("utils", new Utils());

configSetter(wisStore);

angular.bootstrap(document, ["wisStore"]);
