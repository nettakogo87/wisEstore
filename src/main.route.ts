export function mainRoute($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state("main", {
      abstract: true,
      url: "/",
      component: "wisMain"
    })
    .state("main.catalog", {
      abstract: true,
      url: "catalog",
      component: "wisCatalog"
    })
    .state("main.catalog.results", {
      url: "?count&skip",
    })
    .state("main.cart", {
      url: "cart",
      component: "wisCart"
    });


  $urlRouterProvider.otherwise('/catalog');
}
