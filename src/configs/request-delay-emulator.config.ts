/** This is wrapper for emulate response delay when you request remote service. */
const delay: number = 1000;

export function requestDelayEmulator($provide: angular.auto.IProvideService) {
  $provide.decorator('$httpBackend', ($delegate) => {
    let proxy = function(method, url, data, callback, headers) {
      let interceptor = function() {
        let _this = this;
        let _arguments = arguments;
        setTimeout(function() {
          callback.apply(_this, _arguments);
        }, delay);
      };
      return $delegate.call(this, method, url, data, interceptor, headers);
    };
    for (let key in $delegate) {
      proxy[key] = $delegate[key];
    }
    return proxy;
  });
}
