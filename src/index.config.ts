export function config($locationProvider: angular.ILocationProvider, $httpProvider: angular.IHttpProvider) {
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
}
