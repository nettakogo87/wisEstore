export function mainRoute($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state("main", {
      abstract: true,
      url: "/",
      component: "wisMain"
    })
    .state("main.catalog", {
      url: "catalog",
      component: "wisCatalog"
    });


  $urlRouterProvider.otherwise('/catalog');
}
