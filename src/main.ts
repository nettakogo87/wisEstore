import * as angular from "angular";
import "angular-ui-router";
import "angular-messages";
import "ngmodal";
import "angular-materialize";
import "./store-mock";

import { mainRoute } from "./main.route";
import { MainComponent } from "./app/components/main/main.component";
import { CatalogComponent } from "./app/components/catalog/catalog.component";
import { PaginationComponent } from "./app/directives/pagination/pagination.directive";
import { config } from './index.config';
import { requestDelayEmulator } from './request-delay-emulator.config';

let wisStore = angular.module("wisStore", ["storeMock", "ui.router", "ngModal", "ngMessages", "ui.materialize"]);

wisStore.config(config);
wisStore.config(requestDelayEmulator);
wisStore.component("wisMain", new MainComponent());
wisStore.component("wisCatalog", new CatalogComponent());
wisStore.component("wisPaging", new PaginationComponent());
wisStore.config(mainRoute);

angular.bootstrap(document, ["wisStore"]);
