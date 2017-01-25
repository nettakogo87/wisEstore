import { baseAngularConfig } from "./configs/index.config";
import { requestDelayEmulator } from "./configs/request-delay-emulator.config";
import { mainRoute } from "./main.route";

export function configSetter(module: angular.IModule) {
  module.config(baseAngularConfig);
  module.config(requestDelayEmulator);
  module.config((ngModalDefaultsProvider: any) => {
    ngModalDefaultsProvider.set({ closeButtonHtml: "<i class='material-icons'>close</i>" });
  });
  module.config(($localStorageProvider: angular.storage.IStorageProvider) => {
    $localStorageProvider.setKeyPrefix("wisStore");
  });
  module.config(mainRoute);
}
