function setBackendBaseUrl() {
  return {
    request: (config) => {
      if (config.url.indexOf('/api/') === 0) {
        config.url = 'http://backend' + config.url;
      }
      return config;
    }
  };
}

export function baseAngularConfig($locationProvider: angular.ILocationProvider, $httpProvider: angular.IHttpProvider) {
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  $httpProvider.interceptors.push(setBackendBaseUrl);
}
