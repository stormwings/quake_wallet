import type { AppError, ErrorContext } from "./types";
import { toAppError } from "./normalize";

export function reportError(err: unknown, context?: ErrorContext): void {
  const appErr: AppError = toAppError(err, context);

  // MVP: console.* con estructura uniforme. Más adelante: Sentry/Datadog/etc.
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error("[AppError]", {
      kind: appErr.kind,
      code: appErr.code,
      status: appErr.status,
      message: appErr.message,
      context: appErr.context,
      details: appErr.details,
    });
  } else {
    // Producción: mantenerlo discreto o integrarlo a un tracker real
    // eslint-disable-next-line no-console
    console.error("[AppError]", appErr.code, appErr.kind);
  }
}
