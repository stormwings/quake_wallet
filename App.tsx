import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { LocaleProvider } from "./src/i18n";
import { RootNavigator } from "./src/navigation";
import { store } from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <LocaleProvider initialLocale="es">
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
