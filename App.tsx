import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";

import { LocaleProvider } from "./src/i18n";
import { RootNavigator } from "./src/navigation";
import { queryClient } from "./src/services/queryClient";

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <LocaleProvider initialLocale="es">
          <RootNavigator />
        </LocaleProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
